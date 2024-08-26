const express = require('express');
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();


//auth routes
router.post('/signup', signup);

//signin
router.post('/signin', signin);

//logout
router.get('/logout', logout);

router.get('/me', isAuthenticated, userProfile);

module.exports = router;