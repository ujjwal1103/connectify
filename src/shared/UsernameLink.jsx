import React from "react";
import { Link } from "react-router-dom";

const UsernameLink = ({ username, className = "" }) => {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const path = username === user?.username ? "/profile" : `/${username}`;
  return (
    <Link to={path} className={className}>
      <span>{username}</span>
    </Link>
  );
};

export default UsernameLink;
