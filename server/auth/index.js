const router = require('express').Router();
const { User } = require('../db');

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

router.post('/login', async (req, res, next) => {
    try {
      const user = await User.findOne({where: {email: req.body.email}})
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        console.log('Success!')
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    } catch (err) {
      next(err)
    }
  })

// logout, i.e. "please just forget `me`"
router.delete('/logout', (req, res, next) => {
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;
