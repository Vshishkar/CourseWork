var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

    username:String,
    avatarPhotoUrl:String,
    location:String,
    postPhotoUrl:String,
    description:String,
    likes:Number,
});

module.exports = mongoose.model('Post', PostSchema);