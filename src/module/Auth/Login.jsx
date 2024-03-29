import { useEffect, useState } from "react";
import Input from "../../common/InputFields/Input";
import { PersonFill, OutlineLoading, Google, PasswordLock } from "../../icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/services/authSlice";
import getGoogleUrl from "../../config/getGoogleUri";
import { useAuth } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Connectify from "./components/Connectify";
import { saveUserAndTokenLocalstorage } from "../../utils/getCurrentUserId";
import FadeInAnimation from "../../utils/Animation/FadeInAnimation";
import ConnectifyIcon from "../../icons/Connectify";
import ConnectifyLogoText from "../../icons/ConnectifyLogoText";
import { loginWithEmailAndPassword } from "../../api";

const Login = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { login: loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    loginUserWithEmailAndPassword(data);
  };
  const loginUserWithEmailAndPassword = async (data) => {
    setLoading(true);
    try {
      const res = await loginWithEmailAndPassword({
        username: data.username,
        password: data.password,
      });
      if (res.isSuccess) {
        saveUserAndTokenLocalstorage(
          res.user,
          res.accessToken,
          res.refreshToken
        );

        toast(`Welcome Back!!`, {
          icon: <ConnectifyIcon size={34} />,
        });
      }
      loginUser(res?.user);
      setLoading(false);
      dispatch(login({ isAuthenticated: true, user: res?.user }));
      navigator("/");
    } catch (error) {
      console.log(error);
      setError("root.serverError", {
        type: error?.error?.statusCode,
        message: error?.message,
      });
      setLoading(false);
      toast.error(error?.message, {
        position: "top-center",
      });
      setTimeout(() => {
        clearErrors();
      }, 5000);
    }
  };

  useEffect(() => {
    document.title = "connectify-Login";
  }, []);

  return (
    <div className="h-screen  relative  flex lg:flex-row flex-col  items-center overflow-hidden">
      <div className="lg:w-screen h-[400px] bg-black absolute top-0 lg:block hidden" />
      <div className="lg:w-screen h-[400px] bg-[#470047] absolute bottom-0 lg:block hidden " />
      <Connectify />
      <div className=" flex-1 flex justify-center items-center  h-screen w-screen bg-[#470047] border-violet-950 p-8 backdrop-blur-sm  lg:rounded-tl-[200px]  ">
        <FadeInAnimation>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center  mx-10  gap-5"
          >
            <h1 className="mb-3 text-bold flex justify-center items-center lg:hidden">
              <ConnectifyLogoText />
            </h1>
            <div className="flex 4 flex-col gap-5 dark:text-white text-4xl font-bold">
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
              {loading ? (
                <button
                  disabled
                  className="w-full flex justify-center items-center disabled:cursor-not-allowed bg-slate-950 rounded-xl p-3 text-white  "
                >
                  <OutlineLoading className="animate-spin" size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full disabled:bg-slate-500 disabled:text-gray-400 disabled:cursor-not-allowed bg-slate-950 rounded-xl p-3 text-white  hover:bg-black"
                >
                  {isSubmitting ? (
                    <OutlineLoading className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>
              )}
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
        </FadeInAnimation>
      </div>
    </div>
  );
};

export default Login;
