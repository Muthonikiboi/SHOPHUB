/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import Input from "../components/generalComponents/input/input";
import Button from "../components/generalComponents/button/button";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Data/data';
import { User } from '../Data/types'; 
import PhoneInput from 'react-phone-input-2';
import { Toast } from 'primereact/toast';
import 'react-phone-input-2/lib/style.css';

export default function SignUp() {
  const [phoneNumber, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const handlePhoneChange = (value: string) => {
   console.log('Phone number changed:', value);  // Debugging: Check value
   setPhone(value);  // Explicitly setting the phone number state
 };

  // Mutation setup with proper typing
  const mutation = useMutation({
    mutationFn: (userData: User) => registerUser(userData), 
    onSuccess: (data: any) => {
      console.log("Registration successful", data);
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Registration successful!',
        life: 3000,
      });
      setError('');
      navigate('/SignIn'); // Redirect on success
    },
    onError: (error: any) => {
      console.log("Registration failed", error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Registration failed. Please try again.',
        life: 3000,
      });
      setSuccess('');
    },
  });

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match',
        life: 3000,
      });
      return;
    }
    setError("");
    setSuccess('');
    mutation.mutate({
      name,
      email,
      password,
      phoneNumber,
      contactInfo,
      confirmPassword,
      role,
    });
  };

  return (
    <div className="flex justify-center items-center m-auto w-[100%] bg-[#EBEBEB] h-[100vh]">
      <Toast ref={toast} />
      <div className="bg-white shadow-md rounded-md w-[35%] p-6 flex flex-col items-center">
        <div className="w-full flex justify-center mb-2">
          <h1 className="text-[40px] sm:text-[60px] text-[#3B9DF8] font-semibold leading-[45px] sm:leading-[70px]">
            SHOPHUB
          </h1>
        </div>
        <div className="w-full flex justify-center mb-2">
          <h1 className="text-[25px] text-[#000000] font-semibold leading-[45px] sm:leading-[70px] underline">
            Sign Up
          </h1>
        </div>
        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex flex-col items-center w-full">
          <Input type="text" name="Username" onChange={(event: any) => setName(event.target.value)} />
          <Input type="email" name="Email" onChange={(event: any) => setEmail(event.target.value)} />
          <Input type="password" name="Password" onChange={(event: any) => setPassword(event.target.value)} />
          <Input type="password" name="Confirm Password" onChange={(event: any) => setConfirmPassword(event.target.value)} />
          <Input type="text" name="Location" onChange={(event: any) => setContactInfo(event.target.value)} />

          {/* Phone Number Input */}
          <div className="relative w-[80%] mb-10">
            <PhoneInput
              country={'us'}
              value={phoneNumber}
              onChange={handlePhoneChange}
              inputClass="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300 w-[100%]"
              buttonClass="bg-white border-[#e5eaf2] focus:border-[#3B9DF8]"
              dropdownClass="text-[#777777] focus:text-[#3B9DF8]"
            />
          </div>

          {/* Role Selection */}
          <div className="relative w-[80%] mb-5">
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
            >
              <option value="" disabled>Select Role</option>
              <option value="RETAILER">Retailer</option>
              <option value="SUPPLIER">Supplier</option>
            </select>
          </div>
        </div>

        <div className="mt-6 w-[100%] flex justify-center">
          <Button btnName="Sign Up" onClick={handleSubmit} />
        </div>
        <h5 className=" mt-10">Already Have an Account?  <span className="text-[#3B9DF8] underline cursor-pointer" onClick={() => navigate('/SignIn')}>Sign In</span>
        </h5>
      </div>
    </div>
  );
}
