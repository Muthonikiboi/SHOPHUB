import { invoiceData } from "./invoicedata"; 

export default function InvoiceRetailer() {
   const totalAmount = invoiceData.items.reduce((acc, item) => acc + item.qty * item.rate, 0).toFixed(2);
 
   return (
     <div className="rounded-lg border shadow-md bg-white p-6 w-[100%] mb-4">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">{`Invoice #${invoiceData.invoice_no}`}</h2>
         <span className="text-sm text-gray-500">{`Due: ${invoiceData.due_date}`}</span>
       </div>
 
       <div className="mb-4">
         <p className="text-gray-600">{`Supplier: ${invoiceData.supplier}`}</p>
         <p className="text-gray-600">{`PhoneNumber: ${invoiceData.phone}`}</p>
       </div>
 
       <div className="mt-4 flex align-middle justify-between">
         <p className="text-gray-600 font-bold">Total Amount: Ksh {totalAmount}</p>
         <button
            className="px-2 lg:px-4 text-[0.8rem] lg:text-[1.1rem] lg:py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-600">Make Payment
        </button>
       </div>
     </div>
   );
}

            