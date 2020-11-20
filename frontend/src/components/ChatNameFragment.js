import React from "react";
import "../css/ChatListComponent.css";
function ChatNameFragment({ name, onClick }) {
	return (
		<div className="chat-name-container" onClick={onClick}>
			{name}
		</div>
	);
}

export default ChatNameFragment;
