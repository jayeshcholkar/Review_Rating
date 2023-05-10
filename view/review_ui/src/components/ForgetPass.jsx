import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function forgetPass({ open, setOpen }) {
  const [alert, setAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post(`http://localhost:9000/user/forgotpassword`, data)
      .then((response) => {
        console.log(response.data.success);
        setAlert(response.data.success);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(errors);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex items-center justify-center relative transform rounded-[1rem] bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white rounded-[1rem] px-6 pb-4 pt-5 sm:p-6 sm:pb-4 flex item center justify-center ">
                  <div className="flex justify-center items-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {alert === true ? (
                        <>
                          <div
                            className="flex p-4 mb-4 text-gray-800 border rounded-md border-green-300 bg-green-50 dark:text-gray-800 dark:bg-green-500/50 dark:border-green-800"
                            role="alert"
                          >
                            <FiAlertCircle className="flex-shrink-0 w-5 h-5" />

                            <div className="ml-3 text-sm font-medium">
                              We've emailed your password reset link
                              <a
                                onClick={() => {
                                  setOpen(false);
                                }}
                                target={"_blank"}
                                href="https://mail.google.com/"
                                className=" ml-1 font-semibold underline hover:no-underline"
                              >
                                Click here
                              </a>
                            </div>
                            <button
                              onClick={() => setAlert(false)}
                              type="button"
                              className="ml-auto -mx-1.5 -my-1.5 text-red-500 p-1.5 inline-flex h-8 w-8"
                              data-dismiss-target="#alert-border-3"
                              aria-label="Close"
                            >
                              <span className="sr-only">Dismiss</span>
                              <AiOutlineCloseCircle className="w-5 h-5" />
                            </button>
                          </div>
                        </>
                      ) : null}
                      <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
                        Forget Password
                      </h1>
                      <div className=" items-center justify-center w-96 max-sm:w-60">
                        <p className="mb-0 text-base text-center">
                          Please enter your Registered Email
                        </p>
                      </div>
                      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
                      <p className="text-red-600 "></p>
                      <label className="flex mb-2 text-start text-neutral-500">
                        Email
                      </label>
                      <div className="relative mb-3">
                        <input
                          type="text"
                          placeholder="Enter your email"
                          {...register("userEmail", {})}
                          className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-sm placeholder:font-thin placeholder:text-gray-500 motion-reduce:transition-none "
                        />
                      </div>
                      <button
                        type="submit"
                        className="p-2 px-8 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default forgetPass;
