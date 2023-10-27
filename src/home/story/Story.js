import React from "react";
import { useState } from "react";
import { makeRequest } from "../../config/api.config";
import { useEffect } from "react";

const Story = () => {
  const [Stories, setStories] = useState([]);

  const fetchStories = async () => {
    const res = await makeRequest("/stories");
    setStories(res.data.stories);
  };

  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <div>
      {Stories.map((story) => (
        <div key={story} className="flex flex-col items-center gap-2">
          <img
            src={story?.user?.profilePicture}
            alt=""
            width={76}
            height={76}
            className="w-20 h-20 outline outline-offset-2 outline-violet-500 rounded-full"
          />
          <span>{story?.user?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Story;
