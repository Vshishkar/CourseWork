var Post = require('../models/Post');

exports.getPosts = function(req, res, next){

    Post.find(null,null, { sort :{ createdOn : -1}},function(err, todos) {

        if (err){
            res.send(err);
        }
        res.json(todos);
    });
};


exports.getPostsByUsername = function(req,res,next){

    var username = req.params.username;

   // console.log(req.body + " " + username + " this is server console log");

    Post.find({username:username},null, { sort :{ createdOn : +1}},function (err,posts) {

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
        likes:[],
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


exports.leaveLike = function (req,res,next) {

    var username = req.params.username;
    var post_id = req.body._id;

    Post.findOne({_id:post_id},function (err,posts) {

        posts.likes.find({username:username},function (err,post) {
            posts:remove(username);
        },{
            posts:add(username)
        });

        if(err){
            res.send(err);
        }
        console.log(posts);
        res.json(posts);
    })

};