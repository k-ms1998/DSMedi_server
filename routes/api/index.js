const router = require("express").Router();

router.use('/login', require('./login'))
router.use('/accounting', require('./accounting'))
router.use('/operating', require('./operating'))

module.exports = router;