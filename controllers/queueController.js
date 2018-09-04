var queue = require('../models/queue');
var queue_header  = require('../models/queue_header');
var async = require('async');

var io = require('socket.io');


exports.node_list = function(req, res) {
  queue.find()
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      res.send(list_users);
    });
};

exports.queue_list = function(req, res) {
  queue_header.find({})
    .exec(function (err, list_queue) {
      if (err) { return next(err); }
      res.send(list_queue);
    });
};

exports.user_list = function(req, res) {
  queue.find({'id_queue': req.params.id_queue})
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      res.send(list_users);
    });

};

exports.enqueue = function(req, res) {
  queue_header.findOne({'_id': req.query.id})
  .exec(function(err, queue){
    if(!queue){
      res.send('no existe la queue');
      return;
    }
  });
  queue.findOne({ 'id_queue': req.query.id})
    .sort({arrive: 'desc'}) // give me the max
    .exec(function (err, last) {
      if (err) {}
      if(!last){
        let body = req.body;
        body.id_user = null;
        body.id_next = null;
        body.id_queue = req.query.id;
        body.status = true;
        body.top = true;
        console.log(last);
        queue.create(body, (err, users) =>{
          if(err) throw err;
          res.io.emit(req.query.id, req.query.id);
          res.redirect('/run/queue/list');
          return;
        })
      }else{
        let body = req.body;
        body.id_user = null;
        body.id_next = last._id;
        body.id_queue = req.query.id;
        body.status = true;
        body.top = false;
        console.log(last);
        queue.create(body, (err, users) =>{
          if(err) throw err;
          res.io.emit(req.query.id, req.query.id);
          res.redirect('/run/queue/list');
        })
      }
    });
};

exports.dequeue = function(req, res) {
    var id_top;
    queue_header.findOne({'_id': req.query.id})
    .exec(function(err, queue){
      if(!queue){
        res.send('no existe la queue');
        return;
      }
    });
    queue.findOne({'top': true, _id: req.query.id})
    .exec(function(err, top){
      if(!top){
        res.send('empty');
      }else{
        id_top = top._id;
        console.log(id_top);
        queue.deleteOne({ _id: id_top }, function (err) {
          console.log(err);
        });
        queue.findOne({ id_next: id_top }, function (err, new_top) {

            new_top.top = true;
            new_top.save();

        })
      }
    });

};

exports.create_queue = function(req, res) {
      let body = req.body;
      body.id_user = req.body.usr_id;
      body.status = true;
      body.name = req.body.name_queue;

      queue_header.create(body, (err, users) =>{
        if(err) throw err;
        res.redirect('/run/queue_header/list');
      });
};

exports.delete_queue = function(req, res) {
  queue.findOne({ 'id_cola': req.params.id_queue })
    .sort({arrive: 'desc'}) // give me the max
    .exec(function (err, last) {

    });
};
