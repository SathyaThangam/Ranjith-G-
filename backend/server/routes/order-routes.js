const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");

const {
	generateOrder,
	capturePayment,
} = require("../controllers/order-controllers");

const { authenticateUser } = require("../helpers/helpers");
//middlewares
router.use(express.json());
router.use(cookieparser());

//Endpoint to create an order object for the transaction
router.post("/order",authenticateUser, generateOrder);

//Capture the payment
router.post("/capture/:paymentId",authenticateUser, capturePayment);

module.exports = router;
