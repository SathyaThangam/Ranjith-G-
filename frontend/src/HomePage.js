import React, { useState } from "react";
import "./css/HomePage.css";
import ChatListComponent from "./components/ChatListComponent";
import ChatComponent from "./components/ChatComponent";
function HomePage() {
	const [activeRoomID, setActiveRoomID] = useState("");
	const [showChatList, setShowChatList] = useState(false);
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
				/>
				<div className="chat-content">
					<ChatComponent roomID={activeRoomID} />
				</div>
			</div>
		</>
	);
}

export default HomePage;
