var User = require('../models/user');

exports.addAccountInfo = function (req,res,next) {

    var accountInfo = req.body.accountInfo;
    var username = req.body.username;
    var id = req.body._id;

    console.log(id);

    User.findById(id,function (err,user) {

       user.accountInfo = accountInfo;
       user.save(function (err,updatedUser) {
           if(err){
               console.log(err);
               res.json(err);
           }
           res.json(updatedUser);
       })
    });

};

