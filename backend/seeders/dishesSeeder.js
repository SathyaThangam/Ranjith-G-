const Restaurant = require("../models/Restaurant");
const dishes = require("./dishes.json");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(`${process.env.DATABASE_URL}zomatoClone`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let start = 0;
const getDishes = () => {
	const dish = dishes.slice(start, start + 16);
	if (start >= 256) start = 0;
	else start += 16;
	console.log(start);
	return dish;
};
// const dish = dishes.slice(0, 20);
const s = [];
Restaurant.updateMany({ currency: "Rs." }, { dishes: getDishes() }, (e, r) => {
	if (e) {
		console.log(e);
	}
	s.push(r);
});

console.log(s);
