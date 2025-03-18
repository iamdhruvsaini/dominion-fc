// utils/socket.js
import { io } from "socket.io-client";
import getBaseURL from "./baseURL";


let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    const baseURL = getBaseURL();

    socket = io(baseURL, { 
      autoConnect: true,
      withCredentials: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
      transports: ['websocket', 'polling']
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      // Attempt to reconnect if disconnected due to network issues
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    // Add heartbeat to keep connection alive
    setInterval(() => {
      if (socket.connected) {
        socket.emit("heartbeat");
      }
    }, 30000);
  }
  
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

// Helper function to reset socket connection (useful for authentication changes)
export const resetSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};