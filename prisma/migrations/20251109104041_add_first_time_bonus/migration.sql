-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dateISO" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "imageUrl" TEXT,
    "recommendedMajors" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "priceGBP" REAL,
    "distanceBucket" TEXT NOT NULL,
    "isOppositeOfUserMajor" BOOLEAN NOT NULL DEFAULT false,
    "hasFirstTimeBonus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Event" ("city", "createdAt", "dateISO", "distanceBucket", "id", "imageUrl", "isOppositeOfUserMajor", "isPaid", "priceGBP", "recommendedMajors", "tags", "title", "updatedAt") SELECT "city", "createdAt", "dateISO", "distanceBucket", "id", "imageUrl", "isOppositeOfUserMajor", "isPaid", "priceGBP", "recommendedMajors", "tags", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
