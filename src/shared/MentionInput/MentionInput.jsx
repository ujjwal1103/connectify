import { useDebouncedState } from "@react-hookz/web";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { makeRequest } from "../../config/api.config";

const MentionInput = (
  { text, setText, placeholder, setCursorPosition, onClick, onBlur, mentionedUsers, setMentionedUsers },
  ref
) => {
  const [query, setQuery] = useDebouncedState("", 600, 500);
  const [users, setUsers] = useState([]);
  const [mentionStartIndex, setMentionStartIndex] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    console.log(inputValue);

    if (inputValue.trim() === "") {
      setMentionedUsers([]);
    }
    setText(inputValue);
    setCursorPosition(e.target.selectionStart);

    // Detect "@" symbol in the input
    const atIndex = inputValue.lastIndexOf("@");


    if (atIndex !== -1) {
      // "@" found at the end, consider it a mention trigger
      const spaceIndex = inputValue.indexOf(" ", atIndex);
      const mentionQuery =
        spaceIndex !== -1
          ? inputValue.substring(atIndex + 1, spaceIndex)
          : inputValue.substring(atIndex + 1);
      setMentionStartIndex(atIndex);
      setQuery(mentionQuery);
    } else {
      setMentionStartIndex(null);
      setQuery("");
    }


    const remainingUsers = mentionedUsers.filter((user) => inputValue.includes(`${user}`));
    setMentionedUsers(remainingUsers);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await makeRequest(`/users/search?query=${query}`);
        if (res.isSuccess) {
          setUsers(res.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (query) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [query]);

  const handleUserClick = (selectedUsername) => {
    const user = mentionedUsers.some((u) => u === selectedUsername);
    if (!user) {
      setMentionedUsers((prev) => [...prev, selectedUsername]);
    }

    const nextSpaceIndex = text.indexOf(" ", mentionStartIndex);

    // If there is a space after mentionStartIndex, remove everything including the mention
    const insertionIndex = nextSpaceIndex !== -1 ? nextSpaceIndex : text.length;

    // Replace the text from mentionStartIndex to the next space with the selected username
    const updatedText =
      text.slice(0, mentionStartIndex) +
      selectedUsername +
      text.slice(insertionIndex);

    setText(updatedText.trim());
    setMentionStartIndex(null);
    setUsers([]);
    ref.current.focus();
  };

  return (
    <div className="w-full">
      <textarea
        type="text"
        onChange={handleInputChange}
        value={text}
        className="bg-transparent p-2 border-none w-full h-full focus:outline-none resize-none "
        ref={ref}
        rows={1}
        placeholder={placeholder}
        onClick={onClick}
        onBlur={onBlur}
      />

      {mentionStartIndex !== null && users.length > 0 && (
        <div className="p-2 absolute divide-y-2 z-10 w-96 mt-2 bg-zinc-950 rounded-md h-auto min-h-fit max-h-52 overflow-y-scroll">
          {users.map((u) => (
            <div
              className="p-1"
              key={u._id}
              onClick={() => handleUserClick(u.username)}
            >
              {u.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default forwardRef(MentionInput);
