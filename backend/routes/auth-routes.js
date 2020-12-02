const express = require("express");
const router = express.Router();

const {
	signUpController,
	loginController,
} = require("../controllers/auth-controllers.js");

router.post("/signup", signUpController);

router.post("/login", loginController);

module.exports = router;
