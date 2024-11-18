import React from "react";

const Card = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-md mx-auto">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-4">
         <div className="flex justify-center align-middle mb-3">
         <img
          src="https://img.freepik.com/free-photo/handsome-man-with-glasses_144627-18666.jpg?t=st=1722611499~exp=1722615099~hmac=cde3d70c79e64336ce0f8d5f88de5fabc9d64ba95983ff1f84b6d9dba91df349&w=360"
          alt="Profile Picture"
          className="w-16 h-16 rounded-full object-cover mb-1"
        />
              {/* Profile Name and Email */}
         <div className="text-center mb-2 ml-3">
         <h1 className="text-2xl font-semibold text-gray-800">Bruce Lee</h1>
         <p className="text-gray-500 text-sm">zaki.devv22@gmail.com</p>
         </div>

         </div>
        <button className="px-4 py-2 bg-[#e0e0e0] rounded-md text-sm mb-1">
          Update Profile Picture
        </button>
      </div>


      {/* Action Buttons */}
      <div className="flex justify-between w-[100%]">
        <button className="w-full py-2 bg-[#e0e0e0] rounded-md text-sm font-medium">
          Log Out
        </button>
        <button className="w-full py-2 bg-[#e0e0e0] ml-2 rounded-md text-sm font-medium ">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Card;
