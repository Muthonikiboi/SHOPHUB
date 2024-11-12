/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ButtonLanding(props:any) {
   const {btnName,onClick}=props;
   return (
      <div className="mx-3 w-[80%]">
      <button
          className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden" onClick={onClick}>{btnName}
      </button>
  </div>
   )
}