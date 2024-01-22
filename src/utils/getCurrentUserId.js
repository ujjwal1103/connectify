export const getCurrentUserId = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("User Not Logged In");
  }

  return user._id;
};

export const getCurrentUsername = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("User Not Logged In");
  }

  return user.username;
};

export const getCurrentUser = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("User Not Logged In");
  }

  return user;
};
