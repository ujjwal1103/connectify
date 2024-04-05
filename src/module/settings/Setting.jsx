import React, { useCallback, useEffect, useState } from "react";
import Switch from "./Switch";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/services/profileSlice";
import { makeRequest } from "../../config/api.config";

const PrivateAccount = () => {
  const { user } = useSelector((state) => state.profile);
  const [checked, setChecked] = useState(user?.isPrivate);
  console.log(user);
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    try {
      const data = await makeRequest("/user");
      dispatch(setUser(data.user));
      setChecked(data.user.isPrivate);
    } catch (error) {
      console.log("error", error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleChange = async () => {
    const data = await makeRequest.put(
      `/user/privateAccount?isPrivate=${!checked}`
    );
    if (data.isSuccess) {
      setChecked(!checked);
    }
  };

  return (
    <div className="py-3 flex justify-between items-center">
      <label htmlFor="private_account" className="text-[16px]">
        Private account
      </label>
      <Switch checked={checked} onChange={handleChange} />
    </div>
  );
};

const ThemeSwitcher = () => {


  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode state from localStorage, default to false if not found
    return localStorage.getItem("darkMode") === "true" ? true : false;
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  return (
    <div className="py-3 flex justify-between items-center">
      <label htmlFor="private_account" className="text-[16px]">
        Dark
      </label>
      <Switch
        checked={darkMode}
        onChange={handleDarkMode}
      />
    </div>
  );
};

export { PrivateAccount, ThemeSwitcher };

const settings = [
  {
    id: "101",
    title: "Account Privacy",
    subText:
      "When your account is public, your profile and posts can be seen by anyone, on or off Connectify.",
    component: <PrivateAccount />,
  },
  {
    id: "101",
    title: "Theme",
    subText: "Switch Your Theme mode to dark for better app experience",
    component: <ThemeSwitcher />,
  },
];

const Setting = () => {
  return (
    <main className="lg:h-page h-dvh  dark:bg-zinc-950 lg:w-1/2 shadow-md mx-auto">
      <header className="p-5">
        <h1 className="font-semibold text-3xl">Settings</h1>
      </header>
      <section className="px-5">
        {settings.map((setting) => {
          return (
            <div className="mt-5">
              <h2 className="text-semibold text-xl">{setting.title}</h2>
              <div>{setting.component}</div>
              <p className="text-xs">{setting.subText}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Setting;
