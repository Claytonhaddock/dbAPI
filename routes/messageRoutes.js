const express        = require('express');
const bodyParser     = require('body-parser');
const Models         = require('../controllers/modelsController');
const messageHandler = require('../handlers/messageHandler');

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
    .exec(function (err, groups) {
      if (err) return handleError(err);

      const messaged = messageHandler(groups)

      res.status(200).send(messaged);
    });
});


module.exports = router;
