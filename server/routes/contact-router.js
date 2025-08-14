const express = require('express');
// Importing the auth controller
const router = express.Router();
const {contactForm} = require('../controllers/contact-controller');

router.route("/contact").post(contactForm);

module.exports = router;