import React, { useState, useEffect, useContext, useMemo } from "react";
import "../css/ChatComponent.css";
import ChatFragment from "./ChatFragment";
import { nanoid } from "nanoid";
import { socket } from "../sockets";
import ChatView from "./ChatView";
import { RoomContext } from "../context/RoomContext";
function ChatComponent({ response, setResponse, name }) {
	const [userMsg, setUserMsg] = useState("");

	const { activeRoomID } = useContext(RoomContext);

	const [flag, setFlag] = useState(true);

	const messageHandler = (data) => {
		console.table({ data: data.roomID, client: activeRoomID });
		if (activeRoomID === data.roomID) {
			setResponse((prev) => {
				return [
					...prev,
					<ChatFragment key={nanoid(10)} message={data.message} />,
				];
			});
		}
	};

	const infoHandler = (data) => {
		if (activeRoomID === data.roomID) {
			setResponse((prev) => {
				return [
					...prev,
					<ChatFragment
						key={nanoid(10)}
						className="info"
						message={data.message}
					/>,
				];
			});
		}
	};

	useEffect(() => {
		socket.on("message", messageHandler);

		socket.on("info", infoHandler);
		return () => {
			socket.off("message", messageHandler);
			socket.off("info", infoHandler);
		};
	}, [messageHandler, infoHandler]);

	const handleSubmit = (e) => {
		e.preventDefault();
		//emit to server
		console.log("chatMsg emitted", activeRoomID);
		if (userMsg !== "") {
			socket.emit("chatMsg", {
				name: name,
				roomID: activeRoomID,
				message: userMsg,
			});
			setResponse((prev) => {
				if (activeRoomID === "") return prev;
				return [
					...prev,
					<ChatFragment
						className="right"
						key={nanoid(10)}
						message={userMsg}
					/>,
				];
			});
			setUserMsg("");
		}
	};
	return (
		<ChatView
			response={response}
			handleSubmit={handleSubmit}
			userMsg={userMsg}
			setUserMsg={setUserMsg}
			roomID={activeRoomID}
		/>
	);
}

export default ChatComponent;
