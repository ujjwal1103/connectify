
import Input from "../../common/InputFields/Input";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import {
  PersonFill,
  OutlineLoading,
  PasswordLock,
  Google,
  Mail,
  UsernameIcon,
} from "../../icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import Connectify from "./components/Connectify";
import FadeInAnimation from "../../utils/Animation/FadeInAnimation";
import ConnectifyLogoText from "../../icons/ConnectifyLogoText";
import { registerWithEmailAndPassword } from "../../api";
import { saveUserAndTokenLocalstorage } from "../../utils/getCurrentUserId";
import ConnectifyIcon from "../../icons/Connectify";
import { useAuth } from "../../context/AuthProvider";
import { useDispatch } from "react-redux";
import { login } from "../../redux/services/authSlice";
import { SubmitButton } from "./components/SubmitButton";
import { GoogleButton } from "./components/GoogleButton";

const Register = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login: loginUser } = useAuth();
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, clearErrors, control, formState } =
    useForm({
      criteriaMode: "all",
      mode: "onBlur",
    });
  const { errors, isValid, isSubmitting, isLoading } = formState;
  const onSubmit = (data) => {
    userSignUp(data);
  };

  // const username = watch("username");

  // const debouncedUsername = useDebounce(username, 400);

  // useEffect(() => {

  // }, [debouncedUsername]);

  const userSignUp = async (data) => {
    setLoading(true);
    try {
      const res = await registerWithEmailAndPassword(data);

      if (res.isSuccess) {
        setLoading(false);
        saveUserAndTokenLocalstorage(
          res.user,
          res.accessToken,
          res.refreshToken
        );
        toast.success(res.message, {
          icon: <ConnectifyIcon size={34} />,
          closeOnClick: true,
          closeButton: true,
          autoClose: 2000,
          hideProgressBar: false,
        });
        loginUser(res?.user);
        dispatch(login({ isAuthenticated: true, user: res?.user }));
        navigator("/");
      }
    } catch (error) {
      setLoading(false);
      setError("root.serverError", {
        type: error?.error?.statusCode,
        message: error?.message,
      });
      toast.error(error?.response?.data?.message || error.message);
      setTimeout(() => {
        clearErrors();
      }, 5000);
    }
  };

  useEffect(() => {
    document.title = "connectify-register";
  }, []);

  console.log(isLoading, loading, isSubmitting);

  return (
    <div className="h-screen relative bg-white flex lg:flex-row flex-col  items-center overflow-hidden">
      <div className="w-screen h-[400px] bg-black absolute top-0 lg:block hidden" />
      <div className="w-screen h-[400px] bg-[#470047] absolute bottom-0 lg:block hidden " />
      <Connectify />
      <div className=" lg:flex-1 flex justify-center items-center h-screen w-screen  bg-[#470047] border-violet-950 p-8 backdrop-blur-sm  lg:rounded-tl-[200px]">
        <FadeInAnimation>
          <form
           noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-5 "
          >
            <h1 className="mb-3 text-bold flex justify-center items-center lg:hidden">
              <ConnectifyLogoText />
            </h1>
            <div className="flex flex-col gap-5 dark:text-white text-4xl font-bold">
              Welcome!
            </div>
            <div className="flex flex-col gap-5 dark:text-white text-xl">
              Register To Connectify
            </div>
            <Input
            autoFocus={true}
              
              type="text"
              placeholder="Enter you Username"
              prefix={<UsernameIcon size={24} />}
              error={errors?.username}
              {...register("username", {
                required: "Username is Required",
                pattern: {
                  value: /^(?=[a-z_])[a-z0-9_]{5,20}$/,
                  message: "Invalid Username",
                },
                validate: (val)=>{
                  return val !== "ujjwallade" || 'Value should be ujjwal lade'
                }
              })}
            />

            <Input
              type="text"
              placeholder="Enter you Name"
              prefix={<PersonFill size={24} />}
              error={errors?.name}
              {...register("name", { required: "Name is Required" })}
              required={true}
            />
            <Input
              type="text"
              placeholder="Enter you email"
              prefix={<Mail size={24} />}
              error={errors?.email}
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid Email",
                },
              })}
            />

            <Input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 8,
                  message: "Password should be minimum 8 char long",
                },
              })}
              type={"password"}
              placeholder="Enter you password"
              prefix={<PasswordLock size={24} />}
             
              error={errors?.password}
            />

            <SubmitButton
              title={"Register"}
              isSubmitting={isSubmitting}
              isValid={isValid}
              loading={loading}
            />

            <p className="text-white">
              Already have an account
              <Link
                to={"/login"}
                className="text-violet-200 cursor-pointer px-2"
              >
                Login
              </Link>
            </p>

            <GoogleButton />
          </form>
        </FadeInAnimation>
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default Register;
