const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  creator: {
	type: String,
	required: true
  },
  duedate: {
  	type: String,
  	required: true
  },
  active: {
  	type: Boolean,
  	required: true
  },
  name: {
    type: String,
    required: true
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const GroupModel = mongoose.model('Group', GroupSchema);

module.exports = GroupModel;
