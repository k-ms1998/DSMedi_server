const router = require('express').Router();
const controller = require("./controller");

router.post('/quotation-list', controller.quotation)
router.post('/save-order', controller.save_order)
router.post('/save-sale', controller.save_sale)

module.exports = router