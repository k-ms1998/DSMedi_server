const requrestApi = require('request')
const keys = {
    "zone" : process.env.zone
}

exports.quotation = (req, res) => {
    const testUrl = 'https://sboapi'+keys.zone+'.ecount.com/OAPI/V2/Quotation/SaveQuotation?SESSION_ID='+req.session.session_id;
    const url = 'https://oapi'+keys.zone+'.ecount.com/OAPI/V2/Quotation/SaveQuotation?SESSION_ID='+req.session.session_id;

    let quotationOptions = {
        uri: testUrl,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json:{
            "QuotationList": [{
             "Line": "0",
             "BulkDatas": {
              "IO_DATE": "20200213",
              "UPLOAD_SER_NO": "",
              "CUST": "",
              "CUST_DES": "",
              "EMP_CD": "",
              "WH_CD": "",
              "IO_TYPE": "",
              "EXCHANGE_TYPE": "",
              "EXCHANGE_RATE": "",
              "PJT_CD": "",
              "REF_DES": "",
              "COLL_TERM": "",
              "AGREE_TERM": "",
              "DOC_NO": "",
              "U_MEMO1": "",
              "U_MEMO2": "",
              "U_MEMO3": "",
              "U_MEMO4": "",
              "U_MEMO5": "",
              "U_TXT1": "",
              "PROD_CD": "40315",
              "PROD_DES": "",
              "SIZE_DES": "",
              "UQTY": "",
              "QTY": "1",
              "PRICE": "",
              "USER_PRICE_VAT": "",
              "SUPPLY_AMT": "",
              "SUPPLY_AMT_F": "",
              "VAT_AMT": "",
              "REMARKS": "",
              "ITEM_CD": "",
              "P_AMT1": "",
              "P_AMT2": "",
              "P_REMARKS1": "",
              "P_REMARKS2": "",
              "P_REMARKS3": ""
             }
            },{
             "Line": "0",
             "BulkDatas": {
              "IO_DATE": "20200213",
              "UPLOAD_SER_NO": "",
              "CUST": "",
              "CUST_DES": "",
              "EMP_CD": "",
              "WH_CD": "",
              "IO_TYPE": "",
              "EXCHANGE_TYPE": "",
              "EXCHANGE_RATE": "",
              "PJT_CD": "",
              "REF_DES": "",
              "COLL_TERM": "",
              "AGREE_TERM": "",
              "DOC_NO": "",
              "U_MEMO1": "",
              "U_MEMO2": "",
              "U_MEMO3": "",
              "U_MEMO4": "",
              "U_MEMO5": "",
              "U_TXT1": "",
              "PROD_CD": "40572",
              "PROD_DES": "",
              "SIZE_DES": "",
              "UQTY": "",
              "QTY": "1",
              "PRICE": "",
              "USER_PRICE_VAT": "",
              "SUPPLY_AMT": "",
              "SUPPLY_AMT_F": "",
              "VAT_AMT": "",
              "REMARKS": "",
              "ITEM_CD": "",
              "P_AMT1": "",
              "P_AMT2": "",
              "P_REMARKS1": "",
              "P_REMARKS2": "",
              "P_REMARKS3": ""
             }
            }]
       }
    }

    requrestApi(quotationOptions, function(err, fin, body) {
        res.json({
            result:body
        })
    })
}