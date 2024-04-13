
import SearchInput from "../home/navbar/components/SearchInput";
import { isMobile } from "react-device-detect";
import PageNotFound from "../PageNotFound/PageNotFound";

const Search = () => {
  
  if(!isMobile){
     return <PageNotFound/>
  }

  return (
    <div className="w-screen h-dvh lg:hidden -z-50 flex justify-center p-2">
      <SearchInput />
    </div>
  );
};

export default Search;
