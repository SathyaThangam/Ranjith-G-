require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Razorpay = require("razorpay");
const request = require("request");
const nodeMailer = require("nodemailer");

const connection = require("./DBconnect");

app.use(express.json());

app.use(cors());

app.get("/home", (req, res) => {
	// console.log(req);
	res.json(users.filter((users) => users.name === req.user.name));
});

app.post("/signup", (req, res) => {
	const username = req.body.email;
	const pwd = req.body.password;

	const idgenerated = connection.uid({ prefix: "IND" });
	const db = connection.dbconnection;
	const saltRounds = 10;

	bcrypt.hash(pwd, saltRounds, function (err, hash) {
		if (err) throw err;
		console.log(hash);
		console.log(pwd);
		console.log(idgenerated);

		db.query(
			"INSERT INTO users (idusers,username,password) VALUES (?, ?, ?)",
			[idgenerated, username, hash],
			function (err, results, fields) {
				if (err) throw err;

				res.json({ success: true });
			}
		);
		// res.json({success:true});
	});
});

app.post("/login", (req, res) => {
	//Authenticate user

	const username = req.body.name;
	const pwd = req.body.password;
	const user = { name: username, password: pwd, success: true };

	const db = connection.dbconnection;

	db.query(
		"SELECT password from users where username = ?",
		[username],
		function (err, results, fields) {
			if (err) throw err;

			if (results.length === 0) {
				//throw error
			} else {
				dbpassword = results[0].password.toString();
				bcrypt.compare(pwd, dbpassword).then(function (result) {
					if (result) {
						res.json({ success: true });
					} else {
						console.log(pwd);
					}
				});
			}
		}
	);

	// const accessToken = generateAccessToken(user);
	// const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	// console.log("accessToken "+accessToken);
	// const response = {accesstoken:accessToken};
	// console.log(response);
	// res.json(response);
});

//RAZORPAY

const instance = new Razorpay({
	key_id: process.env.RAZORPAY_API_KEY,
	key_secret: process.env.RAZORPAY_API_SECRET,
});

app.post("/order", (req, res) => {
	const amount = req.body.showPrice;
	try {
		const options = {
			amount: amount * 100, // amount  == Rs 10
			currency: "INR",
			receipt: "receipt#1",
			payment_capture: 0,
			// 1 for automatic capture // 0 for manual capture
		};
		instance.orders.create(options, async function (err, order) {
			if (err) {
				return res.status(500).json({
					message: "Something Went Wrong",
				});
			}
			return res.status(200).json(order);
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something Went Wrong",
		});
	}
});

app.post("/capture/:paymentId", (req, res) => {
	const url = `https://${process.env.RAZORPAY_API_KEY}:${process.env.RAZORPAY_API_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`;
	try {
		return request(
			{
				method: "POST",
				url: url,
				form: {
					amount: req.body.showPrice * 100, // amount == Rs 10 // Same As Order amount
					currency: "INR",
				},
			},
			function (err, response, body) {
				if (err) {
					return res.status(500).json({
						message: "Something Went Wrong in capture",
					});
				}
				// console.log("Status:", response.statusCode);
				// console.log("Headers:", JSON.stringify(response.headers));
				const captureData = JSON.parse(body);
				sendEmail(captureData,req.body);
				return res.status(200).json(body);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Something Went Wrong out capture",
		});
	}
});

// app.post("/send-email", function (req, res) {
// 	const { headers } = req;
// 	const authToken = headers["auth-token"];
// 	const token = process.env.MAIL_ACCESS_TOKEN;
// 	const text = `<h1>Verification Sucessful</h1> payment id:${req.body.paymentId}`;
// 	console.log(authToken === token);
// 	if (true) {
// 		let transporter = nodeMailer.createTransport({
// 			host: "smtp.gmail.com",
// 			port: 465,
// 			secure: true,
// 			auth: {
// 				user: process.env.SENDER_EMAIL,
// 				pass: process.env.SENDER_PASSWORD,
// 			},
// 		});
// 		let mailOptions = {
// 			to: req.body.email,
// 			subject: req.body.subject,
// 			html: text,
// 		};
// 		transporter.sendMail(mailOptions, (error, info) => {
// 			if (error) {
// 				return console.log(error);
// 			}
// 			console.log("Message %s sent: %s", info.messageId, info.response);
// 		});
// 		res.end();
// 	} else {
// 		res.status(404).end();
// 	}
// });

function sendEmail(captureData,showData) {
	const text = `<h1>Payment Successful</h1> <strong>Show:</strong>${
		showData.showName
	} <br/><br/> <strong>Price:</strong>${
		captureData.amount / 100
	} ${captureData.currency}<br/><br/> <strong>Order id:</strong>${captureData.order_id}`;
	// console.log(captureData);
	// console.log(showData);
	// console.log(text);
	let transporter = nodeMailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.SENDER_EMAIL,
			pass: process.env.SENDER_PASSWORD,
		},
	});
	let mailOptions = {
		to: captureData.email,
		subject: `TicketInsider: Payment Successful`,
		html: text,
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		// console.log("Message %s sent: %s", info.messageId, info.response);
	});
}

app.post("/send-sms", function (req, res) {
	const accountSid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
	const authToken = "your_auth_token";
	const client = require("twilio")(accountSid, authToken);

	client.messages
		.create({
			body: req.body.message,
			from: "+15017122661", //approved phone number
			to: req.body.clientNumber,
		})
		.then((message) => console.log(message.sid));
});

app.post("/token", function (req, res) {
	const { headers } = req;
	const authToken = headers["auth-token"];
	console.log(authToken);
	console.log(authToken === process.env.MAIL_ACCESS_TOKEN);
	res.send({ message: "success" }).end();
});

app.listen(8000, function () {
	console.log("Server is running");
});

app.get('/test',(req,res) => {
	sendEmail({ name: "hl" }, { showName: "The Boys", showPrice: 99 });
})