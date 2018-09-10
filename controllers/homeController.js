var user = require('../models/users');
var queue_header = require('../models/queue_header');
var io = require('socket.io');

exports.create_queue = (req, res) => {
  console.log(req.query);
    res.render('create_queue', {user: req.query.user, usr_id: req.query.usr_id});
};

exports.run_qr = (req, res, next) => {
  queue_header.find({_id: req.query.queue_id})
  .exec(function (err, q) {
    if(!q){
      res.send('No existe la queue');
    }else{
      console.log(q);
      res.render('qr', { title: 'Express', ini: '1', q: q});
    }
  });
};

exports.run_screen = (req, res, next) => {
    res.render('screen_principal', {id: req.query.queue_id});
};

exports.home = (req, res, next) => {
  let id;
  user.findOne({name: req.query.user})
  .exec((err, usr) => {
    queue_header.find({id_user: usr._id})
    .exec(function (err, queues) {
      if (err) { return next(err); }
      console.log(usr._id);
      res.render('home', {user: req.query.user, usr_id: usr._id, queues: queues});
    });
  });
};

exports.mapa = (req, res, next) => {
  res.render('mapas');
};
