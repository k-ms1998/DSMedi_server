const request = require('request')
const puppeteer = require('puppeteer')

const keys={
    "address": process.env.hmp_address,
    "id": process.env.hmp_id,
    "password": process.env.hmp_psw
}
const test_keys={
    "id": process.env.test_id
}

exports.getData = (async(req, res) => {
    await console.log("Start")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(keys.address);

    //await page.click("#memberId");
    await page.type("#memberId",keys.id);
    await page.type("#memberPassword", keys.password);
    await page.click("#btnLogin");
    await page.waitForNavigation();
    
    await console.log("Done 4")
    await page.screenshot({path: './hmpmallLogin.png'})
    await console.log("Done")
    await browser.close()

    await res.json({
        result: "Login Successful"
    })
})
