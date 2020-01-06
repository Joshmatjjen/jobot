const mongoose = require("mongoose");
const {Schema} = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const jokesSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },
  name: String,
  type: String,
  value: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  dateSent: Date,
});
jokesSchema.plugin(uniqueValidator);

mongoose.model("joke", jokesSchema);
