const mongoose = require('mongoose');
const validator = require('validator');
const { messageValidationError } = require('../consts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, messageValidationError.required],
  },
  director: {
    type: String,
    required: [true, messageValidationError.required],
  },
  duration: {
    type: Number,
    required: [true, messageValidationError.required],
  },
  year: {
    type: String,
    required: [true, messageValidationError.required],
  },
  description: {
    type: String,
    required: [true, messageValidationError.required],
  },
  image: {
    type: String,
    required: [true, messageValidationError.required],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: messageValidationError.url,
    },
  },
  trailerLink: {
    type: String,
    required: [true, messageValidationError.required],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: messageValidationError.url,
    },
  },
  thumbnail: {
    type: String,
    required: [true, messageValidationError.required],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: messageValidationError.url,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, messageValidationError.required],
  },
  nameEN: {
    type: String,
    required: [true, messageValidationError.required],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
