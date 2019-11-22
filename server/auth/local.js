const router = require('express').Router();
const User = require('../db/user.model');

// This marries the original auth code we wrote to Passport.
// An alternative would be to use the "local strategy" option with Passport.

// check currently-authenticated user, i.e. "who am I?"
router.get('/me', (req, res, next) => {
  res.send(req.user);
});

// signup, i.e. "let `me` introduce myself"
router.post('/signup', async (req, res, next) => {
  const [user, created] = await User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      // if the user doesn't exist, create including this info
      password: req.body.password
    }
  });

  if (created) {
    req.logIn(user, err => {
      if (err) return next(err);
      res.json(user);
    });
  } else {
    res.sendStatus(401); // this user already exists, you cannot sign up
  }
});

// login, i.e. "you remember `me`, right?"
router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: req.body // email and password
    });

    if (!user) {
      res.sendStatus(401); // no message good practice to omit why auth fails
    } else {
      req.logIn(user, err => {
        if (err) return next(err);
        res.json(user);
      });
    }
  } catch (err) {
    next(err);
  }
});

// logout, i.e. "please just forget `me`"
router.delete('/logout', (req, res, next) => {
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;
