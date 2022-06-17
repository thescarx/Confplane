import socketio from "socket.io-client";
import React, { useState } from "react";
import { notifications } from "./components/Notification/data";
export const socket = new WebSocket(
  "ws://127.0.0.1:8000/ws/socket-server/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MzQ2OTE0LCJpYXQiOjE2NTUzMTA5MTQsImp0aSI6Ijk2YWI2ZGFmNGE4MTQwZDE5N2Y3MDRiYmM4NWNmMzllIiwidXNlcl9pZCI6IjNlNDJiYWJjLWI3YTUtNGZjZC1hNTVlLWM2YjY3NmFiZGI1NiJ9.E-pAlNCh8Soy0QJ0n0qFUlgMIccFNrWPMeU-c2pJk2o"
);
export const SocketContext = React.createContext();
socket.onopen = function (e) {
  console.log(e);
};

