
import React from "react";
import logo from "client/src/Assets/logo.png"

// react icons
import {IoLocationOutline} from "react-icons/io5";
import {MdOutlineEmail, MdOutlineLocalPhone} from "react-icons/md";

const ResponsiveFooter = () => {

    return (
        <footer className="bg-[#EBEBEB] boxShadow rounded-xl w-full p-6 sm:p-9">
         {/* <div className="px-8  pb-[5px] flex flex-col justify-center items-center text-center mt-8 h-[100vh]">
                     <h1 className="text-[50px] font-semibold">About<span className="text-[#3B9DF8] font-bold"> ShopHub</span> </h1>
         <div/> */}
         <div className="px-8  pb-[5px] flex flex-col justify-center items-center text-center mb-6">
            <h1 className="text-[50px] font-semibold"><span className="text-[#3B9DF8] font-bold">Contact</span> Us</h1>
         </div>
            <div
                className="flex justify-between gap-[30px] flex-col sm:flex-row flex-wrap w-full">
                <div className="w-full sm:w-[25%] ">
                    <img src={logo} alt="logo" 
                         className="w-[120px] mb-[5px]"/>
                    <div className="flex flex-col gap-[20px] text-primary">
                                            <span><a
                                                className="text-[0.9rem] flex items-center gap-[8px] cursor-pointer">
                                                <IoLocationOutline className="text-[1.2rem]"/>
                                                Dedan Kimathi , Nyeri , Kenya
                                            </a></span>
                        <span><a
                            className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                                                <MdOutlineEmail className="text-[1.1rem]"/>
                                                shophub2024@gmail.com
                                            </a></span>
                        <span><a
                            className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                                                <MdOutlineLocalPhone className="text-[1.1rem]"/>
                                                +254712345678
                                            </a></span>
                    </div>
                </div>

                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Navigation</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Home</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">About Us</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Our Services</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Testimonials</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Contact Us</p>
                    </div>
                </div>


                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Services</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Make Orders</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Invoices</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Transactions</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Products</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Notifications</p>
                    </div>
                </div>


                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Our Social Media</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Instagram</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Facebook</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Twitter</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">TikTok</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Behance</p>
                        <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Medium</p>
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Join a
                        Newsletter</h3>
                    <div className="flex gap-[2px] w-full sm:w-[40%] flex-col text-text relative">
                        <label className="text-[0.9rem]">Your Email</label>
                        <input type="email"
                               className="py-3 px-4 pr-[90px] w-full rounded-md border border-primary outline-none"
                               placeholder="Email address"/>

                        <button
                            className="px-4 h-[67%] rounded-r-md bg-primary text-white absolute top-[24px] right-0">Submit
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ResponsiveFooter;
                    