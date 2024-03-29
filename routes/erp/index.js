const router = require("express").Router();

router.use('/login', require('./login'))
router.use('/accounting', require('./accounting'))
router.use('/operating', require('./operating'))
router.use('/production', require('./production'))
router.use('/openMarket', require('./openMarket'))

module.exports = router;