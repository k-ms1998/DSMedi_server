const router = require('express').Router()

router.use('/erp', require('./erp'))
router.use('/hmp', require('./hmpmall'))
router.use('/process', require('./process'))
router.use('/pData', require('./productData'))
router.use('/wHouse', require('./warehouse'))

module.exports = router