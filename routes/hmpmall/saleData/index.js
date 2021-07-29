const router = require("express").Router();
const controller = require("./controller");

router.post('/', controller.getData);

module.exports = router;