var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

    username:String,
    avatarPhotoUrl:String,
    location:String,
    postPhotoUrl:String,
    description:String,
    likes:Number,
} ,{
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);