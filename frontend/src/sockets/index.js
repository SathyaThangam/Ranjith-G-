import socketIOClient from "socket.io-client";

const ENDPOINT = "";
const socket = socketIOClient(ENDPOINT);

export { socket };
