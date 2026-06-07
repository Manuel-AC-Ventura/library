-- AlterTable
ALTER TABLE "Client" ADD COLUMN "studentId" TEXT NOT NULL DEFAULT 'TEMP0000';
ALTER TABLE "Client" ALTER COLUMN "studentId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Client_studentId_key" ON "Client"("studentId");
