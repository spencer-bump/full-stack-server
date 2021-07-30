// ***********************************
//     PASSPORT OAUTH ROUTES
// ***********************************
const passport = require('passport');

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    })
  );
  app.get('/auth/google/callback',
    passport.authenticate('google')
  );

  app.get('/api/logout', (req, res) => {
    // kills the cookie
    req.logout();
    // empty response
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
      res.send(req.user);
  });

  // app.get('/auth/facebook',
  //   passport.authenticate('facebook')
  // );

  // app.get('/auth/facebook/callback',
  //     passport.authenticate('facebook', { failureRedirect: '/login' } ),
  //     (req, res) => {
  //     // Successful authentication, redirect home.
  //     res.redirect('/');
  //   }
  // );

};
