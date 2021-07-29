const router = require('express').Router()

router.use('/erp', require('./erp'))
router.use('/hmp', require('./hmpmall'))

module.exports = router