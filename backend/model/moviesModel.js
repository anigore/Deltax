var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movies = new Schema({
    movieName: String,
    yearOfRelease: Number,
    plot: String,
    poster: String,
    actors: []
});

module.exports = mongoose.model('movies', movies); 