var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    username:String,
    avatarPhotoUrl:String,
    accountInfo:String,
});

module.exports = mongoose.model('Account', AccountSchema);