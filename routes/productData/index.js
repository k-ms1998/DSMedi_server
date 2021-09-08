const router = require('express').Router()
const controller = require('./controller')

router.post('/show_product', controller.showProduct)
router.post('/update_sn', controller.updateSn)
router.post('/match_sn', controller.matchSn)

module.exports = router