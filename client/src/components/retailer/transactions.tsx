export default function TransactionRetailer(){
   return (
      <div
          className="boxShadow p-6 sm:px-8 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl w-[100%]">
          <img src="https://i.ibb.co/z8VbyRc/Charco-Mobile-Life.png" alt="empty/image"
               className="w-full sm:w-[200px]"/>

          <h1 className="text-[1.4rem] mt-6 font-[500] text-black">No transactions yet</h1>

          <p className="text-[0.9rem] text-gray-500"> Make Your First Transfer</p>
      </div>
  );
}