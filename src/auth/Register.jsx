import React, { useState, useRef } from "react";
import Input from "../common/InputFields/Input";
import logo from "../assets/logo/logo.png";
import {
  ArrowRight,
  EyeFill,
  EnvelopeAtFill,
  LockFill,
  PersonFill,
  OutlineLoading,
  FillEyeSlashFill,
} from "../icons";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../common/errorPopup";
import { makeRequest } from "../config/api.config";

const Register = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const userSignUp = async () => {
    setLoading(true);
    try {
      await makeRequest.post("/register", {
        username,
        password,
        email,
      });
      setLoading(false);
      setError(null);
      navigator("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error?.response?.data?.message || error.message);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  React.useEffect(() => {
    document.title = "connectify-register";
  }, []);
  return (
    <div className="h-screen bg-hero-pattern lg:flex-row flex-col bg-gray-50 flex justify-evenly items-center bg-cover bg-center bg-no-repeat">
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
        <div className="flex flex-col gap-5 text-white">
          Create New Connectify Account
        </div>
        <Input
          ref={nameRef}
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
          ref={emailRef}
          type="email"
          placeholder="Enter you email"
          prefix={<EnvelopeAtFill />}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          className="authInput"
          value={password}
          error={error}
        />

        <div className="flex justify-between items-center">
          <span className="text-white">Sign Up</span>
          <button
            onClick={userSignUp}
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
          {" "}
          Already have an account{" "}
          <span
            className="text-violet-200 cursor-pointer"
            onClick={() => {
              navigator("/");
            }}
          >
            login
          </span>{" "}
        </p>
      </div>
      {error && <ErrorPopup message={error} />}
    </div>
  );
};

export default Register;
