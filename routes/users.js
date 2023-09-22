const router = require('express').Router();
const { updateProfileValidate } = require('../middlewares/validation');

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateProfileValidate, updateProfile);

module.exports = router;
