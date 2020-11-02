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
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieparser());

//Authentication Routes
app.use("/user", authRoutes);

//data routes
app.use("/data", dataRoutes);

//Payment Route
// app.use("/payment", authenticateUser, paymentRoutes);
app.use("/payment", orderRoutes);

// To serve react file in the same port
// const path = require("path");
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//Endpoint to check if connection has established

app.get("/ping", (req, res) => res.send("pong"));

app.listen(process.env.PORT || 8080, () => console.log("Server is running"));
