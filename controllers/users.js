const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const ValidationError = require('../errors/validation-err');
const { NODE_ENV, JWT_SECRET } = require('../config');
const {
  messageValidationError, messageNotFoundError, messageConflictError, messageSent,
} = require('../consts');

const findById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageNotFoundError.user);
      } else {
        return (res.send(user));
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  findById(req, res, next, _id);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const { ...userData } = user.toObject();
      delete userData.password;
      res.status(201).send({ data: userData });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(messageValidationError.user));
      } else if (err.code === 11000) {
        next(new ConflictError(messageConflictError.user));
      } else {
        next(err);
      }
    });
};

const updateUserData = (req, res, next, args) => {
  User.findByIdAndUpdate(req.user._id, args, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(messageValidationError.user));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(messageNotFoundError.user));
      } else if (err.code === 11000) {
        next(new ConflictError(messageConflictError.user));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  updateUserData(req, res, next, { name, email });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );

      res.cookie('jwt', token, {
        maxAge: 3600000000000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: messageSent.login, token });
    })
    .catch(next);
};

module.exports.signout = (_, res) => {
  res.clearCookie('jwt').send({ message: messageSent.signout });
};
