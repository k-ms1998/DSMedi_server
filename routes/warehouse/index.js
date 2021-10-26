const router = require('express').Router()
const controller = require('./controller')

//router.get('/showWarehouse', controller.showWarehosue)
router.post('/editWarehouse', controller.editWarehouse)

module.exports = router