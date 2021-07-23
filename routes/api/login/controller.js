const requestApi = require('request');
const express = require("express");

const keys = {
    "user_id": process.env.user_id,
    "authen": process.env.authen,
    "com_code": process.env.com_code,
}

exports.login = (req,res) => {
    const com_code = keys.com_code;
    const user_id = keys.user_id;
    const authen = keys.authen;
    const zone = 'AA';
    const url = 'https://oapi'+zone+'.ecount.com/OAPI/V2/OAPILogin';
    const testUrl = 'https://sboapi'+zone+'.ecount.com/OAPI/V2/OAPILogin';
    

    let zoneOptions = {
        uri : testUrl,
        method : "POST",
        headers:{
            "Content-Type": "application/json",
        },
        json:{
            "COM_CODE" : com_code,
            "USER_ID" : user_id,
            "API_CERT_KEY" : authen,
            "LAN_TYPE" : 'ko-KR',
            "ZONE" : zone
        }
    }

    requestApi(zoneOptions, function(err, fin, body){
        //console.log(body)
        res.json({
            result: body
        });
    })
}

exports.zone = (req, res) => {
    const url = 'https://oapi.ecount.com/OAPI/V2/Zone';
    const testUrl = 'https://sboapi.ecount.com/OAPI/V2/Zone';
    const com_code = '166108';

    let zoneOptions = {
        uri : testUrl,
        method : "POST",
        headers:{
            "Content-Type": "application/json",
        },
        json:{
            "COM_CODE" : com_code
        }
    }

    requestApi(zoneOptions, function(err, fin, body){
        //zone = body["Data"]["ZONE"]
        if(!err){
            res.status(200).json({
                zone: body.Data.ZONE
            });
        }
    })
}