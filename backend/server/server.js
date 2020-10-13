const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieparser = require("cookie-parser");

const orderRoutes = require("./routes/order-routes");
const authRoutes = require("./routes/auth-routes");
const dataRoutes = require("./routes/data-routes");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieparser());

//Authentication Routes
app.use("/user", authRoutes);

//data routes
app.use("/data", dataRoutes);

//Payment Route
// app.use("/payment", authenticateUser, paymentRoutes);
app.use("/payment", orderRoutes);

// To serve react file in the same port
const path = require("path");
const publicPath = path.join(__dirname, "../../frontend/build");
app.use(express.static(publicPath));
console.log();
app.get("/*", function (req, res) {
	res.sendFile(path.join(publicPath, "index.html"));
});

//Endpoint to check if connection has established

app.get("/ping", (req, res) => res.send("pong"));

app.listen(process.env.PORT || 8080, () => console.log("Server is running"));
