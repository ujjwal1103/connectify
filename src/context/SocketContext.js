// SocketContext.js
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../config/constant";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const newSocket = useMemo (() => io.connect(SOCKET_SERVER_URL), []);

  useEffect(() => {
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("socket connection established");
    });

    return () => newSocket.disconnect();
  }, [newSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user);
    }
  }, [socket, newSocket]);

  const isUserOnline = (userId) => {
    return users && users.some((user) => user._id === userId);
  };

  return (
    <SocketContext.Provider value={{ socket, users, isUserOnline, setUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
