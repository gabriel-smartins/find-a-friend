-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "adopted_at" TIMESTAMP(3),
ALTER COLUMN "description" DROP NOT NULL;
