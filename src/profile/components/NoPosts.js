import React from "react";
import { Camera } from "../../icons";

function NoPosts() {
  return (
    <div className="flex-1 h-96">
      <div className="flex-center md:h-full h-32 flex-col">
        <div className="md:size-24 size-16 md:border-4 border-2 border-black dark:border-gray-300 rounded-full flex  justify-center items-center">
          <Camera className="md:size-14 size-8" />
        </div>
        <span className="md:text-2xl"> No Posts Yet !!</span>
      </div>
    </div>
  );
}

export default NoPosts;
