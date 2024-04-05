import React, { useState } from "react";

const Switch = ({ checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className="relative cursor-pointer w-12 h-7 p-1 dark:bg-gray-700 bg-violet-200 rounded-full shadow-inner transition duration-300 ease-in-out">
        <div
          className={`absolute w-5 h-5  rounded-full shadow-md transform transition duration-300 ease-in-out ${
            checked ? "translate-x-5 bg-blue-600 " : "translate-x-0 bg-zinc-100"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
