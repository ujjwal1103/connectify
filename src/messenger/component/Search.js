import React from "react";
import Input from "../../common/InputFields/Input";

const Search = ({ searchTerm, onChange }) => {
  return (
    <div className="p-2">
      <Input
        className="border-none shadow-inner w-full rounded-3xl dark:text-black"
        placeholder="Search"
        value={searchTerm}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
