/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Button(props:any) {
   const {btnName,onClick}=props;
   return (
      <div className="mx-3 w-[80%]">
      <button
          className="w-full mx-auto py-2.5 px-6 text-center bg-[#3B9DF8] text-white my-5 rounded-md " onClick={onClick}>{btnName}
      </button>
  </div>
   )
}