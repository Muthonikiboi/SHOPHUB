-- CreateTable
CREATE TABLE "_SupplierProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RetailerOrders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SupplierProducts_AB_unique" ON "_SupplierProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_SupplierProducts_B_index" ON "_SupplierProducts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RetailerOrders_AB_unique" ON "_RetailerOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_RetailerOrders_B_index" ON "_RetailerOrders"("B");

-- AddForeignKey
ALTER TABLE "_SupplierProducts" ADD CONSTRAINT "_SupplierProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierProducts" ADD CONSTRAINT "_SupplierProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailerOrders" ADD CONSTRAINT "_RetailerOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailerOrders" ADD CONSTRAINT "_RetailerOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Retailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
