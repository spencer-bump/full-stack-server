const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
  new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.googleCallback,
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then( googleUser  => {
        if (googleUser) {
          // already have a record
          console.log("google user: ", googleUser);
          done(null, googleUser);
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

passport.use(
  new FacebookStrategy(
  {
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: keys.facebookCallback,
    profileFields: ['id', 'displayName']
  },
  (accessToken, refreshToken, profile, done) => {
      console.log("fb profile: ", profile);
      User.findOne({ facebookId: profile.id })
      .then( facebookUser  => {
        if (facebookUser) {
          // already have a record
          console.log("facebook user: ", facebookUser);
          done(null, facebookUser);
        } else {
          // dont have record - make new user
          new User({ facebookId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
