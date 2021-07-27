const router = require('express').Router()
const controller = require('./controller')

router.post('/', controller.openMarket)

module.exports = router