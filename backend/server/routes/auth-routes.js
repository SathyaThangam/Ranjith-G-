const express = require("express");
const router = express.Router();

const cookieparser = require("cookie-parser");
require("dotenv").config();

const { authenticateUser } = require("../helpers/helpers");

const {userLogin,userSignup,userLogOut} = require("../controllers/auth-controllers")

//middlewares
router.use(express.json());
router.use(cookieparser());

//Signup Endopint
router.post("/signup", userSignup);

//Login Endpoint
router.post("/login", userLogin);

//Logout Endpoint
router.post("/logout", authenticateUser, userLogOut);

module.exports = router;