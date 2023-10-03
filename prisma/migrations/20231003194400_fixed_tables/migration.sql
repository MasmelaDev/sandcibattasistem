/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `tables` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tables_position_key" ON "tables"("position");
