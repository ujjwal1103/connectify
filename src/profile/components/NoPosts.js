import React from "react";
import { Camera } from "../../icons";

function NoPosts() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-20">
      <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center p-4">
        <Camera size={34} strokeWidth={0} />
      </div>
      <p className="text-black text-lg font-medium">No post yet</p>
    </div>
  );
}

export default NoPosts;
