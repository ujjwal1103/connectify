import React from "react";

const Input = ({ value, placeholder, setState, label }) => {
  return (
    <div className="relative h-11 w-full min-w-[200px]">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="peer h-full w-full border-b border-gray-400 dark:border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-violet-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      />
      <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        {label}
      </label>
    </div>
  );
};

export default Input;
