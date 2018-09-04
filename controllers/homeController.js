var user = require('../models/users');

exports.create_queue = (req, res) => {
  console.log(req.query);
    res.render('create_queue', {user: req.query.user, usr_id: req.query.usr_id});
};

exports.run_qr = (req, res, next) => {
  res.render('qr', { title: 'Express', ini: req.query.queue_id });
};
