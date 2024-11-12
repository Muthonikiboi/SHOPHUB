/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Label from "../components/generalComponents/input/input";
import Button from "../components/generalComponents/button/button";
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function SignUp(){
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();
    const handleRoleChange = (event:any) => {
        setRole(event.target.value);
    };

    return (
      <div className="flex justify-center items-center m-auto w-[100%] bg-[#EBEBEB] h-[100vh]">
         <div className="bg-white shadow-md rounded-md w-[35%] p-6 flex flex-col items-center">
               <div className="w-full flex justify-center mb-4">
                  <h1 className="text-[40px] sm:text-[60px] text-[#3B9DF8] font-semibold leading-[45px] sm:leading-[70px]">
                     SHOPHUB
                  </h1>
               </div>
               <div className="w-full flex justify-center mb-4">
                  <h1 className="text-[25px]  text-[#000000] font-semibold leading-[45px] sm:leading-[70px] underline">
                     Sign Up
                  </h1>
               </div>
               <div className="flex flex-col items-center w-full">
                  <Label type="text" name="Username" />
                  <Label type="email" name="Email" />
                  <Label type="password" name="Password" />
                  <Label type="password" name="Confirm Password" />

                  {/* Phone Number Input */}
                  <div className="relative w-[80%] mb-10">
                     <PhoneInput
                           country={'us'}
                           value={phone}
                           onChange={setPhone}
                           inputClass="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300 w-[100%]"
                           buttonClass="bg-white border-[#e5eaf2] focus:border-[#3B9DF8]"
                           dropdownClass="text-[#777777] focus:text-[#3B9DF8]"
                     />
                  </div>

                  {/* Role Selection */}
                  <div className="relative w-[80%] mb-10">
                     <select
                           id="role"
                           value={role}
                           onChange={handleRoleChange}
                           className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                     >
                           <option value="" disabled>Select Role</option>
                           <option value="retailer">Retailer</option>
                           <option value="supplier">Supplier</option>
                     </select>
                  </div>
               </div>

               <div className="mt-6 w-[100%] flex justify-center">
                  <Button btnName="Sign Up" />
               </div>
               <h5 className=" mt-10">Already Have an Account  <span className="text-[#3B9DF8] underline cursor-pointer" onClick={() => navigate('/SignIn')}>Sign In</span> 
               </h5>
         </div>
      </div>
    );
};
