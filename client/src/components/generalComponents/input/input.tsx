/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Input(props:any){
    const {name ,type ,onChange}=props;
   return(
      <>
        <label className="relative w-[80%] mb-10">
        <input type={type} onChange={onChange} name="name" className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
        />
        <span className=" absolute top-3.5 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
            {name}
        </span>
        </label>              
      </>
   )
}