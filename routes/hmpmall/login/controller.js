const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const downloadPath = path.resolve("./downloaded_data/hmp")

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
        downloadPath: downloadPath
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


    //Test
    await page.goto(keys.orderList_address)
    await page.select("#productSearchType", "PRODUCT_NAME")
    await page.type("#productSearchTypeVal", "혈당측정지");

    await page.click("[class='srch_btn']")
    await page.click("[class='btn_a _btn_excel']")
    //await page.screenshot({path: './hmpmallOrderList.png'});

    await res.json({
        result: "Login Successful"
    })
})

/*
exports.login = (req, res) => {
    
    console.log(keys.address)
    let loginOptions = {
        uri: keys.address,
        method: "POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:{
            "memberId": keys.id,
            "memberPassword": keys.password
        } 
    }

    request(loginOptions, function(err, fin, body){
        if(err){
            console.log(err)
        }
        else{
            res.json({
                result: body
            })
        }
    })
}*/
