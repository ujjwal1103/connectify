import { useState, useRef, useEffect } from "react";
import Input from "../common/InputFields/Input";
import {
  ArrowRight,
  EyeFill,
  LockFill,
  PersonFill,
  OutlineLoading,
  Google,
  FillEyeSlashFill,
} from "../icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import ErrorPopup from "../common/errorPopup";
import { useDispatch } from "react-redux";
import { login } from "../redux/services/authSlice";
import { makeRequest } from "../config/api.config";
import getGoogleUrl from "../config/getGoogleUri";
import { FaLaptopHouse } from "react-icons/fa";

const Login = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  const userSignIn = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.post("/login", {
        username,
        password,
      });
      res && localStorage.setItem("user", JSON.stringify(res.data));
      setLoading(false);
      setError(null);
      dispatch(login({ isAuthenticated: true, user: res?.data?.user }));
      navigator("/home");
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message || error.message);
      emailRef?.current.focus();
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const googleLogin = () => {
    console.log("google login");
  };

  useEffect(() => {
    document.title = "connectify-Login";
  }, []);

  return (
    <div className="h-screen bg-hero-pattern bg-gray-50 flex lg:flex-row flex-col justify-evenly items-center bg-cover bg-center bg-no-repeat">
      <div className="text-white">
        <h1 className=" mb-3 text-bold flex justify-center lg:justify-start">
          <img src={logo} alt={"logo"} className="lg:w-80 w-52 " />
        </h1>
        <h3 className="lg:text-2xl text-justify tracking-wide">
          Connectify Redefining the Way You Connect <br />
          and Share by Offering a Seamless, Intuitive, <br />
          and Personalized Environment.
        </h3>
      </div>
      <div className="flex flex-col gap-5 border border-violet-950 p-8 rounded-md  backdrop-blur-sm shadow-md">
        <div className="flex flex-col gap-5 text-white">Sign In to account</div>

        <Input
          ref={emailRef}
          type="text"
          placeholder="Enter you username"
          prefix={<PersonFill />}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="authInput"
          error={error}
          // sufix={<BsPersonFill/>}
        />

        <Input
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          placeholder="Enter you password"
          prefix={<LockFill />}
          sufix={showPassword? <FillEyeSlashFill onClick={()=>setShowPassword(false)}/>:<EyeFill onClick={()=>setShowPassword(true)}/>}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="authInput"
          error={error}
        />

        <div className="flex justify-between items-center">
          <span className="text-white">Sign In</span>

          <button
            onClick={userSignIn}
            disabled={loading}
            className="rounded-full bg-violet-600 p-3 text-white text-2x hover:bg-violet-700"
          >
            {loading ? (
              <OutlineLoading className="animate-spin" />
            ) : (
              <ArrowRight />
            )}
          </button>
        </div>

        <p className="text-white">
          dont have an account?
          <Link to={"/register"} className="text-violet-200 cursor-pointer">
            register
          </Link>
        </p>

        <div className="flex justify-center ">
          <a
            href={getGoogleUrl()}
            className="text-white  bg-white rounded-full p-1"
          >
            <Google className={"text-xl"} />
          </a>
        </div>
      </div>
      {error && <ErrorPopup message={error} />}
    </div>
  );
};

export default Login;
