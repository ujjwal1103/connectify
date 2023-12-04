import Input from "../../common/InputFields/Input";
import { Send } from "../../icons";
import { useState } from "react";
import { makeRequest } from "../../config/api.config";

const MessageInput = ({ userId, chatId, getMessages }) => {
  const [messageText, setMessageText] = useState("");
  const handleTextChange = (e) => {
    setMessageText(e.target.value);
  };
  const handleSend = async() => {
    const newMessage = {
      text: messageText,
      to: userId,
  };

  const response = await makeRequest.post(`message/${chatId}`,newMessage);
  if(response.isSuccess) {
     console.log(response)
     getMessages()
     setMessageText("")
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
