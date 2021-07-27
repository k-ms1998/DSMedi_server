const router = require("express").Router();
const controller = require("./controller");

router.post('/', controller.login);
router.post('/zone', controller.zone)

module.exports = router;