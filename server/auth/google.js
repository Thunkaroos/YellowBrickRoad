const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const secrets = require('./secrets');
const User = require('../db/models/User');

// configuring the strategy (credentials + verification callback)
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(
  token,
  refreshToken,
  profile,
  done
) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({ where: { googleId: googleId } })
    .then(function(user) {
      if (!user) {
        return User.create({ name, email, googleId }).then(function(user) {
          done(null, user);
        });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);

// Google authentication and login
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
router.get(
  '/verify',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`/users/${req.user.id}`);
  }
);

module.exports = router;
