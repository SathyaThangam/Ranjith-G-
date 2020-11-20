import React from "react";
import "../css/ChatComponent.css";
function ChatComponent({ roomID }) {
	return (
		<div className="chat-message-container">
			roomID: {roomID}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(e);
				}}
			>
				<input type="text" className="sticky-input" />
			</form>
		</div>
	);
}

export default ChatComponent;
