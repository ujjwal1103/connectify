import { useEffect } from "react";
import Input from "../common/InputFields/Input";
import { PersonFill, OutlineLoading, Google, PasswordLock } from "../icons";
import im from "../../src/assets/bgg.png";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../redux/services/authSlice";
import { makeRequest } from "../config/api.config";
import getGoogleUrl from "../config/getGoogleUri";
import { useAuth } from "../context/AuthProvider";
import Logo from "../icons/Logo";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { login: loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    userSignIn(data);
  };
  const userSignIn = async (data) => {
    try {
      const res = await makeRequest.post("/login", {
        username: data.username,
        password: data.password,
      });
      res && localStorage.setItem("user", JSON.stringify(res));
      loginUser(res?.user);
      dispatch(login({ isAuthenticated: true, user: res?.user }));
      navigator("/home");
    } catch (error) {
      console.log(error);
      setError("root.serverError", {
        type: error?.error?.statusCode,
        message: error?.message,
      });
      toast.error(error?.message);
      setTimeout(() => {
        clearErrors();
      }, 5000);
    }
  };

  useEffect(() => {
    document.title = "connectify-Login";
  }, []);

  return (
    <div className="h-screen relative bg-white flex lg:flex-row flex-col  items-center overflow-hidden">
      <div className="w-screen h-[400px] bg-black absolute top-0 lg:block hidden" />
      <div className="w-screen h-[400px] bg-[#470047] absolute bottom-0 lg:block hidden " />
      <div className="relative hidden  dark:bg-black dark:text-white lg:flex-1 lg:h-screen   w-full   lg:p-8 p-6 lg:flex justify-center items-center flex-col lg:rounded-br-[200px]">
        <h1 className="mb-3 text-bold flex justify-center items-center z-10">
          <Logo className="fill-black dark:fill-white text-7xl" size={"200%"} />
        </h1>
        <h3 className="lg:text-3xl text-justify font-display lg:block hidden z-10">
          Connectify Redefining the Way You Connect <br />
          and Share by Offering a Seamless, Intuitive, <br />
          and Personalized Environment.
        </h3>
        <img src={im} alt="" className="absolute opacity-30 " loading="lazy" />
      </div>
      <div className=" flex-1 flex justify-center items-center h-screen  bg-[#470047] border-violet-950 p-8 backdrop-blur-sm  lg:rounded-tl-[200px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-5 w-96   "
        >
          <h1 className="mb-3 text-bold flex justify-center items-center lg:hidden">
            <Logo className="fill-black dark:fill-white " size={"100%"} />
          </h1>
          <div className="flex flex-col gap-5 dark:text-white text-4xl font-bold">
            Welcome!
          </div>
          <div className="flex flex-col gap-5 dark:text-white text-xl">
            Sign In to Connectify
          </div>
          <Input
            className="authInput"
            type="text"
            placeholder="Enter you username"
            prefix={<PersonFill className=" fill-violet-50  text-2xl" />}
            error={errors?.username}
            {...register("username", { required: "Username is required" })}
          />

          <Input
            {...register("password", {
              required: "Password is required",
            })}
            type={"password"}
            placeholder="Enter you password"
            prefix={<PasswordLock className=" fill-violet-50 text-2xl" />}
            className="authInput "
            error={errors?.password}
          />

          <div className="flex justify-between w-full items-center">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full disabled:bg-slate-500 disabled:text-gray-400 disabled:cursor-not-allowed bg-slate-950 rounded-xl p-3 text-white text-2x hover:bg-black"
            >
              {isSubmitting ? (
                <OutlineLoading className="animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </div>

          <p className="text-white">
            Dont have an account?
            <Link
              to={"/register"}
              className="text-violet-200 cursor-pointer px-2"
            >
              Register
            </Link>
          </p>

          <div className="flex rounded-full justify-center  ">
            <a href={getGoogleUrl()} className="text-white p-3 ">
              <Google
                className={
                  "text-xl bg-white rounded-full  hover:shadow-2xl hover:shadow-slate-950"
                }
              />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
