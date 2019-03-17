const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  name: String,
  email: String,
  phone: Number,
  completed: Boolean,
  completedDate: { type: Date, default: '' }
});
const PersonModel = mongoose.model('Person', personSchema);

module.exports = PersonModel;
