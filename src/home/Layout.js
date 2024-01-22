import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import { FooterThree } from "../common/Footer";
import { useSocket } from "../context/SocketContext";
import { toast } from "react-toastify";

const Layout = () => {
  const { socket, setUsers } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("userJoined", (data) => {
        toast(data?.username + "Came Online");
      });
    }
  }, [socket]);
  useEffect(() => {
    if (socket) {
      socket.on("allusers", (data) => {
        setUsers(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("Receive", (data) => {
        console.log(data);
        toast(data);
      });
    }
  }, [socket]);

  return (
    <>
      <Navbar />
      <Outlet />
      <FooterThree />
    </>
  );
};

export default Layout;
