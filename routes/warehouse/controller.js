const models = require('../../models')
const sequelize = require('sequelize');

const Op = sequelize.Op;

exports.showWarehouse = (req, res) => {

}
exports.editWarehouse = (req, res) => {
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