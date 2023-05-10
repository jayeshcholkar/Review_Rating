import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const Footer = () => {
  return (
    <div className="mx-auto container pt-10 pb-16 xl:px-20 lg:px-12 sm:px-6 px-4 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4">
        <div className="flex flex-col flex-shrink-0">
          <div className="flex text-2xl text-stone-900">
            <p>Review&</p>
            <p className="font-semibold ">RATE</p>
          </div>
          <p className="text-sm leading-none text-gray-100 mt-4">
            Copyright © 2023 Review&RATE
          </p>
          <p className="text-sm leading-none text-gray-100 mt-4">
            All rights reserved
          </p>
          <div className="flex items-center gap-x-4 mt-12">
            <div className="opacity-50 w-8 h-8 text-white text-xl flex-shrink-0 border bg-gradient-to-t from-indigo-800 via-purple-800 to-pink-800 hover:from-purple-800 hover:to-pink-800 cursor-pointer rounded-full flex items-center justify-center">
              <AiOutlineInstagram />
            </div>
            <div className="opacity-50 w-8 h-8 text-white text-xl flex-shrink-0 border bg-gradient-to-t from-indigo-800 via-purple-800 to-pink-800 hover:from-purple-800 hover:to-pink-800 cursor-pointer rounded-full flex items-center justify-center">
              <AiOutlineLinkedin />
            </div>
            <div className="opacity-50 w-8 h-8 text-white text-xl flex-shrink-0 border bg-gradient-to-t from-indigo-800 via-purple-800 to-pink-800 hover:from-purple-800 hover:to-pink-800 cursor-pointer rounded-full flex items-center justify-center">
              <BsGithub />
            </div>
            <div className="opacity-50 w-8 h-8 text-white text-xl flex-shrink-0 border bg-gradient-to-t from-indigo-800 via-purple-800 to-pink-800 hover:from-purple-800 hover:to-pink-800 cursor-pointer rounded-full flex items-center justify-center">
              <AiOutlineMail />
            </div>
          </div>
        </div>
        <div className="sm:ml-0 ml-8">
          <h2 className="text-base font-semibold leading-4 text-stone-900">
            Company
          </h2>
          <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-100 cursor-pointer">
            About Us
          </p>
          <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-100 cursor-pointer">
            Contact us
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold leading-4 text-stone-900">
            Support
          </h2>
          <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-100 cursor-pointer">
            Legal policy
          </p>
          <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-100 cursor-pointer">
            Privacy policy
          </p>
          <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-100 cursor-pointer">
            Terms of service
          </p>
        </div>
        <div className="mt-10 lg:block hidden">
          <label className="text-xl font-medium leading-5 text-stone-900">
            Get updates
          </label>
          <div className="cursor-pointer flex items-center justify-between  mt-4 ">
            <input
              type="text"
              className="text-base leading-4 p-2 rounded-md border border-gray-400 relative w-full focus:outline-none text-gray-800 placeholder-gray-400"
              placeholder="Enter your email"
            />
            <IoMdSend className="mr-32 text-2xl fill-current text-gray-700 hover:text-gray-500 absolute right-0" />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:hidden">
        <label className="text-xl font-medium leading-5 text-stone-900">
          Get updates
        </label>
        <div className="flex items-center justify-between mt-4">
          <input
            type="text"
            className="text-base leading-4 p-2 rounded-md border border-gray-400 relative w-full focus:outline-none text-gray-800 placeholder-gray-400"
            placeholder="Enter your email"
          />
          <IoMdSend className="mr-10 text-2xl fill-current text-gray-700 hover:text-gray-500 absolute right-0" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
