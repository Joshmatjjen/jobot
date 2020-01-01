const mongoose = require('mongoose');
const {Schema} = mongoose;

const registrationSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  dateSent: Date,
});

mongoose.model('registration', registrationSchema);

// const Registration = mongoose.model('registration', registrationSchema);
// module.exports = Registration;
