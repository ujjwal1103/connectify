import { useState, useEffect, use } from "react";
import Input from "../../../common/InputFields/Input";
import { makeRequest } from "../../../config/api.config";
import { Link } from "react-router-dom";
import blackUser from "../../../assets/no_avatar.png";
import { Search } from "../../../icons";
import UsernameLink from "../../../shared/UsernameLink";

const SearchInput = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() !== "") {
        try {
          const res = await makeRequest(`/users/search?query=${searchQuery}`);
          if (res.isSuccess) {
            setSearchResults(res?.users);
            setShowSearchResults(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setShowSearchResults(false);
        setSearchResults([]);
      }
    }, 700); // Adjust the debounce delay time as needed (in milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  return (
    <div className="w-96 relative  lg:block">
      <Input
        type="search"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="search your friends"
        className="w-full rounded-lg border-none outline-none focus:border-none dark:bg-slate-500 dark:placeholder:text-white dark:text-gray-50"
        sufix={
          <Search
            className="text-black dark:text-white"
            onClick={handleSearch}
          />
        }
      />

      {showSearchResults && searchResults.length > 0 && (
        <div className="lg:absolute mt-2 lg:m-0 max-h-96 overflow-scroll bg-white dark:bg-slate-800 flex flex-col gap-3 dark:text-gray-50 w-full top-12 rounded-lg p-3">
          {searchResults?.map((result) => (
            <div
              onClick={() => {
                setShowSearchResults(false);
                setSearchResults([]);
              }}
              className="flex gap-6 items-center"
            >
              <img
                src={result?.profilePicture || blackUser}
                alt=""
                className="w-10 h-10 rounded-full object-contain bg-gray-400 "
              />
              <UsernameLink
                username={result.username}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
