const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');
const { messageValidationError, messageUnauthorizedError } = require('../consts');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Райан',
    minlength: [2, messageValidationError.minlength],
    maxlength: [30, messageValidationError.maxlength],
  },
  email: {
    type: String,
    required: [true, messageValidationError.required],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: messageValidationError.email,
    },
  },
  password: {
    type: String,
    required: [true, messageValidationError.required],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messageUnauthorizedError.errAuth);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messageUnauthorizedError.errAuth);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
