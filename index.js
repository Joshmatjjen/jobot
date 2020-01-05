const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const config = require('./config/keys');
const mongoose = require('mongoose');
const db = config.mongoURI;
mongoose
  .connect(config.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log('DB connection successful!😊'))
  .catch(err => console.log(err.message.reason));

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     console.log('MongoDB is Connected...');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };
// connectDB();

require('./models/Registration');
require('./models/Demand');
require('./models/Coupons');
require('./models/Joshmat');
require('./models/BotFriends');
require('./models/Jokes');
require('./models/Test');

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // js and css files
  app.use(express.static('client/build'));

  // index.html for all page routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
