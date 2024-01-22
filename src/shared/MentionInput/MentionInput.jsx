import { useDebouncedState } from "@react-hookz/web";
import React, { useEffect, useRef, useState } from "react";
import { makeRequest } from "../../config/api.config";

const MentionInput = () => {
  const inputRef = useRef(null);
  const [query, setQuery] = useDebouncedState("", 600, 500);
  const [text, setText] = useState();
  const [users, setUsers] = useState([]);
  const [mentionStartIndex, setMentionStartIndex] = useState(null);
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setMentionedUsers([]);
    }
    setText(inputValue);

    // Detect "@" symbol in the input
    const atIndex = inputValue.lastIndexOf("@");

    console.log(atIndex);

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
    if(!user){
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

    setText(updatedText.trim()); // Trim to remove any leading/trailing whitespace
    setMentionStartIndex(null);
    setUsers([]);
    inputRef.current.focus();
  };

  useEffect(() => {
    // Calculate position when mentionStartIndex changes
    if (mentionStartIndex !== null && users.length > 0 && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const inputTop = inputRect.top + window.scrollY;
      const inputBottom = inputRect.bottom + window.scrollY;
      const spaceAbove = inputTop;
      const spaceBelow = window.innerHeight - inputBottom;

      const newPosition = {
        left: inputRect.left + window.scrollX,
      };

      if (spaceAbove > spaceBelow) {
        newPosition.top = inputTop - 200; // Adjust the offset as needed
      } else {
        newPosition.top = inputBottom; // Adjust the offset as needed
      }

      setPosition(newPosition);
    }
  }, [mentionStartIndex, users]);

  console.log(mentionedUsers);

  return (
    <div className="bg-slate-950">
      <div>
        <textarea
          type="text"
          onChange={handleInputChange}
          value={text}
          className="bg-transparent w-full"
          ref={inputRef}
        />
      </div>
      {mentionStartIndex !== null && users.length > 0 && (
        <div
          className="p-2 divide-y-2"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
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

export default MentionInput;
