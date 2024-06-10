/*
  Warnings:

  - Added the required column `name` to the `Monitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Monitor" ADD COLUMN     "name" TEXT NOT NULL;
