const express = require('express');
// Importing the auth controller
const authcontrollers = require('../controllers/auth-controller')
const {signupSchema,loginSchema} = require('../Validators/auth-validator');
const validate= require('../middlewares/Validate-middleware');
const authMiddleware = require('../middlewares/authMiddleware');
 
const router = express.Router();

// Importing the auth controller
router.route('/').get(authcontrollers.home);

router.route('/register').post(validate(signupSchema),authcontrollers.register);
router.route('/login').post(validate(loginSchema),authcontrollers.login);
router.route("/user").get(authMiddleware ,authcontrollers.user);
 
module.exports = router; 