const models = require('../../models')
const sequelize = require('sequelize');

const Op = sequelize.Op;

const allowed_types = ["bgs", "mask", "health", "bandaid", "vitamins"]
//bgs = 혈당측정지, mask =  마스크, health = 건강식품, bandaid =  밴드, vitamins = 비타민(키즈 비타민)

exports.showProduct = async (req, res) => {
    //Get info on products
    //Requires product name(at least keyword), type of product(ie, 혈당측정지, 마스크, etc)
    if(!req.body.name && !req.body.type){
        //Returns 400 if both the name and type are invalid/empty
        res.status(400).json({
            result: "Please insert at least one of the required information"
        })
    } 
    else{
        const name = req.body.name;
        const type = req.body.type;
        if(!allowed_types.includes(type)){
            res.status(400).json({
                result: "Please input a valid type"
            })
        }
        else{
            await models.stdProducts.findAll({
                where:{
                    name: {
                        [Op.like]: "%"+name+"%"
                    },
                    type: type
                }
            }).then(result => {
                res.status(200).json({
                    result: result
                })
            })
        }

    }
}

exports.updateSn = (req, res) => {
    //Update the serial number for products
    //Requires the name of the product, product ID and serial number
    if(!req.body.name || !req.body.id || !req.body.sn){
        res.status(400).json({
            result: "Please input the name, product ID and sn"
        })
    }
    else{
        const name = req.body.name;
        const id = req.body.id;
        const sn = req.body.sn;
        models.stdProducts.findOne({
            where:{
                id: id,
                name: name
            }
        }).then(result => {
            if(!result){
                res.status(400).json({
                    result: "Empty Result"
                })
            }
            else{
                let updated_values = {
                    name: name,
                    id : id,
                    sn: sn
                }
                result.update(updated_values)
                            .then(updated_result => {
                                res.status(200).json({
                                    result: updated_result
                                })
                            })
            }
        }).catch(err => {
            res.status(400).json({
                error: err
            })
        })
    }
}

exports.matchSn = (req, res) => {
    //Matches the sale data with the serial number of that product

    //SELECT *FROM saledata LEFT JOIN promatches ON product_id = mall_id LEFT JOIN stdproducts ON erp_id = id;
    models.saleData.findAll({
        attributes:[
            'mall', 'storeName'
        ],
        include:[
            {
                model: models.proMatch,
                required: false,
                attributes:[
                    ['erp_id', 'id']
                ]
            },
            {
                model: models.proMatch,
                include: [{
                    model: models.stdProducts,
                    required: false,
                    attributes:[
                        'name', 'sn'
                    ]
                }],
                required: false
            }
        ]
    }).then(result => {
        res.json({
            info: result
        })
    }).catch(err => {
        console.log(err)
        res.json({
            error: err
        })
    })
}