import React, { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import "./App.css";
import ConnectifyIcon from "./icons/Connectify.js";
import { motion } from "framer-motion";
import useHealthCheck from "./utils/hooks/useHealthCheck.js";
import ImageCropper from "./exp/ImageCropper.js";

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
const Comments = lazy(() => import("./module/post/Comments.jsx"));
const Exp = lazy(() => import("./exp/Exp.jsx"));
const Peoples = lazy(() => import("./module/People/index.js"));
const Setting = lazy(() => import("./module/settings/Setting.jsx"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // console.error("Error caught by boundary:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };

const App = () => {
  const { loading, error } = useHealthCheck();

  if (loading) {
    return <PageLoader />;
  }
  if (error) {
    return <ErrorPage />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />} errorElement={<ErrorPage />}>
        <Route path="/" element={<AuthRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="auth" element={<Auth />} />
        </Route>

        <Route path="" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="p/:postId" element={<Post />} />
            <Route path="comments/:postId" element={<Comments />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:username" element={<UserProfile />} />
            <Route path="search" element={<Search />} />
            <Route path="expore/people" element={<Peoples />} />
            <Route path="setting" element={<Setting />} />
          </Route>

          <Route path="messenger" element={<Messenger />}>
            <Route path=":chatId" element={<ChatWindow />} />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="exp" element={<Exp />} />
        <Route path="exp2" element={<ImageCropper />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} fallbackElement={<PageLoader />} />
    </Suspense>
  );
};

export default App;

export const PageLoader = ({}) => {
  return (
    <div className="w-screen h-dvh bg-zinc-800 flex-center">
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
};

export const ErrorPage = ({}) => {
  const errors = useRouteError();
  return (
    <div className="min-h-screen bg-gradient-to-br to-[#620C45]  from-[#ff0000] flex-center">
      <div className="max-w-md px-8 py-12 bg-white shadow-lg rounded-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-800 mb-8">
          It seems something went wrong...
        </p>
        <p className="text-gray-600 mb-4">
          Don't worry, our team has been notified and we're working on fixing
          it. Please try again later.
        </p>
        <p className="text-gray-600 mb-4">{errors?.message}</p>
      </div>
    </div>
  );
};
