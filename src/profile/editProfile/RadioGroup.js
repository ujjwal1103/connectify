import React from "react";

const RadioGroup = ({ values, selectedValue, onChange, name }) => {
  return (
    <div className="flex flex-col my-2">
      <label className="after:content[' '] text-gray-50 pointer-events-none block h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#620C45] after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#620C45] peer-focus:after:scale-x-100 peer-focus:after:border-[#620C45] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        {name}
      </label>
      <div className="flex gap-10">
        {values.map((value) => {
          return (
            <div className="inline-flex items-center" key={value}>
              <label
                className="relative flex cursor-pointer items-center dark:text-gray-50 rounded-full p-3"
                for="ripple-on"
                data-ripple-dark="true"
              >
                <input
                  name={name}
                  type="radio"
                  value={value}
                  onChange={onChange}
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#620C45] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#620C45] checked:before:bg-[#620C45] hover:before:opacity-10"
                  checked={selectedValue === value}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#620C45] opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <label
                className="mt-px cursor-pointer select-none font-light dark:text-gray-50"
                for="ripple-on"
              >
                {value}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
