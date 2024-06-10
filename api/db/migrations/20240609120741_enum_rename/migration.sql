/*
  Warnings:

  - The values [WEBSITE,SHELL] on the enum `MonitorType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."MonitorType_new" AS ENUM ('CLI', 'WEB');
ALTER TABLE "public"."Monitor" ALTER COLUMN "type" TYPE "public"."MonitorType_new" USING ("type"::text::"public"."MonitorType_new");
ALTER TYPE "public"."MonitorType" RENAME TO "MonitorType_old";
ALTER TYPE "public"."MonitorType_new" RENAME TO "MonitorType";
DROP TYPE "public"."MonitorType_old";
COMMIT;
