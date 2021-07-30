const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const { response } = require('express')
const __downloadDir = path.resolve("./downloaded_data/hmp")

const keys={
    "address": process.env.hmp_address,
    "orderList_address": process.env.hmp_orderList,
    "id": process.env.hmp_id,
    "password": process.env.hmp_psw
}
const test_keys={
    "id": process.env.test_id
}

exports.login = (async(req, res) => {
    //Launch Website
    await console.log("Start")
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: __downloadDir
    });

    //Move to website
    await page.goto(keys.address);
   

    //Login
    await page.type("#memberId", keys.id);
    await page.type("#memberPassword", keys.password);
    await page.click("#btnLogin");
    await page.waitForNavigation();
        
    //Save Cookies
    req.session.hmp_cookies = await page.cookies();
    await req.session.save();
    //await console.log(req.session.hmp_cookies[0]);


    //Get sale data
    await page.goto(keys.orderList_address)
    await page.select("#productSearchType", "PRODUCT_NAME")
    await page.type("#productSearchTypeVal", "혈당측정지");
    await page.click("[class='per']")
    await page.click("#orderProductTab")

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
    

    await res.json({
        result: "Login Successful"
    })
})

