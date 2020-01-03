const mongoose = require('mongoose');
const {Schema} = mongoose;
const random = require('mongoose-simple-random');

const jokesSchema = new Schema({
  name: String,
  type: String,
  value: String,
  dateSent: Date,
});

jokesSchema.plugin(random);

mongoose.model('joke', jokesSchema);
