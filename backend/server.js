const app = require("express")();
const server = require("http").createServer(app);

const PORT = 8080 || process.env.PORT;

const socketio = require("socket.io");
const io = socketio(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

const formatMessage = (name, roomID, message) => {
	return {
		name,
		roomID,
		message,
	};
};

io.on("connection", (socket) => {
	console.log("New Connection");

	socket.on("joinroom", ({ name, roomID }) => {
		socket.join(roomID);

		//Welcome current user
		socket.emit(
			"info",
			formatMessage(name, roomID, `You have joined the room ${roomID}`)
		);

		//broadcast a new connection
		socket.broadcast
			.to(roomID)
			.emit(
				"info",
				formatMessage(name, roomID, `${name} has joined the room`)
			);

		//Listen for chats
		socket.on("chatMsg", (data) => {
			socket.broadcast
				.to(data.roomID)
				.emit(
					"message",
					formatMessage(data.name, data.roomID, data.message)
				);
		});

		socket.on("disconnect", () => {
			io.emit(
				"info",
				formatMessage(name, roomID, `${name} has left the chat`)
			);
		});
	});
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
