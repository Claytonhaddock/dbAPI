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

  GroupModel
    .find(options)
    .populate('members')
    .exec(function (err, group) {
      if (err) return handleError(err);
      res.status(200).send(group);
    });
});

router.post('/', (req, res) => {
  GroupModel.create({
    creator: req.body.creator,
    name: req.body.name,
    duedate: req.body.duedate,
    active: req.body.active
  }, (err, task) => {
    if (err) return res.status(500).send('Problem adding to group data.' + err);
    res.status(200).send(task);
  });
});

router.delete('/:id', (req, res) => {
  GroupModel.findByIdAndRemove(
    req.params.id, (err, group) => {
      if (err) return res.status(500).send('Problem deleting group.');
          PersonModel.remove({_id: { $in: group.members }}, (err, res) => {
      })
      res.status(200).send('Group was deleted.');
    }
  );
});

router.put('/:id', (req, res) => {
  GroupModel.findByIdAndUpdate(
    req.params.id, req.body, { new: true }, (err, task) => {
      if (err) return res.status(500).send('Problem edit task.');
      res.status(200).send(`This task name ${task.name} was edited.`);
    }
  );
});

module.exports = router;
