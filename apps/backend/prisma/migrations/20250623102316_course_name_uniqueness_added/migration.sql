/*
  Warnings:

  - A unique constraint covering the columns `[courseName]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_courseName_key" ON "Course"("courseName");
