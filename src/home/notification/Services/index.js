import { NEW_MESSAGE } from "../../../utils/constant";
import {
  getCurrentUserId,
  getCurrentUsername,
} from "../../../utils/getCurrentUserId";

export const sendNotification = async (userId, action, socket, chatId, message) => {
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
      case NEW_MESSAGE: {
        socket.emit(NEW_MESSAGE, {
          to: userId,
          chat: chatId,
          from: getCurrentUserId(),
          message,
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
