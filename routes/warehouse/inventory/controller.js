const models = require('../../../models')

exports.showInventory = (req, res) => {
    if(!req.body.name){
        models.inventory.find({
        }).then(qRes => {
            res.status(200).json({
                result: qRes
            })
        }).catch(err => {
            res.status(400).json({
                error: err
            })
        })
    }
    else{
        var name = req.body.name
        models.inventory.find({
            name: new RegExp(name, "i")
        }).then(qRes => {
            res.status(200).json({
                result: qRes
            })
        }).catch(err => {
            res.status(400).json({
                error: err
            })
        })
    }
}

exports.editInventory = (req, res) => {
    if(!req.body.code || !req.body.name || !req.body.x || !req.body.y || !req.body.count){
        res.status(400).json({
            error: "Please input all the correct infomation"
        })
    }
    else{
        var id = req.body.code
        var name = req.body.name
        var x = req.body.x
        var y = req.body.y
        var count = req.body.count

        models.warehouse.findById(x+"_"+y, (err, doc) => {
            if(err){
                res.status(400).json({
                    error: err
                })
            }
            else{
                models.inventory.findOneAndUpdate({
                    _id :id
                },{
                    name: name,
                    x : x,
                    y: y,
                    count: count
                },{
                    new: false
                }).then(qRes => {
                    var preX = qRes.x
                    var preY = qRes.y
                    var preName = qRes.name

                    if(preX != x || preY != y){
                        models.warehouse.findOneAndUpdate({
                            x: preX,
                            y: preY
                        }, {
                            $pull: {item: preName}
                        }).then(() => {
                            models.warehouse.findOneAndUpdate({
                                x: x,
                                y: y
                            },{
                                $push: {item: name}
                            },{
                                new: true
                            }).then(qRes => {
                                res.status(200).json({
                                    result: qRes
                                })
                            }).catch(qqErr => {
                                res.status(400).json({
                                    error: qqErr
                                })
                            })
                        }).catch(qErr => {
                            res.status(400).json({
                                error: qErr
                            })
                        })
                    }
                    else if(preName != name){
                        models.warehouse.findOneAndUpdate({
                            x: x,
                            y: y
                        },{
                            $pull: {item: preName}
                        },{
                            new: true
                        }).then(() => {
                            //Can't do $push and $pull in one request
                            models.warehouse.findOneAndUpdate({
                                x: x,
                                y: y
                            },{
                                $push: {item: name}
                            },{
                                new: true
                            }).then(qqRes => {
                                res.status(200).json({
                                    result: qqRes
                                })
                            }).catch(err => {
                                res.status(400).json({
                                    error: err
                                })
                            })
                        }).catch(qqqErr => {
                            res.status(400).json({
                                error: qqqErr
                            })
                        })
                    }
                    else{
                        res.status(200).json({
                            result: req.body
                        })
                    }
                })
            }
        })        
    }
}

exports.createInventory = (req, res) => {
    var id = req.body.code
    var name = req.body.name
    var x = req.body.x
    var y = req.body.y
    var count = req.body.count
    
    models.inventory.create({
        _id: id,
        name: name,
        x: x,
        y: y,
        count: count
    }).then( () => {
        models.warehouse.findOneAndUpdate({
            x: x,
            y: y
        },{
            $push: {item: name}
        },{
            new: true
        }).then(qRes => {
            if(!qRes){
                res.status(400).json({
                    error: "Please insert a vaild x and y coordinates"
                })
            }
            else{
                res.status(200).json({
                    result: qRes
                })
            }
        }).catch(qErr => {
            res.status(400).json({
                error: qErr
            })
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
}