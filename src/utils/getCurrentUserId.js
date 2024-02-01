export const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("User Not Logged In");
  }

  return user._id;
};

export const getCurrentUsername = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("User Not Logged In");
  }

  return user.username;
};

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("User Not Logged In");
  }

  return user;
};

export const getCurrentUserAndAccessToken = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  return { user, accessToken };
};

export const saveUserAndTokenLocalstorage = (
  user,
  accessToken,
  refressToken
) => {
  console.log(user, accessToken, refressToken);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refressToken", refressToken);
};

export const isCurrentUser = (userId) => {
  return userId === getCurrentUserId();
};
