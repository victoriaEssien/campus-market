'use client'
import React from "react";
import { BiSolidError } from "react-icons/bi";

const ErrorPopUp = ({errorMessage, setShowErrorPopUp}) => {


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
       
        <div className="flex justify-center">
        <BiSolidError className="text-red-500 text-6xl" />
        </div>
        <h2 className="mt-4 font-semibold text-lg text-center">{errorMessage}</h2>

        <div className="mt-9">
          <button onClick={() => setShowErrorPopUp(false)} className="bg-primary-700 hover:bg-primary-800 mb-4 px-4 py-4 rounded-lg w-full font-os font-semibold text-[#FFF]">Okay</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;