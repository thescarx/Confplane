import socketio from "socket.io-client";
import React, { useState } from "react";
import { notifications } from "./components/Notification/data";

const token = localStorage.getItem("token");
console.log(token);
export const socket = new WebSocket(
  "ws://127.0.0.1:8000/ws/socket-server/?token=" + token
);
export const SocketContext = React.createContext();
socket.onopen = function (e) {
  // console.log(e);
};
