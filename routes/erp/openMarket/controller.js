const requestApi = require('request')
const keys = {
    "zone": process.env.zone
}

exports.openMarket = (req, res) => {
    const testUrl = 'https://sboapi'+keys.zone+'.ecount.com/OAPI/V2/OpenMarket/SaveOpenMarketOrderNew?SESSION_ID='+req.session.session_id;
    const url = 'https://oapi'+keys.zone+'.ecount.com/OAPI/V2/OpenMarket/SaveOpenMarketOrderNew?SESSION_ID='+req.session.session_id;

    let openMarketOptions = {
        uri: testUrl,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json:{
            "OPENMARKET_CD": openMarket_cd,
            "ORDERS": [{
                
            }]
        }
    }


}
