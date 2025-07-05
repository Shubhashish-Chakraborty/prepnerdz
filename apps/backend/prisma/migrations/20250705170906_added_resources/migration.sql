-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ResourceType" ADD VALUE 'SHIVANI_BOOKS';
ALTER TYPE "ResourceType" ADD VALUE 'IMP_QUESTION';
ALTER TYPE "ResourceType" ADD VALUE 'LAB_MANUAL';
ALTER TYPE "ResourceType" ADD VALUE 'SYLLABUS';
