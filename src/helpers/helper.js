//validation
exports.validateEmail = (value) => {
	const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(value);
};

exports.validatePassword = (value) => {
	let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	return re.test(value);
};

exports.validateConfirmPassword = (value) => {
	let pwd = this.state.signupPwd;
	let valid = "";
	if (value === "") valid = false;
	else valid = pwd === value;

	return valid;
};

//Format error message while Login/Signup
exports.formatErrorMessage = (prevMessage, newMessage) => {
	if (prevMessage !== "") return prevMessage + " / " + newMessage;
	else return newMessage;
};
