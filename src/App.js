import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./home/HomePage";
import PageNotFound from "./PageNotFound/PageNotFound";
import UnAuthorized from "./PageNotFound/UnAuthorized.js";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Layout from "./home/Layout";
import Profile from "./profile/Profile";
import UserProfile from "./profile/UserProfile";
import Search from "./search/Search";
import { Messenger } from "./messenger";
import Auth from "./auth/Auth";
import AuthRoutes from "./protectedRoutes/AuthRoutes";
import ChatWindow from "./messenger/component/ChatWindow.js";

const App = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<AuthRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="messenger" element={<Messenger />}>
          <Route path=":chatId" element={<ChatWindow />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path=":username" element={<UserProfile />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
    </Routes>
  );
};

export default App;
