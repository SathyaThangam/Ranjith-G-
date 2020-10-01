const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");

const {
	generateOrder,
	capturePayment,
} = require("../controllers/order-controllers");
//middlewares
router.use(express.json());
router.use(cookieparser());

//Endpoint to create an order object for the transaction
router.post("/order", generateOrder);

//Capture the payment
router.post("/capture/:paymentId", capturePayment);

module.exports = router;
