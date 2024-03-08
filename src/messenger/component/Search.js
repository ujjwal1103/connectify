import React from "react";
import Input from "../../common/InputFields/Input";

const Search = ({ searchTerm, onChange }) => {
  return (
    <div className="p-2 ">
      <Input
        className="border-none dark:bg-zinc-900 pl-10 shadow-inner w-full rounded-3xl dark:text-gray-300"
        placeholder="Search"
        value={searchTerm}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
