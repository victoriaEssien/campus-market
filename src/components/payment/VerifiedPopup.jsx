'use client'
import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

const VerifiedPopup = () => {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        
        <div className="flex justify-center">
          <IoMdCheckmarkCircle className="text-green-700 text-6xl"/>
        </div>
        <h2 className="mt-4 font-semibold text-lg text-center">Payment Verified</h2>
      </div>
    </div>
  );
};

export default VerifiedPopup;