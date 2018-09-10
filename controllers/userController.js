var user = require('../models/users');
var queue_header = require('../models/queue_header');
const url = require('url');

exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

exports.create_user = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

exports.exec = (req, res) => {
    user.findOne({name: req.body.user})
    .exec((err, usr) => {
      if(!usr){
        return;
      }else{
        //console.log(usr.name);
        //console.log(usr._id);
        res.redirect(url.format({
              pathname:"/home/home",
              query: {
                  "user": usr.name,
                  //"usr_id": usr._id
              }
        }));
      }
    });


};
exports.signin = (req, res) => {
  res.render('signin');
};

exports.create_user = (req, res) => {
    if(req.body.pass == req.body.passrepeat){
      console.log(req.body.pass);
      console.log(req.body.passrepeat);
      user.findOne({name: req.body.user})
      .exec((err, usr) => {
        if(!usr){
          user.create({name: req.body.user, password: req.body.pass}, (err, users) => {
            if(err) throw err;
            res.redirect('login');
            return;
          });
        }else{
          return;
        }
      });
    }else{
      res.send('las contraseñas no coinciden');
    }
}
