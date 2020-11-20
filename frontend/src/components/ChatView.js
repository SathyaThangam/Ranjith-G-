import React from "react";
import "../css/ChatComponent.css";

function ChatView({ response, handleSubmit, userMsg, setUserMsg, roomID }) {
	return (
		<div className="chat-message-container">
			<div className="chat-history-title">roomID: {roomID}</div>
			<div className="chat-history">{response}</div>
			<form onSubmit={(e) => handleSubmit(e)}>
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

export default ChatView;
