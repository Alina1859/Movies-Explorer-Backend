const express = require('express');

const router = express.Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login, signout } = require('../controllers/users');
const { signupValidate, signinValidate } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
const { messageNotFoundError, messageSent } = require('../consts');

const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(messageSent.servWillLay);
  }, 0);
});

router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);
router.get('/signout', signout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(messageNotFoundError.wrongPath));
});

module.exports = router;
