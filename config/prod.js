// prod.js
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallback: process.env.GOOGLE_CALLBACK,
  facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_SECRET,
  facebookCallback: process.env.FACEBOOK_CALLBACK,
  mongodbURL: process.env.MONGODB_URL,
  cookieKey: process.env.COOKIE_KEY
};