const router = require("express").Router();

router.use('/login', require('./login'))
router.use('/sale_data', require('./saleData'))

module.exports = router;