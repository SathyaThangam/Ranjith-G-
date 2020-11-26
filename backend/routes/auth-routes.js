import express from "express";
import db from "../utils/database-utils.js";
const router = express.Router();

import {
	signUpController,
	loginController,
	logOutController,
} from "../controllers/auth-controllers.js";

router.post("/signup", signUpController);

router.post("login", loginController);

router.post("logout", logOutController);

export default router;
