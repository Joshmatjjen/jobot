const mongoose = require('mongoose');
const {Schema} = mongoose;

const botFriendsSchema = new Schema({
  name: String,
  gender: String,
  mobile: String,
  social_media: String,
  dateSent: Date,
});

mongoose.model('botFriend', botFriendsSchema);

// {
//   "text": "Who would you like to know more about?",
//   "quick_replies": [
//     {
//       "text": "Bot",
//       "payload": "bot"
//     },
//     {
//       "text": "Josh",
//       "payload": "josh"
//     }
//   ]
// }
