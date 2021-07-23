const requrestApi = require('request')
const keys = {
    "zone" : process.env.zone
}

exports.accounting = (req, res) => {
    
    const zone = keys.zone
    const tax_gubun = '11'
    const cr_code = '4011'
    const dr_code = ''
    const url = 'https://oapi'+zone+'.ecount.com/OAPI/V2/InvoiceAuto/SaveInvoiceAuto?SESSION_ID='+req.session.session_id;
    const testUrl = 'https://sboapi'+zone+'.ecount.com/OAPI/V2/InvoiceAuto/SaveInvoiceAuto?SESSION_ID='+req.session.session_id;
    
    console.log(testUrl)
    let accountingOptions = {
        uri : testUrl,
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        json:{
            "InvoiceAutoList":[{
                "Line":0,
                "BulkDatas":{
                    "TAX_GUBUN": tax_gubun,
                    "CR_CODE": cr_code,
                    "DR_CODE": dr_code
                }
            }]
        }
    }

    requrestApi(accountingOptions, function(err, fin, body) {
        res.json({
            result:body
        })
    })
}