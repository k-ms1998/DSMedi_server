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
    await page.goto(keys.orderList_address)
    await page.select("#productSearchType", "PRODUCT_NAME")
    await page.type("#productSearchTypeVal", "혈당측정지");
    await page.click("[class='per']")
    await page.click("#orderProductTab")

    await page.click("[class='srch_btn']")
    await page.click("[class='btn_a _btn_excel']")
})
