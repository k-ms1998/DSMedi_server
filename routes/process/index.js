const router = require('express').Router()
const controller = require('./controller')

router.post('/getData', controller.getData)
router.post('/calPath', controller.calPath)


module.exports = router