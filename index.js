const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config/keys');

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!😊'))
  .catch(err => console.log(err.message.reason));
app.use(bodyParser.json());

require('./models/Registration');
require('./models/Demand');
require('./models/Coupons');

require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);

// mongoose.connect(config.mongoURI, {useNewUrlParser: true});
console.log('You are in ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  // js and css files
  app.use(express.static('client/build'));

  // index.html for all page routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
