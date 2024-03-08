import React from "react";
import MultiLineInput from "../../common/InputFields/MultiLineInput";

const inputClasses =
  "peer h-full w-full border-2   bg-zinc-800 dark:text-gray-50 focus:  dark:border-zinc-600 focus:dark:border-[#620C45] focus p-2 font-sans text-sm font-normal text-blue-gray-700 transition-all  disabled:border-0 rounded  disabled:bg-blue-gray-50  ";

const labelClasses =
  "after:content[' '] py-1 dark:text-white pointer-events-none  left-1 top-1 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#620C45] after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#620C45] peer-focus:after:scale-x-100 peer-focus:after:border-[#620C45] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";

const Input = ({ value, placeholder, onChange, label, multiLine,name }) => {
  return (
    <div className=" w-full min-w-[200px] flex flex-col-reverse ">
      {multiLine ? (
        <MultiLineInput
        name={name}
          type="text"
          onChange={onChange}
          className={
            inputClasses +
            "min-h-[100px] focus-visible:outline-none focus-visible:ring-3"
          }
          value={value}
        
        />
      ) : (
        <input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClasses}
        />
      )}
      <label className={labelClasses}>{label}</label>
    </div>
  );
};

export default Input;
