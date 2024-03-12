import React, { useRef, useState } from "react";
import { makeRequest } from "../../../config/api.config";
import { EmojiSmile } from "../../../icons";
import MentionInput from "../../../shared/MentionInput/MentionInput";
import Picker from "emoji-picker-react";
import { useClickOutside } from "@react-hookz/web";

const CommentInput = ({ postId }) => {
  const [commentText, setCommentText] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [mentionedUsers, setMentionedUsers] = useState([]);

  const emojiRef = useRef();
  const inputRef = useRef();

  const sendComment = async () => {
    try {
      const data = await makeRequest.post(`/comment`, {
        post: postId,
        comment: commentText,
        mentions: mentionedUsers,
      });
      if (data.isSuccess) {
        setCommentText("");
        setMentionedUsers([]);
        setShowEmojiPicker(false);
        setCursorPosition(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputClick = (event) => {
    setCursorPosition(event.target.selectionStart);
  };

  const handleInputBlur = () => {
    setCursorPosition(inputRef.current.selectionStart);
  };

  useClickOutside(emojiRef, () => {
    setShowEmojiPicker(false);
  });

  const onEmojiClick = (event) => {
    const emoji = event.emoji;
    const newInputValue =
      commentText &&
      commentText.substring(0, cursorPosition) +
        emoji +
        commentText.substring(cursorPosition);

    setCommentText(newInputValue || emoji);

    // Calculate the new cursor position after adding the emoji
    const newCursorPosition = cursorPosition + emoji.length;

    // Set the selection range to focus at the new cursor position
    inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    inputRef.current.focus();
  };
  return (
    <div className="flex justify-between relative gap-3 items-center bg-zinc-800 rounded-md">
      <MentionInput
        ref={inputRef}
        text={commentText}
        setText={setCommentText}
        placeholder={"Add a comment..."}
        setCursorPosition={setCursorPosition}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        mentionedUsers={mentionedUsers}
        setMentionedUsers={setMentionedUsers}
      />
      {commentText && (
        <button className="text-blue-400" onClick={sendComment}>
          Post
        </button>
      )}
      <button className="pr-2" onClick={() => setShowEmojiPicker(true)}>
        <EmojiSmile />
      </button>

      {showEmojiPicker && (
        <div ref={emojiRef} className="absolute  z-10 -right-72 bottom-0">
          <Picker
            onEmojiClick={onEmojiClick}
            emojiStyle="apple"
            theme={document.body.classList.contains("dark") ? "dark" : "light"}
            className="dark:bg-zinc-950"
          />
        </div>
      )}
    </div>
  );
};

export default CommentInput;
