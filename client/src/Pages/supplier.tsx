
import Card from "@/components/supplier/user"
import OrderSupplier from "@/components/supplier/orders";
import InvoiceSupplier from "@/components/supplier/invoices";
import TransactionSupplier from "@/components/supplier/transactions";
import ProductSupplier from "@/components/supplier/products";

export default function RetailerDashboard() {
   return (
     <div className="grid grid-cols-6 grid-rows-4 gap-4 p-4 h-[100vh]">
       {/* div1: column1 span 3 row1 span 2 */}
       <div className="col-span-3 row-span-2p-4">
       <h3>PRODUCTS</h3>
       <ProductSupplier />
       </div>
 
       {/* div2: column4 span 2 row1 span 4 */}
       <div className="col-start-4 col-span-2 row-span-4 p-4 overflow-y-scroll">
       <h3>TRANSACTIONS</h3>
       <TransactionSupplier />
       </div>
 
       {/* div3: column6 span 1 row1 span 3 */}
       <div className="col-start-6 col-span-1 row-span-3 bg-[#F3F4F6] p-4 overflow-y-scroll">
       <h3>INVOICES</h3>
       <InvoiceSupplier />
       <InvoiceSupplier />
       </div>
 
       {/* div4: column1 span 3 row3 span 2 */}
       <div className="col-span-3 row-start-3 row-span-2  p-4">
       <h3>ORDERS</h3>
       <OrderSupplier />
       </div>
 
       {/* div5: column6 span 1 row4 span 1 */}
       <div className="col-start-6 col-span-1 row-start-4 row-span-1 bg-[#F3F4F6] p-1">
         <Card />
       </div>
     </div>
   );
 }