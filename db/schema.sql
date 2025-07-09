-- 🚀 schema.sql - Master Dashboard DB for Mega Virtual School

-- 🧑‍🎓 Students
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  student_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100),
  dob DATE,
  gender VARCHAR(10),
  address TEXT,
  class_level VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 👨‍👩‍👧‍👦 Parents
CREATE TABLE parents (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT
);

-- 📝 Academic Records
CREATE TABLE academic_records (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  subject VARCHAR(50),
  week INT,
  score NUMERIC(5,2),
  assessment_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🎮 Psychomotor Logs
CREATE TABLE psychomotor_logs (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  game VARCHAR(50),
  skill_area VARCHAR(50),
  score INT,
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 💵 Fees & Financials
CREATE TABLE fees (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  amount NUMERIC(10,2),
  paid_on TIMESTAMP,
  status VARCHAR(20) DEFAULT 'due'
);

-- 🔒 Fee defaulters auto lockout rule
CREATE OR REPLACE FUNCTION lockout_defaulters()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'due' THEN
    UPDATE students SET status = 'locked' WHERE id = NEW.student_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lockout
AFTER INSERT OR UPDATE ON fees
FOR EACH ROW EXECUTE FUNCTION lockout_defaulters();

-- 📈 Marketing Analytics
CREATE TABLE marketing_logs (
  id SERIAL PRIMARY KEY,
  campaign VARCHAR(100),
  ctr NUMERIC(5,2),
  cpa NUMERIC(5,2),
  country VARCHAR(50),
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🛡 Audit Logs
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_action TEXT,
  table_affected VARCHAR(50),
  record_id INT,
  performed_by VARCHAR(50),
  performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ Enforce GDPR & secure auditing
-- Future optional: Mask family/medical in selects, log all CRUD.
-- =====================================================
-- 🚀 NEXUS ACADEMY VIRTUAL EDUCATION DATABASE SCHEMA
-- Diamond-grade scalable Postgres schema
-- Created: 2025-06
-- =====================================================

-- Drop tables if rerunning (for dev/test only!)
DROP TABLE IF EXISTS ai_learning_paths CASCADE;
DROP TABLE IF EXISTS progress_tracking CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS objectives CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('student', 'teacher', 'parent', 'admin')) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

-- =====================================================
-- SUBJECTS → TOPICS → LESSONS
-- =====================================================
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    thumbnail_url TEXT
);

CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    order_index INT,
    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFERENCES subjects(subject_id)
);

CREATE INDEX idx_topics_subject_id ON topics(subject_id);

CREATE TABLE lessons (
    lesson_id SERIAL PRIMARY KEY,
    topic_id INT NOT NULL REFERENCES topics(topic_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    lesson_content TEXT,
    vr_experience_link TEXT,
    ai_recommendation_tag VARCHAR(50),
    CONSTRAINT fk_topic FOREIGN KEY(topic_id) REFERENCES topics(topic_id)
);

CREATE INDEX idx_lessons_topic_id ON lessons(topic_id);

-- =====================================================
-- OBJECTIVES, ACTIVITIES, ASSESSMENTS
-- =====================================================
CREATE TABLE objectives (
    objective_id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL REFERENCES lessons(lesson_id) ON DELETE CASCADE,
    description TEXT
);

CREATE INDEX idx_objectives_lesson_id ON objectives(lesson_id);

CREATE TABLE activities (
    activity_id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL REFERENCES lessons(lesson_id) ON DELETE CASCADE,
    activity_type VARCHAR(50),
    resource_link TEXT
);

CREATE INDEX idx_activities_lesson_id ON activities(lesson_id);

CREATE TABLE assessments (
    assessment_id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL REFERENCES lessons(lesson_id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('formative', 'summative')),
    data JSONB
);

CREATE INDEX idx_assessments_lesson_id ON assessments(lesson_id);

-- =====================================================
-- PROGRESS TRACKING & AI LEARNING PATHS
-- =====================================================
CREATE TABLE progress_tracking (
    progress_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id INT NOT NULL REFERENCES lessons(lesson_id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('completed', 'in_progress')) NOT NULL,
    score DECIMAL(5,2),
    time_spent INT
);

CREATE INDEX idx_progress_student_id ON progress_tracking(student_id);
CREATE INDEX idx_progress_lesson_id ON progress_tracking(lesson_id);

CREATE TABLE ai_learning_paths (
    path_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    recommended_lessons JSONB
);

CREATE INDEX idx_ai_paths_student_id ON ai_learning_paths(student_id);

-- =====================================================
-- END OF SCHEMA
-- =====================================================