-- AlterEnum
ALTER TYPE "ResourceType" ADD VALUE 'IMP_TOPIC';

-- CreateTable
CREATE TABLE "ContactUsResponse" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactUsResponse_pkey" PRIMARY KEY ("id")
);
