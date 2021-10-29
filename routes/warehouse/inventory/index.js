const router = require('express').Router()
const controller = require('./controller')

router.post('/showInventory', controller.showInventory)
router.post('/createInventory', controller.createInventory)
router.post('/editInventory', controller.editInventory)

module.exports = router