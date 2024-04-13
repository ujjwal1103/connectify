import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

import ConnectifyLogoText from "../icons/ConnectifyLogoText";
import { IoClose } from "react-icons/io5";
import { Loader } from "../messenger/component/MessageInput";
import {useDispatch, useSelector} from 'react-redux'
import { setUploadingPost } from "../redux/services/postSlice";
const Layout = () => {

  const {uploadingPost} = useSelector(state=>state.post)


  const dispatch = useDispatch()


  const closeLoader = ()=>dispatch(setUploadingPost({loading: false, post:null}))
  

  return (
    <>
       {uploadingPost.loading && <div className="text-white bg-black  absolute top-0 w-screen left-0   rounded-md p-3 shadow-2xl z-50">
           <button className="absolute right-4" onClick={closeLoader}><IoClose /></button>
           <p className="text-center py-2">Posting</p>
           <Loader />  
      </div>}
      <MobileHeader/>
      <Navbar />
      <Outlet />


   
      {uploadingPost.loading && <div className="text-white hidden lg:block bg-black m-2 fixed bottom-auto lg:h-fit lg:bottom-0 w-96 lg:right-0 rounded-md p-3 shadow-2xl z-50">
           <button className="absolute right-4" onClick={closeLoader}><IoClose /></button>
           <p className="text-center py-2">Posting</p>
           <Loader />  
      </div>}
    </>
  );
};

export default Layout;

const MobileHeader = () => (
  <header className="w-full lg:hidden md:hidden z-50 p-2 h-fit dark:bg-black  ">
    <div className="flex justify-center items-center sticky top-10">
      <ConnectifyLogoText w="200" h="20" />
    </div>
  </header>
);
