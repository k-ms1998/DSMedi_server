const router = require('express').Router()
const controller = require('./controller')

router.post('/job-order', controller.jobOrder)
router.post('/goods-issued', controller.goodsIssued)
router.post('/goods-receipt', controller.goodsReceipt)

module.exports = router