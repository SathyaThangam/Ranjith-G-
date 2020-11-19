import React, { useState } from "react";
import "../css/ChatListComponent.css";
import { nanoid } from "nanoid";
import InputComponent from "./InputComponent";
import ChatNameFragment from "./ChatNameFragment";
function ChatListComponent({ setActiveRoomID, show, setShow }) {
	const [roomList, setRoomList] = useState([]);

	const [inputRoomID, setInputRoomID] = useState("");

	const createNewRoom = () => {
		const newID = nanoid(6);
		setActiveRoomID(newID);
		setShow(false);
		setRoomList((prev) => {
			return [...prev, newID];
		});
	};

	return (
		<div className={show ? "chat-list show" : "chat-list"}>
			<div className="title">Join a room</div>
			<InputComponent
				type="text"
				maxLength={6}
				value={inputRoomID}
				onChange={setInputRoomID}
			/>
			<button
				className="join-btn"
				onClick={() => {
					setActiveRoomID(inputRoomID);
					setShow(false);
					setRoomList((prev) => {
						return [...prev, inputRoomID];
					});
				}}
			>
				Join
			</button>
			<div>or</div>
			<button className="join-btn" onClick={() => createNewRoom()}>
				Create a room
			</button>
			<div
				style={{
					width: "100%",
					paddingTop: "10px",
					borderTop: "1px solid #ccc",
					marginTop: "10px",
				}}
			>
				{roomList.map((room) => {
					return (
						<ChatNameFragment
							key={room}
							name={room}
							onClick={() => {
								setActiveRoomID(room);
								setShow(false);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default ChatListComponent;
