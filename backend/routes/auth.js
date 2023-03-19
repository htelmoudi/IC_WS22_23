const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register_user);

router.post("/login", authController.login_user);

router.delete("/:userId", authController.remove_user);


module.exports = router;
