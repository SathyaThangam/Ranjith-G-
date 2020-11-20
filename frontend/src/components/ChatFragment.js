import React from "react";
import "../css/ChatComponent.css";
function ChatFragment({ message, className }) {
	return (
		<div className={className}>
			<div className="message">{message}</div>
		</div>
	);
}

export default ChatFragment;
