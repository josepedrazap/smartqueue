var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/homeController');

router.get('/create_queue', home_controller.create_queue);
router.get('/run_qr', home_controller.run_qr);

module.exports = router;
