import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { toast } from "react-toastify";
import ConnectifyLogoText from "../icons/ConnectifyLogoText";
import { getCurrentUserId } from "../utils/getCurrentUserId";

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
        console.log(data)
        setUsers(data.filter((u) => u.userId !== getCurrentUserId()));
      });
    }
  }, [socket, setUsers]);

  useEffect(() => {
    if (socket) {
      socket.on("Receive", (data) => {
        console.log("liked post", Date.now());
        toast(data);
      });
    }
  }, [socket]);

  return (
    <>
      <header className="w-full lg:hidden md:hidden z-50 p-2 h-fit bg-black  ">
        <div className="flex justify-center items-center sticky top-10">
          <ConnectifyLogoText className="fill-white lg:hidden" w="200" h="20" />
        </div>
      </header>
      <Navbar />
      <Outlet />
      {/* <FooterThree /> */}
    </>
  );
};

export default Layout;
