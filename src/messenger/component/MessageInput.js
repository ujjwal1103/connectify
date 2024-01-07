import Input from "../../common/InputFields/Input";
import { Send } from "../../icons";
import { useState } from "react";
import { makeRequest } from "../../config/api.config";
import { useDispatch } from "react-redux";
import { setMessageChatId } from "../../redux/services/chatSlice";

const MessageInput = ({ userId, chatId, getMessages }) => {
  const [messageText, setMessageText] = useState("");
  const dispatch = useDispatch();
  const handleTextChange = (e) => {
    setMessageText(e.target.value);
  };
  const handleSend = async () => {
    const newMessage = {
      text: messageText,
      to: userId,
    };

    const response = await makeRequest.post(`message/${chatId}`, newMessage);
    if (response.isSuccess) {
      console.log(response);
      getMessages();
      setMessageText("");
      dispatch(setMessageChatId(response.chatId));
    }
  };
  return (
    <div className="p-2 bg-blue-400 flex gap-3 items-center">
      <Input
        className="w-full  rounded-md"
        value={messageText}
        onChange={handleTextChange}
      />
      <div className="cursor-pointer">
        <Send onClick={handleSend} />
      </div>
    </div>
  );
};

export default MessageInput;
