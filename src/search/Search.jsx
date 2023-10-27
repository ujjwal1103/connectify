import { useNavigate } from "react-router-dom";
import SearchInput from "../home/navbar/components/SearchInput";
import { useEffect } from "react";

const Search = () => {
  const navigate = useNavigate();
  const screenWidth = window.innerWidth;


  useEffect(()=> {
if(screenWidth > 785){
  navigate('/home')
}
  },[screenWidth, navigate])

  return (
    <div className="w-screen h-screen lg:hidden flex p-2">
      <SearchInput />
    </div>
  );
};

export default Search;
