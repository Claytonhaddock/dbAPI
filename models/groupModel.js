const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  creator: String,
  name: String,
  dueDate: { type: Date, default: Date.now },
  members: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});
const GroupModel = mongoose.model('Group', GroupSchema);


module.exports = GroupModel;
