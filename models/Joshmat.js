const mongoose = require('mongoose');
const {Schema} = mongoose;

const joshmatSchema = new Schema({
  question: String,
  answer: String,
});

mongoose.model('joshmat', joshmatSchema);
