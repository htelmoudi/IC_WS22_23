const express = require("express");
const router = express.Router();
const db = require("../database/db");
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.get_users);

router.get("/vendors", userController.get_vendors);

router.put("/:userId", userController.update_user);

module.exports = router;
