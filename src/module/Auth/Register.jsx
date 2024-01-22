import Input from "../../common/InputFields/Input";

import { useForm } from "react-hook-form";
import { PersonFill, OutlineLoading, PasswordLock, Google } from "../../icons";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../config/api.config";
import { toast } from "react-toastify";
import getGoogleUrl from "../../config/getGoogleUri";

import { useEffect } from "react";
import Connectify from "./components/Connectify";
import Logo from "../../icons/Logo";

const Register = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    userSignUp(data);
  };

  const userSignUp = async (data) => {
    try {
      const res = await makeRequest.post("/register", {
        username: data.username,
        password: data.password,
        email: data.email,
      });

      if (res.isSuccess) {
        toast.success(res.message);
        navigator("/login");
      }
    } catch (error) {
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

  return (
    <div className="h-screen relative bg-white flex lg:flex-row flex-col  items-center overflow-hidden">
      <div className="w-screen h-[400px] bg-black absolute top-0 lg:block hidden" />
      <div className="w-screen h-[400px] bg-[#470047] absolute bottom-0 lg:block hidden " />
      <Connectify />
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
            Register To Connectify
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
            className="authInput"
            type="text"
            placeholder="Enter you email"
            prefix={<PersonFill className=" fill-violet-50  text-2xl" />}
            error={errors?.email}
            {...register("email", { required: "Email is required" })}
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
                "Register"
              )}
            </button>
          </div>

          <p className="text-white">
            Already have an account
            <Link to={"/login"} className="text-violet-200 cursor-pointer px-2">
              Login
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

export default Register;
