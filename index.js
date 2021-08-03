// ***********************************
//            PACKAGES
// ***********************************
const cookieSession = require('cookie-session');
const express       = require('express');
const fs            = require('fs');
const https         = require('https');
const mongoose      = require('mongoose');
const passport      = require('passport');
const keys          = require('./config/keys');
// NEED TO LOAD MODELS B4 passport
require('./models/User');
// LOAD PASSPORT STRATEGY
require('./services/passport');
// ***********************************
//        DATABASE CONNECTION
// ***********************************
mongoose.connect(keys.mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, error => {
  if (error) console.error(error)
  console.log('mongodb connection successful');
})
// ***********************************
//               APP
// ***********************************
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// LOAD AUTH ROUTES
require('./routes/authRoutes')(app);

// ***********************************
//            START SERVER
// heroku:
// https://pacific-sierra-16266.herokuapp.com/
// http://localhost:5000/
// ***********************************
const PORT = process.env.PORT || 5000;
app.listen(PORT);
