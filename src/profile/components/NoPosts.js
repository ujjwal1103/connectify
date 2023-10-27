import React from "react";
import { BsCamera } from "react-icons/bs";

function NoPosts() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-20">
      <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center p-4">
        <BsCamera size={34} strokeWidth={0} />
      </div>
      <p className="text-black text-lg font-medium">No post yet</p>
    </div>
  );
}

export default NoPosts;
