const mongoose = require('mongoose');
const Person   = require('./personModel')
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
  name: {
    type: String,
    required: true
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

GroupSchema.pre('remove', (doc) => {
	console.log('removing people');
    // doc will be the removed Person document
    Person.remove({_id: { $in: doc.members }})
});

const GroupModel = mongoose.model('Group', GroupSchema);


module.exports = GroupModel;
