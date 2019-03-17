const express    = require('express');
const bodyParser = require('body-parser');
const Models     = require('../controllers/modelsController');

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
        {$push: {members: groupMember._id}},
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

router.delete('/:id', (req, res) => {
  PersonModel.findByIdAndRemove(
    req.params.id, (err, task) => {
      if (err) return res.status(500).send('Problem deleting task.');
      res.status(200).send(`Task name : ${task.name} was deleted.`);
    }
  );
});

router.put('/:id', (req, res) => {
  PersonModel.findByIdAndUpdate(
    req.params.id, req.body, { new: true }, (err, task) => {
      if (err) return res.status(500).send('Problem edit task.');
      res.status(200).send(`This task name ${task.name} was edited.`);
    }
  );
});

module.exports = router;
