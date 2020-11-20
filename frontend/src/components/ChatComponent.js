import React, { useState, useEffect } from "react";
import "../css/ChatComponent.css";
import ChatFragment from "./ChatFragment";
import { nanoid } from "nanoid";
function ChatComponent({ roomID, socket, response, setResponse, name }) {
	const [userMsg, setUserMsg] = useState("");
	useEffect(() => {
		socket.on("message", (data) => {
			console.log(data);
			if (roomID === data.roomID) {
				setResponse((prev) => {
					return [
						...prev,
						<ChatFragment
							key={nanoid(10)}
							message={data.message}
						/>,
					];
				});
			}
		});

		socket.on("info", (data) => {
			if (roomID === data.roomID) {
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
		});
	}, [roomID]);

	return (
		<div className="chat-message-container">
			<div className="chat-history-title">roomID: {roomID}</div>
			<div className="chat-history">{response}</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					//emit to server
					if (userMsg !== "") {
						socket.emit("chatMsg", {
							name: name,
							roomID: roomID,
							message: userMsg,
						});
						setResponse((prev) => {
							if (roomID === "") return prev;
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
				}}
			>
				<input
					type="text"
					className="sticky-input"
					value={userMsg}
					onChange={(e) => setUserMsg(e.target.value)}
				/>
			</form>
		</div>
	);
}

export default ChatComponent;
