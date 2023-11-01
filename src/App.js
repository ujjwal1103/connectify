import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./home/HomePage";
import PageNotFound from "./PageNotFound/PageNotFound";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Layout from "./home/Layout";
import Profile from "./profile/Profile";
import { useAuth } from "./hooks/useAuth";
import UserProfile from "./profile/UserProfile";
import Search from "./search/Search";
import { Messanger } from "./messenger";
import Auth from "./auth/Auth";
import AuthRoutes from "./protectedRoutes/AuthRoutes";

function App() {
  useAuth();
  return (
    <Routes>
      <Route exact path="" element={<AuthRoutes />}>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
      <Route exact path="" element={<ProtectedRoute />}>
        <Route path="/messenger" element={<Messanger />} />
        <Route path="" element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:username" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
