import React, { useState } from "react";
import profile from "../assets/profile.png";
import { FaStar } from "react-icons/fa";

const Review = ({ review }) => {
  console.log(review);
  const [menu, setMenu] = useState(true);
  const [rate, setRate] = useState(review.rating);
  console.log(rate);
  
  const StarRating = () => {
    return (
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <label key={idx}>
              <input
                type="radio"
                className="hidden"
                name="rating"
                // onChange={() => setRate(idx)}
                // value={rate}
                // checked={idx === rate}
              />
              <FaStar
                className="text-xl"
                color={idx < rate ? "#fea904" : "#bbb"}
              />
            </label>
          ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-b-md px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center border-b">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex justify-start items-start"></div>
        <div className="w-full flex justify-start items-start flex-col p-8">
          <div className="mt-3 flex justify-start items-center flex-row space-x-2.5">
            <div>
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  review.userId.profilePic === undefined
                    ? profile
                    : review.userId.profilePic
                }
                alt="avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-base font-medium leading-none text-gray-800">
                {review.userId.userName}
              </p>
              <p className="text-sm leading-none text-gray-600">{review.createdAt}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="flex flex-row justify-between items-start">
              <p className="font-medium text-xl text-gray-800">
                {review?.subject}
              </p>
              <button onClick={() => setMenu(!menu)} className="ml-4 md:hidden">
                <svg
                  className={"transform " + (menu ? "rotate-180" : "rotate-0")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 12.5L10 7.5L5 12.5"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="cursor-pointer mt-4 md:mt-0 flex">
              <StarRating />
            </div>
          </div>
          <div className={"md:block " + (menu ? "block" : "hidden")}>
            <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">
              {review.review}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
