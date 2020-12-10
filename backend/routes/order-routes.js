const express = require("express");
const router = express.Router();

const {
	generateOrder,
	verifyAndCapturePayment,
	cancelOrder,
	getOrdersByUser,
} = require("../controllers/order-controllers.js");

const { authenticationMiddleware } = require("../utils/auth-utils.js");

router.use(authenticationMiddleware);

router.post("/create", generateOrder);

router.post("/capture", verifyAndCapturePayment);

router.get("/getAll", getOrdersByUser);

router.post("/cancel", cancelOrder);

module.exports = router;
