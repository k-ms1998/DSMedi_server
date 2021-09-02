const models = require('../../models')
const sequelize = require('sequelize')

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