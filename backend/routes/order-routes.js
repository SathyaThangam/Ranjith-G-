const express = require("express");
const router = express.Router();

const {
	generateOrder,
	capturePayment,
} = require("../controllers/order-controllers.js");

const { authenticationMiddleware } = require("../utils/auth-utils.js");

router.use(authenticationMiddleware);

router.post("/create", generateOrder);

router.post("/capture", capturePayment);

module.exports = router;
