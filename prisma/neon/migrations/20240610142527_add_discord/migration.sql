-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "discordRoles" TEXT[] DEFAULT ARRAY[]::TEXT[];
