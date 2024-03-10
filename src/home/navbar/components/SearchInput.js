import { useState, useEffect } from "react";
import Input from "../../../common/InputFields/Input";
import { makeRequest } from "../../../config/api.config";
import blackUser from "../../../assets/no_avatar.png";
import { Search } from "../../../icons";
import UsernameLink from "../../../shared/UsernameLink";

const SearchInput = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery?.trim() !== "") {
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
    <div className="w-full z-[1000] lg:h-auto h-96  relative lg:block">
      <Input
        type="search"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Search your friends"
        className="peer w-full rounded-lg border-none placeholder:text-red-500 outline-none focus:border-none dark:bg-zinc-800 dark:placeholder:text-white dark:text-gray-50 focus-visible:ring-2 focus-visible:ring-[#620C45] "
        sufix={<Search className="text-lg" onClick={handleSearch} />}
      />
      {showSearchResults && searchResults.length > 0 && (
        <div className="lg:absolute mt-2 lg:m-0 max-h-96 overflow-y-scroll z-[100] bg-white dark:bg-zinc-800 flex flex-col gap-3 dark:text-gray-50 w-full top-12 rounded-lg p-3">
          {searchResults?.map((result) => (
            <div
              onClick={() => {
                setShowSearchResults(false);
                setSearchResults([]);
              }}
              className="flex gap-6 items-center"
            >
              <img
                src={result?.avatar || blackUser}
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
