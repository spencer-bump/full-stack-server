// prod.js
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_SECRET,
  mongodbURL: process.env.MONGODB_URL,
  cookieKey: process.env.COOKIE_KEY
};