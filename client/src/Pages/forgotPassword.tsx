/* eslint-disable @typescript-eslint/no-explicit-any */
import Label from "../components/generalComponents/input/input";
import Button from "../components/generalComponents/button/button";
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';

export default function Forget(){
   const navigate = useNavigate();
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
                     Forgot Password
                  </h1>
               </div>
               <div className="flex flex-col items-center w-full">
                  <Label type="email" name="Email" />
               </div>
               <div className="mt-6 w-[100%] flex justify-center">
                  <Button btnName="Get Token" />
               </div>
               <h5 className=" mt-10">Get Back To  <span className="text-[#3B9DF8] underline cursor-pointer" onClick={() => navigate('/SignUp')}>Sign In</span> 
                  </h5>
         </div>
      </div>
    );
};
