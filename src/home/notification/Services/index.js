import {
  getCurrentUserId,
  getCurrentUsername,
} from "../../../utils/getCurrentUserId";

export const sendNotification = async (userId, action, socket) => {
  console.log(userId, getCurrentUserId());
  if (userId && getCurrentUserId()) {
    switch (action) {
      case "Post Like": {
        socket.emit("Notification", {
          to: userId,
          from: getCurrentUserId(),
          notification: `${getCurrentUsername()} Liked Your Post`,
        });
      }
    }
  }
};
