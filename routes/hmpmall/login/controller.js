const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const __downloadDir = path.resolve("./downloaded_data/hmp")

const keys={
    "address": process.env.hmp_address,
    "orderList_address": process.env.hmp_orderListAddress,
    "id": process.env.hmp_id,
    "password": process.env.hmp_psw
}
const test_keys={
    "id": process.env.test_id
}

exports.login = (async(req, res) => {
    //Launch Website
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

    if(await req.headers.referer.includes("/hmp/sale_data")){
        //use referer to check if it's a request from another url
        await res.redirect(307, "sale_data")
    }
    else{
        await res.json({
            result: "Login Successful"
        })
    }
})