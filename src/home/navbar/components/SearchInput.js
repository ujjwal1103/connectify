import React, { useState } from "react";
import Input from "../../../common/InputFields/Input";
import { BsSearch } from "react-icons/bs";
import { makeRequest } from "../../../config/api.config";
import { Link } from "react-router-dom";

import blackUser from "../../../assets/no_avatar.png";

const SearchInput = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setShowSearchResults(true);
    try {
      const res = await makeRequest(`/users/search?query=${e.target.value}`);
      if (res) {
        setSearchResults(res?.data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchResults);
  return (
    <div className="w-96 relative  lg:block">
      <Input
        type="search"
        onChange={handleSearch}
        placeholder="search your friends"
        className="w-full rounded-lg border-none outline-none focus:border-none dark:bg-slate-500 dark:placeholder:text-white dark:text-gray-50"
        sufix={
          <BsSearch
            className="text-black dark:text-white"
            onClick={handleSearch}
          />
        }
      />

      {showSearchResults && searchResults.length > 0 && (
        <div className="lg:absolute mt-2 lg:m-0 bg-white dark:bg-slate-800 flex flex-col gap-3 dark:text-gray-50 w-full top-12 rounded-lg p-3">
          {searchResults?.map((result) => (
            <Link
              to={`/${result?.username}`}
              className="flex gap-6 items-center"
            >
              <img
                src={result?.profilePicture || blackUser}
                alt=""
                className="w-10 h-10 rounded-full object-contain bg-gray-400 "
              />
              <span>{result.username}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
