const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");

const {getTravels,getBusDetails,getOrders} = require("../controllers/data-controllers");
//middlewares
router.use(express.json());
router.use(cookieparser());

//Endpoint to get buses available for a source
router.post("/gettravels", getTravels);

//get the bus details using id
router.post("/getbusdetails", getBusDetails);

router.post("/getorders", getOrders);

module.exports = router;