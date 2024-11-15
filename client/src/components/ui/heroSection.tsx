
// import React from "react"; 
import { SiShopee } from "react-icons/si";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
// import NumScrollDemo from "../landingPageComponents/testimonials/carousel"
import Testimonial from "../landingPageComponents/testimonials/card";
import image from "./../../Assets/landingImg1.svg";
import bgImage from "./../../Assets/delivery2.svg";
import "./../../App.css";
import { useEffect, useState } from "react";

const HeroSection: React.FC = () => {
   const [blurPosition, setBlurPosition] = useState({ x: 80, y: 80 });

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         setBlurPosition({
            x: e.clientX - 50,
            y: e.clientY + window.scrollY - 50, 
         });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
   }, []);

    return (
        <div className="w-full bg-[#fff] rounded-md relative">
            <header
               //  className="h-screen flex lg:flex-row flex-col items-center m-auto lg:gap-0 justify-between px-8"
               className="flex flex-column items-center"
                >

               <div className="w-full h-[92vh] lg:w-[45%] flex flex-col justify-center items-start pl-40">
               <p className="text-[30px] mb-10">Hi there!</p>
               <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px] mb-10">
                  <span className="text-[#3B9DF8]">SHOPHUB</span> is here to be your assistance
               </h1>
               <p className="mt-2 text-[2rem]">Buy Products. Build Your Business. Grow Together.</p>
               </div>

               <div className="w-full lg:w-[55%] h-[92vh] opacity-0 animate-slide-in-right">
                    <img src={image} alt="image" className="h-[97vh] w-[90%]"/>
                </div>
            </header>

            <section className="px-8  pb-[5px] flex flex-col justify-center items-center text-center mt-8 h-[100vh]">
            <h1 className="text-[50px] font-semibold">About<span className="text-[#3B9DF8] font-bold"> ShopHub</span> </h1>
            <div className="px-8 flex flex-row justify-center items-center text-center mx-auto max-w-full" >
               <div className="px-8 pb-[30px] flex flex-col justify-center items-center text-center h-[60vh]  w-full lg:w-[85%]">
                  <p className="mt-1 text-[1.25rem] leading-relaxed"> Welcome to ShopHub, your reliable partner in streamlining the retailer-supplier relationship.<br/>At ShopHub, we empower retailers by simplifying the process of buying goods directly from suppliers. Our platform provides a seamless experience for managing transactions, handling invoices, and keeping track of inventory and product quantities.
                  With real-time notifications, ShopHub ensures you stay updated on every order and transaction, making it easier than ever to monitor stock levels and restock when necessary. Our intuitive interface enables you to view, record, and analyze transaction data, helping you make informed business decisions to grow your business effectively.

                  Whether you're a small retailer or a large business, ShopHub offers tools designed to enhance your operations, improve efficiency, and build stronger connections with suppliers. Join us on ShopHub and take control of your business transactions with ease and confidence.

                  </p>
               </div>
            </div>
            </section>

            <div 
               className="px-8 pb-[5px] flex flex-col justify-center items-center text-center w-[100%] h-[92vh] bg-cover bg-center relative overflow-hidden"
               style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
               >
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

               <h1 className="text-[50px] font-semibold text-white relative z-10">
                  Our <span className="text-[#3B9DF8] font-bold">Services</span>
               </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-40 w-[90%] mx-auto relative z-10">
                <div className="shadow-2xl rounded-2xl flex flex-col justify-center items-center text-center p-4 bg-white">
                     <SiShopee className="w-[30px] h-[30px]" />
                     <h4 className="text-[1.1rem] mt-3">Make Orders</h4>
                     <p className="text-[0.9rem] text-gray-500 mt-1">
                        Easily place orders with suppliers to keep your inventory stocked and your business running smoothly.
                     </p>
                  </div>

                  <div className="shadow-2xl rounded-2xl flex flex-col justify-center items-center text-center p-4 bg-white">
                     <FaFileInvoiceDollar className="w-[30px] h-[30px]" />
                     <h4 className="text-[1.1rem] mt-3">Invoices</h4>
                     <p className="text-[0.9rem] text-gray-500 mt-1">
                        Access, manage, and track all your invoices in one place to streamline your billing processes.
                     </p>
                  </div>

                  <div className="shadow-2xl rounded-2xl flex flex-col justify-center items-center text-center p-4 bg-white">
                     <FaMoneyBill1Wave className="w-[30px] h-[30px]" />
                     <h4 className="text-[1.1rem] mt-3">Transactions</h4>
                     <p className="text-[0.9rem] text-gray-500 mt-1">
                        View and monitor all transaction history to keep track of payments and revenue effortlessly.
                     </p>
                  </div>

                  <div className="shadow-2xl rounded-2xl flex flex-col justify-center items-center text-center p-4 bg-white">
                     <FaProductHunt className="w-[30px] h-[30px]" />
                     <h4 className="text-[1.1rem] mt-3">Products</h4>
                     <p className="text-[0.9rem] text-gray-500 mt-1">
                        Keep an organized record of all products in your inventory to manage stock effectively.
                     </p>
                  </div>

                  <div className="shadow-2xl rounded-2xl flex flex-col justify-center items-center text-center p-4 bg-white">
                     <MdNotificationsActive className="w-[30px] h-[30px]" />
                     <h4 className="text-[1.1rem] mt-3">Notifications</h4>
                     <p className="text-[0.9rem] text-gray-500 mt-1">
                        Receive timely notifications about order updates, inventory status, and important events.
                     </p>
                  </div>
                </div>
            </div>

            <div className="px-8 pb-[5px] flex flex-col justify-center items-center text-center w-[100%] my-10 m-auto h-[92vh]">
            <h1 className="text-[50px] text-[#3B9DF8] font-bold">Testimonials</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] mt-40  w-[90%] justify-center">
               {/* <NumScrollDemo/> */}
               <Testimonial/>
               <Testimonial/>
               <Testimonial/>
               <Testimonial/>
            </div>
            </div>


            <div
            className="w-[100px] h-[100px] bg-[#3B9DF8] blur-[90px] absolute"
            style={{
               top: `${blurPosition.y}px`,
               left: `${blurPosition.x}px`,
               pointerEvents: "none", 
            }}
         ></div>
        </div>
    );
};

export default HeroSection;
                    