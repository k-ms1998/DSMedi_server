const router = require('express').Router()
const controller = require('./controller')

router.get('/showWarehouse/', controller.showWarehouse)
router.post('/editWarehouse', controller.editWarehouse)
router.post('/createWarehouse', controller.createWarehouse)

module.exports = router