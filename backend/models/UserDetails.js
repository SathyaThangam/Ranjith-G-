import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema({
	email: String,
	password: String,
});

const UserDetails = mongoose.model("userdetails", UserDetailsSchema);

export default UserDetails;
