import React from "react";
import { Camera } from "../../icons";

function NoPosts() {
  return (
    <div className=" flex-1 h-96 ">
      <div className="h-full  flex items-center justify-center flex-col">
        <div className="w-24 h-24 border-4  rounded-full flex  justify-center items-center">
          <Camera size={52}/>
        </div>
        <span className="text-2xl"> No Posts Yet !!</span>
      </div>
    </div>
  );
}

export default NoPosts;
