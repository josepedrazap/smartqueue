var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  //res.io.emit("socketToMe", "users");
  res.render('login');
});

router.post('/exec', user_controller.exec);
router.get('/signin', user_controller.signin);
router.post('/create_user', user_controller.create_user);

module.exports = router;
