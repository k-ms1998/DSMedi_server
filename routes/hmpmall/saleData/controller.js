const request = require('request')
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
const processData = require('../../process/controller')

const __downloadDir = path.resolve("./raw_data/hmp")

const keys={
    "address": process.env.hmp_orderListAddress,
    "id": process.env.hmp_id,
    "password": process.env.hmp_psw
}

exports.getData = (async(req, res) => {
    // 09시 마감 => 전날 16:00~오늘 09:00
    // 11시 마감 => 오늘 09:00~오늘 11:00
    // 14시 마감 => 오늘 11:00~오늘 14:00
    
    
    if(!req.session.hmp_cookies || !req.body.time){
        if(!req.body.time){
            res.status(400).json({
                "Error": "Please input the time"
            })
        }
        else{
            //307 Temporary Redirect; Will preserve the send method
            await res.redirect(307, "login")
        }
    }
    else{
        let ts = Date.now(); //Date.now()는 UTC 기준; 한국은 UTC+9hours; 9 hours == 32400000 ms
        let dateObj = new Date(ts);

        var year = dateObj.getFullYear();
        var month = dateObj.getMonth()+1;
        var day = dateObj.getDate();

        var dTime = req.body.time
        var sTime = 0
        if(dTime == '09'){
            sTime = '14'
        }
        else if(dTime == '11'){
            sTime = '09'
        }
        else if(dTime == '14'){
            sTime = '11'
        }

        //console.log(req.session.hmp_cookies)
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page._client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: __downloadDir
        });

        //Set Cookies
        await page.setCookie(...req.session.hmp_cookies);

        //Move to website
        await page.goto(keys.address);
        await page.select("#productSearchType", "PRODUCT_NAME");
        await page.type("#productSearchTypeVal", req.body.search_keyW);
        await page.click("[class='per']");
        if(dTime == 9){
            //The order date changes back to the default value when page.select("#productSearchType", "PRODUCT_NAME"); is triggered
            //=>Therefore, change the date after page.select("#productSearchType", "PRODUCT_NAME");
            let orderDate = await page.$('#fromOrderDate')
            await orderDate.click({clickCount:3})
            await orderDate.type(year+'-'+month+'-'+(day-1))
        
        }
        await page.select('#fromOrderTime', sTime);
        await page.select('#toOrderTime', dTime);
        await page.click("#orderProductTab");

        await page.click("[class='srch_btn']")
        await page.click("[class='btn_a _btn_excel']")

        await page.on("response", async(response) => {
            await new Promise(resolve => setTimeout(resolve, 2000))
            //When a download is triggered by a page, it is done using the 'Content-Disposition' header
            const disposition = response.headers()['content-disposition']
            if(disposition){
                //console.log("Download Triggered");
                //console.log(response.headers()['content-disposition'])
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) { 
                    var filename = matches[1].replace(/['"]/g, '');
                    var filenameSplit = filename.split(".");
                    var file_extension = filenameSplit[filenameSplit.length-1]

                    var keyW = req.body.search_keyW
                    if(keyW == ""){
                        keyW="전체"
                    }
                    var newFileName = year+'_'+month+'_'+day+'_'+keyW+'_'+dTime
                    
                    fs.rename(__downloadDir+'/'+filename, __downloadDir+'/'+ newFileName+'.'+file_extension, async(err) => {
                        if(err)
                            console.log(err)
                        else
                            await processData.toCsv(__downloadDir, "hmp", newFileName, file_extension);
                    })
                }
            }
            
        })

        await res.status(200).json({
            result: "HMP Sale Data Download Successful"
        })
    }
})
