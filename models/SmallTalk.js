const mongoose = require("mongoose");
const {Schema} = mongoose;

const smallTalkSchema = new Schema({
  question: String,
  answer: String,
});

mongoose.model("smallTalk", smallTalkSchema);
