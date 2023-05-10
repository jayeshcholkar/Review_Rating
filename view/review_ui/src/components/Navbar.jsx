import React, { useState } from "react";
import ReviewLogo from "../assets/Review_RATE_LOGO.png";
import profile from "../assets/profile.png";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()
  const [nav, setNav] = useState(true);
  const [dropDown, setDropDown] = useState(false);

  const logOut = () => {
    localStorage.clear()
    navigate('/')
  }

  const userName = JSON.parse(localStorage.getItem('userName'))
  const userPic = localStorage.getItem('userPic')
  // console.log(userPic)


  const HandleNav = () => {
    setNav(!nav);
  };

  const HandleDrop = () => {
    setDropDown(!dropDown);
  };
  return (
    <div className="wrapper shadow-lg flex justify-between items-center h-20 px-20 max-sm:px-10 bg-white">
    
      {/* Logo */}
      <div className="text-2xl font-semibold cursor-pointer -ml-10">
       <Link to={'/home'}>
        <img
          src={ReviewLogo}
          alt="Review-And-Rating-Logo"
          style={{ height: 70, width: 225, objectFit : "cover" }}
        />
       </Link>
      </div>
      {/* Search */}
      <div className="flex items-center justify-between gap-5">
        <div className="max-sm:hidden">
          <input
            placeholder="Search..."
            type="text"
            className="border border-gray-300 outline-none p-1 rounded-md px-5 relative"
          />
        </div>
        <AiOutlineSearch className="text-2xl cursor-pointer absolute ml-48 max-sm:hidden" />
        <button onClick={HandleDrop}>
        <div className="flex w-10 h-10 relative">
          <img src={userPic}
          onError = {(e) => 
          e.target.src = profile}
           alt="profile" className="object-cover rounded-full cursor-pointer" />
        </div>
        </button>
         {
          dropDown ? 
        <div className="bg-white p-4 absolute max-sm:-ml-20 max-sm:mt-56 ml-48 mt-48 shadow-lg flex flex-col items-center justify-center gap-3 rounded-md">
          <button className="hover:bg-purple-500 hover:text-white p-1 px-6 rounded-md uppercase border-b border-gray-500">{userName} ➞</button>
          <button className="hover:bg-purple-500 hover:text-white p-1 px-6 rounded-md">Support</button>
          <button onClick={logOut} className="hover:bg-purple-500 hover:text-white p-1 px-6 rounded-md">Sign Out</button>
        </div>
        : null }
      </div>
    </div>
  );
}

export default Navbar;
