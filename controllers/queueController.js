var queue = require('../models/queue');
var queue_header  = require('../models/queue_header');
var async = require('async');
const url = require('url');
var io = require('socket.io');

exports.node_list = function(req, res) {
  queue.find({id_queue: req.query.queue_id})
    .exec(function (err, queue) {
      if (err) { return next(err); }
      res.render('show_queue', {queue: queue});
    });
};

exports.count_nodes = function(req, res) {
    queue.count({id_queue: req.query.id}, function(err, count) {
      var data = ' ' + count;
      res.send(data);
    });
};

exports.queue_list = function(req, res) {
  queue_header.find({id_user: req.query.id_user})
    .exec(function (err, list_queue) {
      if (err) { return next(err); }
      res.send(list_queue);
    });
};

exports.user_list = function(req, res) {
  queue.find({id_queue: req.params.id_queue})
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      res.send(list_users);
    });

};

exports.enqueue = function(req, res) {
  console.log('Entramos a enqueue');

  queue_header.findOne({_id: req.query.id})
  .exec(function(err, queue_){
    if(queue_){
      queue.findOne({id_queue: req.query.id})
        .sort({arrive: 'desc'}) // give me the max
        .exec(function (err, last) {
          if (err) {}
          let body = req.body;
          if(!last){
            body.id_user = null;
            body.id_next = null;
            body.id_queue = req.query.id;
            body.status = true;
            body.top = true;
            body.number = 1;
          }else{
            body.id_user = null;
            body.id_next = last._id;
            body.id_queue = req.query.id;
            body.status = true;
            body.top = false;
            body.number = last.number + 1;
          }
          console.log(last);
          queue.create(body, (err, users) =>{
            if(err) throw err;
            res.io.emit('qr' + req.query.id, req.query.id);
            res.io.emit(queue_.id_user, '$$$' + req.query.id);
            res.send('Ok');
          });
        });
    }else{
      //handle this error
    }
  });

};

exports.dequeue = function(req, res) {
    console.log('Entramos a dequeue')
    var id_top;
    queue_header.findOne({'_id': req.query.id})
    .exec(function(err, queue_){
      if(!queue_){
        console.log('no existe la cola');
        res.send('err 1');
      }else{
        queue.findOne({'top': true, 'id_queue': req.query.id})
        .exec(function(err, top){
          if(!top){
            console.log('la cola esta vacia');
          }else{
            id_top = top._id;
            number = top.number;
            queue.deleteOne({ _id: id_top }, function (err) {
              queue.findOne({ id_next: id_top }, function (err, new_top) {
                if(!new_top){
                console.log('la cola se vacio');
                res.send('err 2');
                }else{
                  new_top.top = true;
                  new_top.save();
                  res.io.emit(queue_.id_user, '$$$' + req.query.id);
                  res.io.emit('screen' + req.query.id, number);
                  res.send('Ok');
                }
              })
            });
          }
        });
      }
    });


};

exports.create_queue = function(req, res) {
      let body = req.body;
      body.id_user = req.body.usr_id;
      body.description = req.body.description_queue;
      body.alias_qr = req.body.alias_qr_queue;
      body.status = true;
      body.name = req.body.name_queue;
      queue_header.create(body, (err, users) =>{
        if(err) throw err;
        res.redirect(url.format({
              pathname:"/home/home",
              query: {
                  "user": req.body.user,
              }
        }));
      });
};

exports.delete_queue = function(req, res) {
  queue_header.deleteOne({ _id: req.query.queue_id }, (err) => {
    console.log(err);
    queue.deleteMany({id_queue: req.query.queue_id}, (err) => {});
  });
  res.io.emit('qr' + req.query.queue_id, "cancel");
  res.send('Ok');
};

exports.prueba = (req, res) => {
  res.io.emit("1", '$$$5b8e116d5730eb76a86c7432');
  res.send('hola');
};
