const router = require('express').Router();

const { deleteMovieValidator } = require('../middlewares/validation');
const { createMovieValidate } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValidate, createMovie);
router.delete('/:_id', deleteMovieValidator, deleteMovieById);

module.exports = router;
