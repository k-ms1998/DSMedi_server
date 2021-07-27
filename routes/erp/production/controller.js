const requrestApi = require('request')
const keys = {
    "zone": process.env.zone
}

exports.jobOrder = (req, res) => {
    //ERP의 작업지시서를 입력할 수 있습니다

    const testUrl = 'https://sboapi'+keys.zone+'.ecount.com/OAPI/V2/JobOrder/SaveJobOrder?SESSION_ID='+req.session.session_id;
    const url = 'https://oapi'+keys.zone+'.ecount.com/OAPI/V2/JobOrder/SaveJobOrder?SESSION_ID='+req.session.session_id;

    let jobOrderOptions = {
        uri: testUrl,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json:{
            "JobOrderList":[{
                "Line": "0",
                "BulkDatas": {
                    "UPLOAD_SER_NO": "",
                    "PROD_CD": req.body.prod_cd,
                    "QTY": req.body.qty
                }
            }]
        }
    }
    console.log(jobOrderOptions.json.JobOrderList[0].BulkDatas)
    
    requrestApi(jobOrderOptions, function(err, fin, apiBody){
        if(!err){
            res.json({
                result: apiBody
            })
        }
    })
}

exports.goodsIssued = (req, res) => {
    //ERP의 생산불출을 입력할 수 있습니다
    const testUrl = 'https://sboapi'+keys.zone+'.ecount.com/OAPI/V2/GoodsIssued/SaveGoodsIssued?SESSION_ID='+req.session.session_id;
    const url = 'https://oapi'+keys.zone+'.ecount.com/OAPI/V2/GoodsIssued/SaveGoodsIssued?SESSION_ID='+req.session.session_id;
   
    let goodsIssuedOptions = {
        uri: testUrl,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json:{
            "GoodsIssuedList":[{
                "Line": "0",
                "BulkDatas": {
                    "UPLOAD_SER_NO": "",
                    "WH_CD_F": req.body.wh_cd_f,
                    "WH_CD_T": req.body.wh_cd_t,
                    "PROD_CD": req.body.prod_cd,
                    "QTY": req.body.qty
                }
            }]
        }
    }
    
    requrestApi(goodsIssuedOptions, function(err, fin, apiBody){
        if(!err){
            res.json({
                result: apiBody
            })
        }
    })
}

exports.goodsReceipt = (req, res) => {
    //ERP의 생산입고I을 입력할 수 있습니다
    const testUrl = 'https://sboapi'+keys.zone+'.ecount.com/OAPI/V2/GoodsReceipt/SaveGoodsReceipt?SESSION_ID='+req.session.session_id;
    const url = 'https://oapi'+keys.zone+'.ecount.com/OAPI/V2/GoodsReceipt/SaveGoodsReceipt?SESSION_ID='+req.session.session_id;

    let goodsReceiptOptions = {
        uri: testUrl,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json:{
            "GoodsReceiptList":[{
                "Line": "0",
                "BulkDatas": {
                    "UPLOAD_SER_NO": "",
                    "WH_CD_F": req.body.wh_cd_f,
                    "WH_CD_T": req.body.wh_cd_t,
                    "PROD_CD": req.body.prod_cd,
                    "QTY": req.body.qty
                }
            }]
        }
    }
    
    requrestApi(goodsReceiptOptions, function(err, fin, apiBody){
        if(!err){
            res.json({
                result: apiBody
            })
        }
    })


}