const models = require('../../models')
const sequelize = require('sequelize');

const Op = sequelize.Op;

exports.showWarehouse = (req, res) => {
    models.warehouse.find({
    }).then(qRes => {
        res.status(200).render(
            'warehouse',
            {
                inven_loc: qRes
            }
        )
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
}
exports.editWarehouse = (req, res) => {
    var id = req.body.x+"_"+req.body.y
    var items = req.body.items

    models.warehouse.findOneAndUpdate({_id: id}, {
        item: items
    },{
        new: true
    }).then(qRes => {
        if(!qRes){
            res.status(400).json({
                error: "Please insert a valid x and y coordinates"
            })
        }
        else{
            res.status(200).json({
                result: qRes
            })
        }
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
}
exports.createWarehouse = (req, res) => {
    var x = req.body.x
    var y = req.body.y
    var items = req.body.items
    models.warehouse.create({
        _id: x+"_"+y,
        x: x,
        y: y,
        item: items
    }).then(()=>{
        res.status(200).json({
            result: "Warehouse data updated"
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
}