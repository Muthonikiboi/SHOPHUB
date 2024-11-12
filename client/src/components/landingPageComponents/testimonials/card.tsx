
import React from "react";

// icons
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  return (
    <>
      <div className="w-[60%] p-4 bg-secondary shadow-2xl rounded-lg relative m-auto">
        <FaQuoteLeft className=" absolute -top-2 left-[5%] text-[1.3rem] text-[#727272]" />
        <img
          src="https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?size=626&ext=jpg&ga=GA1.1.71340048.1688965399&semt=sph"
          alt="demo/image"
          className="w-[100px] h-[100px] object-cover rounded-full absolute -top-10 left-1/2 transform -translate-x-1/2 border-4 border-primary"
        />
        <p className="text-text text-[0.9rem] mt-16">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae non,
          explicabo cum dolorem temporibus alias odio quod officiis nam. Debitis
          odio libero dolorum harum magnam inventore ut molestias rerum
          sapiente!
        </p>

        <div className="flex items-start mt-5 justify-between">
          <div>
            <h2 className="text-[1.2rem] font-[600]">Jhone Dehon</h2>
            <p className="text-[1rem] text-[#727272]">CEO of Miracle</p>
          </div>
        </div>
        <FaQuoteLeft className=" absolute -bottom-2 right-[5%] rotate-[180deg] text-[1.3rem] text-[#727272]" />
      </div>
    </>
  );
};

export default Testimonial;
              