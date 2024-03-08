import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
// import { FooterThree } from "../common/Footer";
import { useSocket } from "../context/SocketContext";
import { toast } from "react-toastify";
import Logo from "../icons/Logo";
import ConnectifyLogoText from "../icons/ConnectifyLogoText";

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
  }, [socket,setUsers]);

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
      <header className="w-full lg:hidden md:hidden z-50 p-2 h-fit bg-black  ">
        <div className="flex justify-center items-center">
          <ConnectifyLogoText className="fill-white llg:hidden" size={"40%"} />
        </div>
      </header>
      <Navbar />
      <Outlet />
      {/* <FooterThree /> */}
    </>
  );
};

export default Layout;
