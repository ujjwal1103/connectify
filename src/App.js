import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ConnectifyIcon from "./icons/Connectify.js";
import { motion } from "framer-motion";
import useHealthCheck from "./utils/hooks/useHealthCheck.js";

const Login = lazy(() => import("./module/Auth/Login"));
const Register = lazy(() => import("./module/Auth/Register"));
const Auth = lazy(() => import("./module/Auth/Auth"));
const HomePage = lazy(() => import("./home/HomePage"));
const PageNotFound = lazy(() => import("./PageNotFound/PageNotFound"));
const UnAuthorized = lazy(() => import("./PageNotFound/UnAuthorized.js"));
const ProtectedRoute = lazy(() => import("./protectedRoutes/ProtectedRoute"));
const AuthRoutes = lazy(() => import("./protectedRoutes/AuthRoutes"));
const Layout = lazy(() => import("./home/Layout"));
const Profile = lazy(() => import("./profile/Profile"));
const UserProfile = lazy(() => import("./profile/UserProfile"));
const Search = lazy(() => import("./search/Search"));
const Messenger = lazy(() => import("./messenger/Messenger.js"));
const ChatWindow = lazy(() => import("./messenger/component/ChatWindow.js"));
const Post = lazy(() => import("./module/post/Post.jsx"));
const Exp = lazy(() => import("./exp/Exp.jsx"));
const Peoples = lazy(() => import("./module/People/index.js"));

const App = () => {
  const { loading, error } = useHealthCheck();

  if (loading) {
    return <PageLoader />;
  }
  if (error) {
    return <div>Something went Wrong</div>;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<AuthRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="auth" element={<Auth />} />
        </Route>

        {/* Protected Routes */}
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="p/:postId" element={<Post />} />
            <Route path="profile" element={<Profile />} />
            <Route path=":username" element={<UserProfile />} />
            <Route path="search" element={<Search />} />
            <Route path="expore/people" element={<Peoples />} />
          </Route>
          <Route path="messenger" element={<Messenger />}>
            <Route path=":chatId" element={<ChatWindow />} />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="exp" element={<Exp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;

function PageLoader({}) {
  return (
    <div className="w-screen h-dvh bg-zinc-800 flex justify-center items-center">
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className=""
      >
        <ConnectifyIcon size={156} />
      </motion.span>
    </div>
  );
}
