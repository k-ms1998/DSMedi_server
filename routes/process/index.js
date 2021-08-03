const router = require('express').Router()
const controller = require('./controller')

router.post('/getData', controller.getData)

module.exports = router