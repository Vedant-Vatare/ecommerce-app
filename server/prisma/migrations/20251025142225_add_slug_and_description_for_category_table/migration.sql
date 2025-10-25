/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
*/

-- Step 1: Add column as nullable first
ALTER TABLE "Category" 
ADD COLUMN "description" TEXT,
ADD COLUMN "image" TEXT,
ADD COLUMN "slug" TEXT;

-- Step 2: Generate slug values for existing categories
UPDATE "Category"
SET "slug" = lower(replace("name", ' ', '-'))
WHERE "slug" IS NULL;

-- Step 3: Make slug required
ALTER TABLE "Category" 
ALTER COLUMN "slug" SET NOT NULL;

-- Step 4: Create unique index on slug
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
