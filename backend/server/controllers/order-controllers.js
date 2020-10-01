const {
	generateRazorpayOrder,
	capturePaymentRazorpay,
} = require("../services/razorpay-services");
const {
	createNewOrder,
	getRouteIDByLocation,
	updatePaymentStatusByPaymentID,
} = require("../helpers/DB-helper");
//Generate order object
exports.generateOrder = async (req, res) => {
	// console.log(req.body.bookingDetails.routeData);
	const { routeData, ticketData } = req.body.bookingDetails;
	const amount = req.body.totalprice;
	if (amount === undefined || amount === null) {
		return res.sendStatus(403);
	}
	try {
		const route_id = await getRouteIDByLocation(
			routeData.source,
			routeData.destination
		);
        const order = await generateRazorpayOrder(amount);
		const newOrder = {
			user_id: req.user_id,
			route_id: route_id,
			payment_id: order.id,
			payment_status: false,
			passenger_details: ticketData,
        };
		const orderInstance = createNewOrder(newOrder);
		if (orderInstance !== null || orderInstance !== undefined) {
			res.json({ id: order.id, receipt: order.receipt });
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

//Capture Payment
exports.capturePayment = (req, res) => {
	console.log("request", req.body);
	capturePaymentRazorpay(req.body.totalprice, req.params.paymentId)
		.then((response) => {
			const data = response.data;
			const { status, order_id } = data;
			console.log(response.data);
			updatePaymentStatusByPaymentID(order_id, true);
			res.status(200).json({ status: status, order_id: order_id });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				message: "Something Went Wrong out capture",
			});
		});
};
