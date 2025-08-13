/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `UserCart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `UserCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_userCartId_fkey";

-- DropIndex
DROP INDEX "public"."UserCart_userId_key";

-- AlterTable
ALTER TABLE "public"."UserCart" ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "public"."CartItem";

-- CreateIndex
CREATE UNIQUE INDEX "UserCart_userId_productId_key" ON "public"."UserCart"("userId", "productId");

-- AddForeignKey
ALTER TABLE "public"."UserCart" ADD CONSTRAINT "UserCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
