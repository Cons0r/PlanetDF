-- CreateEnum
CREATE TYPE "Node" AS ENUM ('node1', 'node2', 'node3', 'node4', 'node5', 'node6', 'node7');

-- CreateTable
CREATE TABLE "Plot" (
    "id" BIGINT NOT NULL,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("id")
);
