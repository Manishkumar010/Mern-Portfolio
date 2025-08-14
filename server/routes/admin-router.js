const express = require("express");
const adminControllers = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

router.route("/users").get(authMiddleware,adminMiddleware,adminControllers.getAllUsers); 
router.route("/users/:id").get(authMiddleware,adminMiddleware,adminControllers.getAllUserById); 
router.route("/contacts").get(authMiddleware,adminMiddleware,adminControllers.getAllContacts); 
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminControllers.updateUserById)
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminControllers.deleteUserById)
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,adminControllers.deleteContactsById)

module.exports = router; 