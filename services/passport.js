const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('gusers');

passport.serializeUser((user, done) => {
  // passport serializes the user.id and
  // stuffs it into a cookie
  // user.id is the mongoDB id,
  // not a specific auth provider profile id
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // id stored in cookie is
  // deserialized and used to
  // find the user in the database
  User.findById(id)
    .then(user => {
      console.log('db user: ', user);
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then( existingUser  => {
        if (existingUser) {
          // already have a record
          console.log("existingUser: ", existingUser);
          done(null, existingUser);
        } else {
          // dont have record - make new user
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);


// npm install passport-facebook

// const FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'displayName']
//   }, (accessToken, refreshToken, profile, done) => {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
