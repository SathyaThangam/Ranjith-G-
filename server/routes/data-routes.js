const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");

const {getTravels,getBusDetails} = require("../controllers/data-controllers");
//middlewares
router.use(express.json());
router.use(cookieparser());

//Endpoint to get buses available for a source
router.post("/gettravels", getTravels);

//get the bus details using id
router.post("/getbusdetails", getBusDetails);


module.exports = router;