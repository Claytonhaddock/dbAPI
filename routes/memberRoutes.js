const express    = require('express');
const bodyParser = require('body-parser');
const Models     = require('../controllers/modelsController');
const ObjectId   = require('mongodb').ObjectID;

const GroupModel  = Models.GroupModel;
const PersonModel = Models.PersonModel;

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  let options = {};
  if(req.query){
    options = req.query;
  }
  PersonModel.find(options, (err, task) => {
    if (err) return res.status(500).send('Problem finding the task.');
    res.status(200).send(task);
  });
});

router.post('/', (req, res) => {
  PersonModel
    .create(req.body)
    .then(groupMember => {
      return GroupModel.findOneAndUpdate(
        { 
          _id: req.body.group
        },
        {
          $push: { 
            members: groupMember._id 
          }
        },
        { 
          new: true 
        }
      );
    })
    .then(groupMember => {
      res.status(200).send(groupMember);
    })
    .catch(err => {
      res.status(500).send('Problem adding member to group.' + err);
  });
});

router.delete('/:id/:groupid', (req, res) => {
  PersonModel.findByIdAndRemove(
    req.params.id, (err, task) => {
      if (err) return res.status(500).send('Problem deleting task.');
      GroupModel.findOneAndUpdate(
        { 
          _id: req.params.groupid
        },
        {
          $pull: { 
            members: req.params.id
          }
        }, function(err, group) {
          if(err) return res.status(500).send('Problem: ' + err)
            return res.status(200).send('Removed: ' + group)
        }
      );
    }
  );
});

router.put('/:id', (req, res) => {
  PersonModel.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }, 
    (err, task) => {
      if (err) return res.status(500).send('Problem edit task.');
      res.status(200).send(`${task.name} was updated.`);
    }
  );
});

module.exports = router;
