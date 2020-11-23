import React, { useState, useContext } from "react";
import "../css/ChatListComponent.css";
import { nanoid } from "nanoid";
import InputComponent from "./InputComponent";
import ChatNameFragment from "./ChatNameFragment";
import { socket } from "../sockets";
import { RoomContext } from "../context/RoomContext";
function ChatListComponent({
	show,
	setShow,
	name,
	setName,
	displayName,
	setDisplayName,
	setLoading,
}) {
	const [roomList, setRoomList] = useState([]);
	const [inputRoomID, setInputRoomID] = useState("");
	const { setActiveRoomID } = useContext(RoomContext);
	const createNewRoom = () => {
		if (displayName) {
			const newID = nanoid(6);
			handleRooms(newID);
		}
	};

	const handleInputRoom = () => {
		if (inputRoomID !== "" && displayName) {
			setInputRoomID("");
			handleRooms(inputRoomID);
		}
	};

	const handleRooms = (newRoom) => {
		setActiveRoomID(newRoom);
		setShow(false);
		setRoomList((prev) => {
			if (!prev.includes(newRoom)) return [...prev, newRoom];
			else return prev;
		});
		socket.emit("joinroom", { name, roomID: newRoom });
		setLoading(true);
	};

	return (
		<div className={show ? "chat-list show" : "chat-list"}>
			<div>
				Enter your name
				{displayName ? (
					<div
						style={{
							fontSize: "24px",
							textDecoration: "underline",
							cursor: "pointer",
						}}
						onClick={() => setDisplayName(false)}
					>
						{name}
					</div>
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (name !== "") {
								setDisplayName(true);
							}
						}}
					>
						<InputComponent
							type="text"
							value={name}
							onChange={setName}
						/>
						<button type="submit" className="join-btn">
							Save
						</button>
					</form>
				)}
			</div>
			<div className="title">Join a room</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleInputRoom();
				}}
			>
				<InputComponent
					type="text"
					maxLength={6}
					value={inputRoomID}
					onChange={setInputRoomID}
				/>
			</form>
			<button className="join-btn" onClick={() => handleInputRoom()}>
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
