const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");

const {getTravels,getBusDetails,getOrders} = require("../controllers/data-controllers");

const { authenticateUser } = require("../helpers/helpers");
//middlewares
router.use(express.json());
router.use(cookieparser());

//Endpoint to get buses available for a source
router.get("/gettravels", getTravels);

//get the bus details using id
router.get("/getbusdetails",authenticateUser, getBusDetails);

router.get("/getorders",authenticateUser, getOrders);

module.exports = router;