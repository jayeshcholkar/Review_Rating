import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router";

function AddReview({ open, setOpen, detailApiCall }) {
  const { id } = useParams();
  //   console.log(id);
  const token = localStorage.getItem("user");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post(`http://localhost:9000/review/create/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`, //the token is a variable which holds the token
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    await detailApiCall();
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
                      <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
                        Add Review
                      </h1>
                      <div className="flex flex-row items-center justify-center w-96 max-sm:w-60">
                        <p className="mb-0 mr-4 text-base">
                          Please enter your Review
                        </p>
                      </div>
                      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
                      <p className="text-red-600 "></p>
                      <label className="flex mb-2 text-start text-neutral-500">
                        Subject
                      </label>
                      <div className="relative mb-3">
                        <input
                          type="text"
                          placeholder="Enter..."
                          {...register("subject", {})}
                          className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-sm placeholder:font-thin placeholder:text-gray-500 motion-reduce:transition-none "
                        />
                      </div>
                      <label className="flex mb-2 text-start text-neutral-500">
                        Subject
                      </label>
                      <div className="relative mb-3">
                        <input
                          type="text"
                          placeholder="Enter..."
                          {...register("rating", {})}
                          className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-sm placeholder:font-thin placeholder:text-gray-500 motion-reduce:transition-none "
                        />
                      </div>
                      <div className="relative mb-3">
                        <label className="flex mb-2 text-start text-neutral-500">
                          Enter your Review
                        </label>
                        <textarea
                          style={{ overflow: "hidden" }}
                          spellCheck
                          placeholder="Description"
                          {...register("review", {})}
                          className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[1rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-sm placeholder:font-thin placeholder:text-gray-500 motion-reduce:transition-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setOpen(false);
                        }}
                        type="submit"
                        className="p-2 px-8 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Save
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
export default AddReview;
