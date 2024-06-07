-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "public"."MonitorType" AS ENUM ('WEBSITE', 'SHELL');

-- CreateEnum
CREATE TYPE "public"."ActionType" AS ENUM ('CLICK', 'TYPE', 'WAIT');

-- CreateTable
CREATE TABLE "public"."WebsiteStep" (
    "id" SERIAL NOT NULL,
    "action" "public"."ActionType" NOT NULL,
    "target" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "monitorsId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Monitor" (
    "id" SERIAL NOT NULL,
    "type" "public"."MonitorType" NOT NULL,
    "url" TEXT,
    "commands" TEXT,
    "stdin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."WebsiteStep" ADD CONSTRAINT "WebsiteStep_monitorsId_fkey" FOREIGN KEY ("monitorsId") REFERENCES "public"."Monitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
