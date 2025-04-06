'use client'
import React from "react";

const VerifyPopup = () => {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        
        <div className="flex justify-center">
          <div className="border-4 border-green-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
        <h2 className="mt-4 font-semibold text-lg text-center">Verifying Payment...</h2>
      </div>
    </div>
  );
};

export default VerifyPopup;