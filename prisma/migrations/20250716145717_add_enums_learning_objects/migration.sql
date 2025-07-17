/*
  Warnings:

  - Added the required column `durationHours` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "durationHours" INTEGER NOT NULL,
ADD COLUMN     "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "autoQuizJson" JSONB,
ADD COLUMN     "learningObjectives" TEXT;
