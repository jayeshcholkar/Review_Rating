import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate()
  const [userError, setUserError] = useState();
  const [user, setUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:9000/signup", data)
      .then((response) => {
        console.log(response.data.success);
        setUser(response.data.success);
      })
      .catch((error) => {
        console.log(error.response.data);
        setUserError(error.response.data.message);
      });
    console.log(data);
  };
  if(user === true){
    navigate('/hero')
  }
  console.log(errors);

  return (
    <div className="max-sm:h-[170vh] h-[140vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <section className="h-screen">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between mx-10">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <h1 className="max-sm:pt-10 font-semibold text-5xl max-sm:text-4xl text-white text-center">
              Welcome
            </h1>
            <p className="text-white text-center mt-5 tracking-widest">
              Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit.{" "}
            </p>
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="wrapper mt-20 shadow-2xl rounded-lg mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
                Sign Up
              </h1>
              <div className="flex flex-row items-center justify-center">
                <p className="mb-0 mr-4 text-base items-center">
                  Please enter your details for sign up
                </p>
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
              <p className="text-center text-red-600">
                {userError}
              </p>
              <div className="relative mb-6  mt-10" data-te-input-wrapper-init>
                <input
                  {...register("userName", {})}
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  // id="exampleFormControlInput2"
                  placeholder="Full Name"
                />
                <label
                  // for="exampleFormControlInput2"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[2.35rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[2.35rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                >
                  Full Name
                </label>
              </div>

              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  {...register("userEmail", { required: true, maxLength: 25 })}
                  type="email"
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  // id="exampleFormControlInput22"
                  placeholder="Email"
                />
                <label
                  for="exampleFormControlInput22"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[2.35rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                >
                  Email
                </label>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  {...register("userPassword", { required: true })}
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none
                    [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  // id="exampleFormControlInput22"
                  placeholder="Password"
                />
                <label
                  // for="exampleFormControlInput22"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[2.35rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                >
                  Password
                </label>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  {...register("phoneNum", {})}
                  type="tel"
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  // id="exampleFormControlInput22"
                  placeholder="Phone Number"
                />
                <label
                  // for="exampleFormControlInput22"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[2.35rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                >
                  Phone Number
                </label>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <select
                  {...register("userCity")}
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 text-neutral-500 h-11"
                  // id="exampleFormControlInput22"
                >
                  <option value="Indore">Indore</option>
                  <option value="Indore">Lucknow</option>
                  <option value="Indore">Bangalore</option>
                  <option value="Indore">Mumbai</option>
                  <option value="Indore">Dehli</option>
                </select>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <select
                  {...register("userState")}
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 text-neutral-500 h-11"
                  // id="exampleFormControlInput22"
                >
                  <option className="" value="Madhya Pradesh">
                    Madhya Pradesh
                  </option>
                  <option value="Madhya Pradesh">Uttar Pradesh</option>
                  <option value="Madhya Pradesh">Karnataka</option>
                  <option value="Madhya Pradesh">Maharashtra</option>
                  <option value="Madhya Pradesh">Dehli</option>
                </select>
              </div>

              <div className="mb-5 flex items-center justify-between">
                <div className="block min-h-[1rem] pl-[1.5rem]"></div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="p-2 px-8 rounded-md text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-pink-500"
                >
                  Sign Up
                </button>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
                <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                  Already have an account ?
                  <a
                    href="/"
                    className="ml-1 text-[16px] underline text-blue-700 transition duration-150 ease-in-out hover:text-indigo-600 focus:text-pink-600 active:text-blue-700"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
