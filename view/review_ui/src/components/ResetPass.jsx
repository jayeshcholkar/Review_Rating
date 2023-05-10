import axios from "axios";
import React from "react";
import forgetimg from "../assets/forgot-password.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

function resetPass() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [userError, setUserError] = useState();
  const { id, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`http://localhost:9000/user/resetpassword/${id}/${token}`, data)
      .then((response) => {
        console.log(response)
        setUser(response.data.success);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setUserError(error.response.data.message);
      });
  };
  if (user === true) {
    navigate("/");
  }
  console.log(errors);
  return (
    <div className="max-sm:h-[130vh] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <section className="h-screen ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center mx-10">
          {/* <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <h1 className="max-sm:pt-10 font-semibold text-5xl max-sm:text-4xl text-white text-center">
              Welcome
            </h1>
            <p className="text-white text-center mt-5 tracking-widest">
              Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit.{" "}
            </p>
            <img
              src={forgetimg}
              className="w-[30rem]"
              alt="Sample image"
            />
          </div> */}
          <div className="wrapper shadow-2xl rounded-lg mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
                Reset password
              </h1>
              <div className="flex flex-row items-center justify-center">
                <p className="mb-0 text-base">
                  Please enter your new Password
                </p>
              </div>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
              <p className="text-red-600 ">{userError}</p>
              <label className="flex mb-2 text-start text-neutral-500">
                New Password
              </label>
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Enter new password"
                  {...register("newPassword", {})}
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-sm placeholder:font-thin placeholder:text-gray-500 motion-reduce:transition-none "
                />
              </div>

              <label className="flex mb-2 text-start text-neutral-500">
                Confirm password
              </label>
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Enter confirm password"
                  {...register("confirmPassword", {})}
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-sm placeholder:font-thin placeholder:text-gray-500 motion-reduce:transition-none "
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="p-2 px-8 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Reset
                </button>

                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
                <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                  Don't have an account ?
                  <Link to={"/signup"}>
                    <button className="ml-1 text-[16px] underline text-blue-700 transition duration-150 ease-in-out hover:text-indigo-600 focus:text-pink-600 active:text-blue-700">
                      Register
                    </button>
                  </Link>
                </p>
                <p className="mt-1 mb-0 pt-1 text-sm font-semibold">
                  Already have an account ?
                  <Link to={"/"}>
                    <button className="ml-1 text-[16px] underline text-blue-700 transition duration-150 ease-in-out hover:text-indigo-600 focus:text-pink-600 active:text-blue-700">
                      Login 
                    </button>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default resetPass;
