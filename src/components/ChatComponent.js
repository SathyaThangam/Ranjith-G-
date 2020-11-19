import React from "react";
import "../css/ChatComponent.css";
function ChatComponent({ roomID }) {
	return (
		<div className="chat-message-container">
			roomID: {roomID}
			<input type="text" className="sticky-input" />
		</div>
	);
}

export default ChatComponent;
