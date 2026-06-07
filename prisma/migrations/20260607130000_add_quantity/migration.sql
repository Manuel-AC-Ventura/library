-- AlterTable
ALTER TABLE "Book" DROP COLUMN "available",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
