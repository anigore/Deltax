var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actors = new Schema({
    actorName: String,
    sex: String,
    dateOfBirth: Date,
    bio: String,
});

module.exports = mongoose.model('actors', actors); 