// Generate unique id
function randomStr(strLength) {
	const chars = [
		..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	];
	return [...Array(strLength)]
		.map(() => chars[Math.trunc(Math.random() * chars.length)])
		.join("");
}

function uid(options = {}) {
	const now = String(Date.now());
	const middlePos = Math.ceil(now.length / 2);
	let output = `${now.substr(0, middlePos)}-${randomStr(6)}-${now.substr(
		middlePos
	)}`;
	// We add a 3 letter CODE in front of the id to make it more recognizable
	if (options.prefix) output = `${options.prefix}-${output}`;
	return output;
}

//JWT helper functions
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

authenticateUser = (req, res, next) => {
	jwt.verify(
		req.cookies.token,
		process.env.ACCESS_TOKEN_SECRET,
		(err, data) => {
			if (err) return res.sendStatus(403);
			else {
				if (req.body.sessionID === data.sessionID) next();
				else res.sendStatus(403);
			}
		}
	);
};

generateAccessToken = (data) => {
	const sessionID = uuidv4();
	data.sessionID = sessionID;
	return {
		accessToken: jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "60m",
		}),
		sessionID: sessionID,
	};
};

exports.uid = uid;
exports.authenticateUser = authenticateUser;
exports.generateAccessToken = generateAccessToken;
