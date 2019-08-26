var actorsModel = require('../model/actorsModel');

var actors = {

  show: function (req, res) {
    res.status(200).json({ status: 'success', message: 'Success' });
  },

  create: function (req, res) {

    var actor = new actorsModel();
    actor.actorName = req.body.actorName;
    actor.dateOfBirth = req.body.dateOfBirth
    actor.sex = req.body.sex;
    actor.bio = req.body.poster;

    console.log('saved actor succesfully', actor)

    actor.save(function (err) {

      if (err) {
        res.status(404).json({ status: false, message: 'Datebase Error:' + err, docs: '' });
      }
      else {
        res.status(200).json({ status: true, message: 'Actor added successfully', doc: '' });
        console.log('saved succesfully');
      }
    });
  },

  getAll: function(req, res){
    actorsModel.find(function(err,actorsModel){
        if(err)
        {
          res.status(500).json({status:'error', message: 'Datebase Error:' + err , docs:''});
        }
        else {
            res.status(200).json({status : true, message : "fetched successfully", actors:actorsModel})
        }
    })
},

}
module.exports = actors;