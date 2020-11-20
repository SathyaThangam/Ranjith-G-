const express = require("express");
const app = express();
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

		socket.on("disconnect", () => {
			io.emit(
				"info",
				formatMessage(name, roomID, `${name} has left the chat`)
			);
		});
	});
	//Listen for chats
	socket.on("chatMsg", (data) => {
		console.log(data);
		socket.broadcast
			.to(data.roomID)
			.emit(
				"message",
				formatMessage(data.name, data.roomID, data.message)
			);
	});
});
const path = require("path");
const publicPath = path.join(__dirname, "../frontend/build");
app.use(express.static(publicPath));
app.get("/*", (req, res) => res.sendFile(path.join(publicPath, "index.html")));

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
