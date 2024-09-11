var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/auth');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

router.get('/', authenticateJWT, userController.getUserData);
router.get('/verify/:token', userController.verifyEmail);

module.exports = router;