var Post = require('../models/Post');

exports.getPosts = function(req, res, next){

    Post.find(function(err, todos) {

        if (err){
            res.send(err);
        }
        res.json(todos);
    });

};


exports.getPostsByUsername = function(req,res,next){

    var username = req.params.username;

   // console.log(req.body + " " + username + " this is server console log");

    Post.find({username:username},function (err,posts) {

        if(err){
            res.send(err);
        }
        console.log(posts);
        res.json(posts);
    })

};


exports.createPost = function(req, res, next){

    console.log(req.body);

    Post.create({
        username : req.body.username,
        likes:0,
        location:req.body.location,
        description:req.body.description,
        avatarPhotoUrl:req.body.avatarPhotoUrl,
        postPhotoUrl:req.body.postPhotoUrl,

    }, function(err, todo) {

        if (err){
            res.send(err);
        }

        Post.find(function(err, todos) {
            if (err){
                res.send(err);
            }
            res.json(todos);
        });
    });
};

exports.deletePost = function(req, res, next){

    Post.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        res.json(todo);
    });

};