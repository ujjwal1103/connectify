import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../config/api.config";
import { login } from "../redux/services/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const Auth = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usernamePopup, setUsernamePopup] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { login: loginUser } = useAuth();

  const userSignIn = async (username, password) => {
    setLoading(true);
    try {
      const res = await makeRequest.post("/login", {
        username,
        password,
      });
      res && localStorage.setItem("user", JSON.stringify(res.data));
      loginUser(res?.data?.user);
      dispatch(login({ isAuthenticated: true, user: res?.data?.user }));
      navigator("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const userSignUp = async () => {
    try {
      const res = await makeRequest.post("/register", {
        username,
        password: user.id,
        email: user.email,
      });
      setLoading(false);
      console.log(res);

      res && localStorage.setItem("user", JSON.stringify(res.data));

      dispatch(login({ isAuthenticated: true, user: res?.data?.user }));
      navigator("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const authenticate = async () => {
    try {
      const res = await makeRequest(`/authenticate${location.search}`);

      if (res.data.isSuccess) {
        if (res.data?.existingUser) {
          userSignIn(res.data.existingUser.username, res.data.user.id);
        } else {
          setUser(res.data.user);
          setLoading(false);
          setUsernamePopup(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticate();
  }, [location.search]);

  if (loading) {
    return (
      <div className="bg-hero-pattern w-screen bg-opacity-60 h-screen bg-no-repeat bg-cover flex justify-center items-center">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-hero-pattern w-screen h-screen bg-no-repeat bg-cover flex justify-center items-center">
      {usernamePopup && (
        <div className="flex flex-col gap-4">
          <label className="text-gray-50">
            Enter new username to continue{" "}
          </label>
          <input
            type="text"
            placeholder="enter yourname"
            value={username}
            className="rounded-md"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={userSignUp}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
