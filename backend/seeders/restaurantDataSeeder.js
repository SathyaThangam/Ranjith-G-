const Restaurant = require("../models/Restaurant");
const mockData = require("./mockDataClean.json");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(`${process.env.DATABASE_URL}zomatoClone`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mockData.forEach((data) => {
	Restaurant.insertMany(data["restaurant"])
		.then((data) => console.log(data))
		.catch((err) => console.error(err));
});
