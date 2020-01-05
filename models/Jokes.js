const mongoose = require("mongoose");
const {Schema} = mongoose;

const jokesSchema = new Schema({
  id: Number,
  name: String,
  type: String,
  value: {
    type: String,
    required: true,
    dropDups: true,
  },
  dateSent: Date,
});

mongoose.model("joke", jokesSchema);
