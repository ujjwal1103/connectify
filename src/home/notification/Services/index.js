import {
  getCurrentUserId,
  getCurrentUsername,
} from "../../../utils/getCurrentUserId";

export const sendNotification = async (userId, action, socket, chatId) => {
  if (userId && getCurrentUserId()) {
    switch (action) {
      case "Post Like": {
        socket.emit("Notification", {
          to: userId,
          from: getCurrentUserId(),
          notification: `${getCurrentUsername()} Liked Your Post`,
        });
        break;
      }
      case "Send Message": {
        socket.emit("Send Message", {
          to: userId,
          chat: chatId,
          from: getCurrentUserId(),
          notification: `${getCurrentUsername()} send you a Message`,
        });
        break;
      }
      default : {
        break;
      }
    }
  }
};
