-- CreateTable
CREATE TABLE "academic_records" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "subject" VARCHAR(50),
    "week" INTEGER,
    "score" DECIMAL(5,2),
    "assessment_type" VARCHAR(20),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academic_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "activity_id" SERIAL NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "activity_type" VARCHAR(50),
    "resource_link" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "ai_learning_paths" (
    "path_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "recommended_lessons" JSONB,

    CONSTRAINT "ai_learning_paths_pkey" PRIMARY KEY ("path_id")
);

-- CreateTable
CREATE TABLE "assessments" (
    "assessment_id" SERIAL NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "type" VARCHAR(20),
    "data" JSONB,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("assessment_id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "user_action" TEXT,
    "table_affected" VARCHAR(50),
    "record_id" INTEGER,
    "performed_by" VARCHAR(50),
    "performed_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fees" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "amount" DECIMAL(10,2),
    "paid_on" TIMESTAMP(6),
    "status" VARCHAR(20) DEFAULT 'due',

    CONSTRAINT "fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "lesson_id" SERIAL NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "lesson_content" TEXT,
    "vr_experience_link" TEXT,
    "ai_recommendation_tag" VARCHAR(50),

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("lesson_id")
);

-- CreateTable
CREATE TABLE "marketing_logs" (
    "id" SERIAL NOT NULL,
    "campaign" VARCHAR(100),
    "ctr" DECIMAL(5,2),
    "cpa" DECIMAL(5,2),
    "country" VARCHAR(50),
    "logged_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marketing_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectives" (
    "objective_id" SERIAL NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "objectives_pkey" PRIMARY KEY ("objective_id")
);

-- CreateTable
CREATE TABLE "parents" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "name" VARCHAR(100),
    "phone" VARCHAR(20),
    "email" VARCHAR(100),
    "address" TEXT,

    CONSTRAINT "parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_tracking" (
    "progress_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "score" DECIMAL(5,2),
    "time_spent" INTEGER,

    CONSTRAINT "progress_tracking_pkey" PRIMARY KEY ("progress_id")
);

-- CreateTable
CREATE TABLE "psychomotor_logs" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "game" VARCHAR(50),
    "skill_area" VARCHAR(50),
    "score" INTEGER,
    "played_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "psychomotor_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "student_code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100),
    "dob" DATE,
    "gender" VARCHAR(10),
    "address" TEXT,
    "class_level" VARCHAR(20),
    "status" VARCHAR(20) DEFAULT 'active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "subject_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "thumbnail_url" TEXT,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "topics" (
    "topic_id" SERIAL NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "hashed_password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "idx_activities_lesson_id" ON "activities"("lesson_id");

-- CreateIndex
CREATE INDEX "idx_ai_paths_student_id" ON "ai_learning_paths"("student_id");

-- CreateIndex
CREATE INDEX "idx_assessments_lesson_id" ON "assessments"("lesson_id");

-- CreateIndex
CREATE INDEX "idx_lessons_topic_id" ON "lessons"("topic_id");

-- CreateIndex
CREATE INDEX "idx_objectives_lesson_id" ON "objectives"("lesson_id");

-- CreateIndex
CREATE INDEX "idx_progress_lesson_id" ON "progress_tracking"("lesson_id");

-- CreateIndex
CREATE INDEX "idx_progress_student_id" ON "progress_tracking"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_student_code_key" ON "students"("student_code");

-- CreateIndex
CREATE INDEX "idx_topics_subject_id" ON "topics"("subject_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "academic_records" ADD CONSTRAINT "academic_records_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("lesson_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ai_learning_paths" ADD CONSTRAINT "ai_learning_paths_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("lesson_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fees" ADD CONSTRAINT "fees_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "fk_topic" FOREIGN KEY ("topic_id") REFERENCES "topics"("topic_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "objectives" ADD CONSTRAINT "objectives_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("lesson_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progress_tracking" ADD CONSTRAINT "progress_tracking_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("lesson_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progress_tracking" ADD CONSTRAINT "progress_tracking_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "psychomotor_logs" ADD CONSTRAINT "psychomotor_logs_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "fk_subject" FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

