import { io } from "socket.io-client";

const socket = io(
  "https://crm-backend-2rkm.onrender.com"
);

export default socket;