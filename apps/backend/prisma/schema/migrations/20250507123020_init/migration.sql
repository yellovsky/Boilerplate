-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "languages" (
    "code" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "workout_translations" (
    "workout_id" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "published_at" TIMESTAMP(3),
    "seo_description" TEXT,
    "seo_keywords" TEXT,
    "seo_title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workout_translations_workout_id_language_code_key" ON "workout_translations"("workout_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "workouts_slug_key" ON "workouts"("slug");

-- AddForeignKey
ALTER TABLE "workout_translations" ADD CONSTRAINT "workout_translations_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_translations" ADD CONSTRAINT "workout_translations_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "languages"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
