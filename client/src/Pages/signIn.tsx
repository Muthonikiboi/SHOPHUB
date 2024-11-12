/* eslint-disable @typescript-eslint/no-explicit-any */
import Label from "../components/generalComponents/input/input";
import Button from "../components/generalComponents/button/button";
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn(){
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
                     Sign In
                  </h1>
               </div>
               <div className="flex flex-col items-center w-full">
                  <Label type="email" name="Email" />
                  <Label type="password" name="Password" />
               </div>
               <h5 className=" mt-4 text-[#3B9DF8] underline cursor-pointer ml-52" onClick={() => navigate('/Forget')}>Forgot Password?
               </h5>
               <div className="mt-6 w-[100%] flex justify-center">
                  <Button btnName="Sign Up" />
               </div>
               <h5 className=" mt-10">Don't Have an Account  <span className="text-[#3B9DF8] underline cursor-pointer" onClick={() => navigate('/SignUp')}>Sign Up</span> 
                  </h5>
         </div>
      </div>
    );
};
