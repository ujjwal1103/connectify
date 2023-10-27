import React, { useState, useRef } from "react";
import Input from "../common/InputFields/Input";

import {
  ArrowRight,
  EyeFill,
  EnvelopeAtFill,
  LockFill,
  PersonFill,
  OutlineLoading,
} from "../icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPopup from "../common/errorPopup";

const Register = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const userSignUp = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3100/api/register", {
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
    <div className="h-screen bg-hero-pattern bg-gray-50 flex justify-evenly items-center bg-cover bg-center bg-no-repeat">
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
          type="text"
          placeholder="Enter you password"
          prefix={<LockFill />}
          sufix={<EyeFill />}
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
