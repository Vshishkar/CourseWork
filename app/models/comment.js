var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username:String,
    content:String,
});

module.exports = mongoose.model('Comment', CommentSchema);