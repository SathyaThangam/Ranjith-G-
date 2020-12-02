const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
	email: String,
	password: String,
});

const UserDetails = mongoose.model("userdetails", UserDetailsSchema);

module.exports = UserDetails;
