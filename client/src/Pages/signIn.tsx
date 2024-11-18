/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "../components/generalComponents/input/input";
import Button from "../components/generalComponents/button/button";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../Data/types";
import { logUser } from "../Data/data";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mutation = useMutation({
   mutationFn: (userData: loginUser) => logUser(userData),
   onSuccess: (data: any) => {
     console.log("Login successful", data);
 
     setSuccess("Login successful");
     setError("");
     
     const userRole = data.user.role;
     console.log("User role:", userRole);
 
     // Navigate based on the user role
     switch (userRole) {
       case "ADMIN":
         navigate("/AdminDashboard");
         break;
       case "RETAILER":
         navigate("/RetailerDashboard");
         break;
       case "SUPPLIER":
         navigate("/SupplierDashboard");
         break;
       default:
         setError("Invalid user role");
         break;
     }
   },
   onError: (error: any) => {
     console.error("Login failed", error);
     setError("Invalid email or password");
     setSuccess("");
   },
 });
 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    mutation.mutate({ email, password });
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
          <h1 className="text-[25px] text-[#000000] font-semibold leading-[45px] sm:leading-[70px] underline">
            Sign In
          </h1>
        </div>
        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <Input
            type="email"
            name="Email"
            onChange={(event: any) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            name="Password"
            onChange={(event: any) => setPassword(event.target.value)}
          />
          <h5
            className="mt-4 text-[#3B9DF8] underline cursor-pointer ml-52"
            onClick={() => navigate("/Forget")}
          >
            Forgot Password?
          </h5>
          <div className="mt-6 w-[100%] flex justify-center">
            <Button btnName="Sign In" type="submit" />
          </div>
        </form>
        <h5 className="mt-10">
          Don't Have an Account?{" "}
          <span
            className="text-[#3B9DF8] underline cursor-pointer"
            onClick={() => navigate("/SignUp")}
          >
            Sign Up
          </span>
        </h5>
      </div>
    </div>
  );
}
