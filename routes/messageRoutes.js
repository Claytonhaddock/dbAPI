const express    = require('express');
const bodyParser = require('body-parser');
const Models     = require('../controllers/modelsController');

const GroupModel  = Models.GroupModel;
const PersonModel = Models.PersonModel;

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', (req, res) => {
  let options = {
    active: true
  };

  GroupModel
    .find(options)
    .populate('members')
    .exec(function (err, group) {
      if (err) return handleError(err);
      const unpaid = group.members.filter(m => {
        return m.completed === false;
      })
      res.status(200).send(unpaid);
    });
});


module.exports = router;
