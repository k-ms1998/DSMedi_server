const router = require('express').Router();
const controller = require("./controller");

router.post('/quotation-list', controller.quotation)

module.exports = router