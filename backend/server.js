const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
dotenv.config();

const authRoutes = require("./routes/auth-routes.js");
const dataRoutes = require("./routes/data-routes.js");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

const PORT = process.env.PORT || 8080;

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		credentials: true,
// 	})
// );
const DB_URI =
	process.env.NODE_ENV === "development"
		? `${process.env.DATABASE_URL}zomatoClone`
		: `${process.env.DATABASE_URL}`;
mongoose.connect(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("connection established");
});

app.use("/auth", authRoutes);

app.use("/data", dataRoutes);

//Endpoint to check if connection has established
app.get("/ping", (req, res) => res.send("pong"));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
