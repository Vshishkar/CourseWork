var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../../config/auth');

function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

function setUserInfo(request){
    return {
        _id: request._id,
        username: request.username,
        role: request.role,
        avatarPhotoUrl:request.avatarPhotoUrl,
        accountInfo:request.accountInfo,
    };
}

exports.login = function(req, res, next){

    console.log(req);

    var userInfo = setUserInfo(req.user);

    console.log(userInfo);


    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });

};

exports.register = function(req, res, next){

    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;
    var avatarPhotoUrl = req.body.avatarPhotoUrl;

    console.log(req.body);


    if(!username){
        return res.status(422).send({error: 'You must enter an username address'});
    }

    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    User.findOne({username: username}, function(err, existingUser){

        if(err){
            return next(err);
        }

        if(existingUser){
            return res.status(422).send({error: 'That username address is already in use'});
        }

        var user = new User({
            username: username,
            password: password,
            role: role,
            avatarPhotoUrl:avatarPhotoUrl,
            accountInfo:""
        });

        user.save(function(err, user){

            if(err){
                return next(err);
            }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })

        });

    });

};

exports.roleAuthorization = function(roles){

    return function(req, res, next){

        var user = req.user;

        User.findById(user._id, function(err, foundUser){

            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }

            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }

            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');

        });

    }

};