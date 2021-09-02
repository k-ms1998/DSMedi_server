const router = require('express').Router()
const controller = require('./controller')

router.post('/show_product', controller.showProduct)

module.exports = router