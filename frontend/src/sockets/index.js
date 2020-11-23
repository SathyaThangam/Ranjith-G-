import socketIOClient from "socket.io-client";

const ENDPOINT =
	process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";
// const ENDPOINT = "";
const socket = socketIOClient(ENDPOINT);

export { socket };
