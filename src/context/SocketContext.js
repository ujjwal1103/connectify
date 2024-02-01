// SocketContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState();
  const user  = JSON.parse(localStorage.getItem("user"));

  const newSocket = useMemo(() => io.connect("http://localhost:3200"), []);

  useEffect(() => {
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("socket connection established");
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user);
    }
  }, [socket]);

  const isUserOnline = (userId) => {
    return users && users.some((user) => user._id === userId);
  };

  return (
    <SocketContext.Provider value={{ socket, users, isUserOnline, setUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
