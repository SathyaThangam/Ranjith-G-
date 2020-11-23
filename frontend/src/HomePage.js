import React, { useState, useEffect, useRef, useContext } from "react";
import "./css/HomePage.css";
import ChatListComponent from "./components/ChatListComponent";
import ChatComponent from "./components/ChatComponent";
import { socket } from "./sockets";
import { RoomContext, withRoomContext } from "./context/RoomContext";
import CircularLoaderComponent from "./components/CircularLoaderComponent";
function HomePage() {
	const [showChatList, setShowChatList] = useState(false);
	const [name, setName] = useState("name");
	const [response, setResponse] = useState([]);
	const [displayName, setDisplayName] = useState(false);
	const [loading, setLoading] = useState(false);

	const ref = useRef(null);
	const { activeRoomID } = useContext(RoomContext);

	useEffect(() => {
		if (activeRoomID !== "") {
			setResponse([]);
			console.log(name);
		}
	}, [activeRoomID]);

	useEffect(() => {
		if (
			localStorage.getItem("name") !== undefined ||
			localStorage.getItem("name") !== null
		) {
			setName(localStorage.getItem("name"));
		} else {
			localStorage.setItem("name", "name");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("name", name);
	}, [displayName]);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView();
		}
	}, [response]);

	return (
		<>
			{loading ? <CircularLoaderComponent /> : ""}
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
					name={name}
					setName={setName}
					displayName={displayName}
					setDisplayName={setDisplayName}
					setLoading={setLoading}
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
						response={response}
						setResponse={setResponse}
						name={name}
						setLoading={setLoading}
						loading={loading}
					/>
					<div ref={ref}></div>
				</div>
			</div>
		</>
	);
}

export default withRoomContext(HomePage);
