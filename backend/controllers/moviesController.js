var movieModel = require('../model/moviesModel');
var multer = require('multer')

var movies = {

  /** function to add new movie */

  create: function (req, res) {
    var movie = new movieModel();
    movie.movieName = req.body.movieName;
    movie.yearOfRelease = req.body.yearOfRelease
    movie.plot = req.body.plot;
    movie.poster = req.body.poster;
    movie.actors = req.body.actors;

    movie.save(function (err, docs) {
      if (err) {
        res.status(404).json({ status: false, message: 'Datebase Error:' + err, docs: err });
      }
      else {
        res.status(200).json({ status: true, message: 'Movie added successfully', doc: docs });
      }
    });
  },

  /**function to fetch all movie list  */

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

  /**fetch single movie details  */
  getOne: function (req, res) {
    movieModel.findById(req.params.id, function (err, doc) {
      if (err) {
        res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, doc: '' });
      }
      else {
        res.status(200).json({ status: 'success', message: 'Success', docs: doc });
      }
    });
  },

  /**to update the movid details */

  updateOne: function (req, res) {

    query = { '_id': req.params.id }
    movieModel.updateOne(query, req.body, function (err, docs) {
      if (err) {
        res.status(500).json({ status: false, message: 'Datebase Error:' + err, docs: err });
      }
      else {
        res.status(200).json({ status: true, message: 'Movie edited successfully', doc: docs });
      }
    })
  },

  /**to save poster at server side ere I used multer */

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
      if (err) {
        res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: err });
      } else {
        res.status(200).json({ status: 'success', message: 'Picture is Successfully uploaded', docs: req.file.path });
      }
    });
  }
}
module.exports = movies;