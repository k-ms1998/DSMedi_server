const router = require('express').Router()

router.use('/erp', require('./erp'))
router.use('/hmp', require('./hmpmall'))
router.use('/process', require('./process'))

module.exports = router