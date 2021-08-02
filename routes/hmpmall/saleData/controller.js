const request = require('request')
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const __downloadDir = path.resolve("./downloaded_data/hmp")

const keys={
    "address": process.env.hmp_orderListAddress,
    "id": process.env.hmp_id,
    "password": process.env.hmp_psw
}

exports.getData = (async(req, res) => {
    if(!req.session.hmp_cookies){
        //307 Temporary Redirect; Will preserve the send method
        await res.redirect(307, "login")
    }
    else{
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
        await page.type("#productSearchTypeVal", "혈당측정지");
        await page.click("[class='per']");
        await page.click("#orderProductTab");

        await page.click("[class='srch_btn']")
        await page.click("[class='btn_a _btn_excel']")

        await page.on("response", async(response) => {
            await new Promise(resolve => setTimeout(resolve, 2000))
            //When a download is triggered by a page, it is donw using the 'Content-Disposition' header
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

                    let ts = Date.now(); //Date.now()는 UTC 기준; 한국은 UTC+9hours; 9 hours == 32400000 ms
                    let dateObj = new Date(ts);

                    var newFileName = dateObj.getFullYear()+'_'+(dateObj.getMonth()+1)+'_'+dateObj.getDate()

                    fs.rename(__downloadDir+'/'+filename, __downloadDir+'/'+ newFileName +'.'+file_extension, (err) => {
                        if(err)
                            console.log(err)
                    })
                }
            }

        })

        res.status(200).json({
            result: "HMP Sale Data Download Successful"
        })
    }
})
