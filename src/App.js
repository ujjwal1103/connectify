import { Route, Routes } from "react-router-dom";
import "./App.css";
import {Login, Register} from "./module/Auth";
import HomePage from "./home/HomePage";
import PageNotFound from "./PageNotFound/PageNotFound";
import UnAuthorized from "./PageNotFound/UnAuthorized.js";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Layout from "./home/Layout";
import Profile from "./profile/Profile";
import UserProfile from "./profile/UserProfile";
import Search from "./search/Search";
import { Messenger } from "./messenger";
import AuthRoutes from "./protectedRoutes/AuthRoutes";
import ChatWindow from "./messenger/component/ChatWindow.js";
import Post from "./module/post/Post.jsx";
import Exp from "./exp/Exp.jsx";

const App = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<AuthRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="p/:postId" element={<Post />} />
          <Route path="profile" element={<Profile />} />
          <Route path=":username" element={<UserProfile />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="messenger" element={<Messenger />}>
          <Route path=":chatId" element={<ChatWindow />} />
        </Route>
      </Route>
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="exp" element={<Exp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
