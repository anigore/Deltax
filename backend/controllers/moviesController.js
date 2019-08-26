var movieModel = require('../model/moviesModel');
var multer = require('multer')

var movies = {

  show: function (req, res) {
    res.status(200).json({ status: 'success', message: 'Success' });
  },

  create: function (req, res) {

    var movie = new movieModel();
    movie.movieName = req.body.movieName;
    movie.yearOfRelease = req.body.yearOfRelease
    movie.plot = req.body.plot;
    movie.poster = req.body.poster;
    movie.actors = req.body.actors;


    movie.save(function (err, docs) {

      if (err) {
        console.log(' not saved movie', err)

        res.status(404).json({ status: false, message: 'Datebase Error:' + err, docs: err });
      }
      else {
        console.log('saved movie succesfully', movie)

        res.status(200).json({ status: true, message: 'Movie added successfully', doc: docs });
        console.log('saved succesfully');
      }
    });
  },


  getAll: function (req, res) {
    movieModel.find(function (err, movies) {
      if (err) {
        res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
      }
      else {
        res.status(200).json({ status: true, message: "fetched successfully", movies: movies })
      }
    })
  },

  uploadPiture: function (req, res) {



    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)

      }
    });

    var upload = multer({ storage: storage }).single('photo');


    upload(req, res, function (err) {
      console.log("uploaded file - ", req.file.path)
      if (err) {
        res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: err });
      } else {

        res.status(200).json({ status: 'success', message: 'Picture is Successfully uploaded', docs: req.file.path });
      }

    });
  }

}
module.exports = movies;