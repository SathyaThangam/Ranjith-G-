import React, { useState, useEffect } from "react";
import "./css/HomePage.css";
import ChatListComponent from "./components/ChatListComponent";
import ChatComponent from "./components/ChatComponent";
import { socket } from "./sockets";
function HomePage() {
	const [activeRoomID, setActiveRoomID] = useState("");
	const [showChatList, setShowChatList] = useState(false);
	const [name, setName] = useState("");
	const [response, setResponse] = useState([]);
	const [displayName, setDisplayName] = useState(false);
	useEffect(() => {
		if (activeRoomID !== "") {
			setResponse([]);
			console.log(name);
			socket.emit("joinroom", { name, roomID: activeRoomID });
		}
	}, [activeRoomID]);

	useEffect(() => {
		if (localStorage.getItem("name") !== undefined)
			setName(localStorage.getItem("name"));
	}, []);

	useEffect(() => {
		if (displayName) {
			localStorage.setItem("name", name);
		}
	}, [displayName]);

	return (
		<>
			<header className="header">
				{showChatList ? (
					<span
						className="join-header"
						onClick={() => setShowChatList(false)}
					>
						Close
					</span>
				) : (
					<span
						className="join-header"
						onClick={() => setShowChatList(true)}
					>
						Chats
					</span>
				)}
				<span className="header-title">Chit-Chat</span>
			</header>
			<div className="home-container">
				<ChatListComponent
					show={showChatList}
					setShow={setShowChatList}
					setActiveRoomID={setActiveRoomID}
					name={name}
					setName={setName}
					displayName={displayName}
					setDisplayName={setDisplayName}
				/>
				<div className="chat-content">
					{!displayName ? (
						<div
							style={{
								padding: "20px",
								color: "red",
								backgroundColor: "rgb(242, 179, 179)",
							}}
						>
							Please fill your name before chatting
						</div>
					) : (
						""
					)}
					<ChatComponent
						socket={socket}
						roomID={activeRoomID}
						response={response}
						setResponse={setResponse}
						name={name}
					/>
				</div>
			</div>
		</>
	);
}

export default HomePage;
