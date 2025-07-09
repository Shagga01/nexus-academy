-- 🚀 SEED DATA FOR NEXUS ACADEMY FULL ECOSYSTEM
-- Load with:
-- psql -U postgres -d nexus_academy -f seed.sql

-- ============================================
-- USERS
-- ============================================
INSERT INTO students (student_code, name, dob, gender, address, class_level)
VALUES
('STU001', 'Alice Student', '2010-05-15', 'Female', '123 Virtual St', 'Grade 6');
INSERT INTO users (name, role, email, hashed_password) VALUES
('Alice Johnson', 'student', 'alice@student.com', 'hashed123'),
('Bob Smith', 'teacher', 'bob@teacher.com', 'hashed123'),
('Carol White', 'parent', 'carol@parent.com', 'hashed123'),
('Dave Admin', 'admin', 'dave@admin.com', 'hashed123');

-- ============================================
-- SUBJECTS
-- ============================================
INSERT INTO subjects (name, description, thumbnail_url) VALUES
('Mathematics', 'Complete math curriculum', 'https://cdn.com/math.png'),
('Science', 'Physics, Chemistry, Biology', 'https://cdn.com/science.png'),
('English', 'Language arts', 'https://cdn.com/english.png'),
('History', 'World and African history', 'https://cdn.com/history.png'),
('ICT', 'Programming & digital skills', 'https://cdn.com/ict.png');

-- ============================================
-- TOPICS
-- ============================================
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(1, 'Algebra', 'Variables & Equations', 1),
(1, 'Geometry', 'Shapes & Proofs', 2),
(2, 'Physics', 'Motion & Energy', 1),
(3, 'Literature', 'Poems & Prose', 1),
(5, 'Python Programming', 'Intro to Python', 1);

-- ============================================
-- LESSONS
-- ============================================
INSERT INTO lessons (topic_id, name, lesson_content, vr_experience_link, ai_recommendation_tag) VALUES
(1, 'Solving Equations', 'How to solve ax+b=c', 'https://vr.com/equations', 'math_101'),
(2, 'Triangle Types', 'Classifying triangles', 'https://vr.com/triangles', 'math_102'),
(3, 'Newton''s Laws', 'Force & motion basics', 'https://vr.com/newton', 'sci_101'),
(4, 'Poetic Devices', 'Metaphors & similes', 'https://vr.com/poetry', 'eng_101'),
(5, 'Hello World in Python', 'Basic Python script', 'https://vr.com/python', 'ict_101');

-- ============================================
-- OBJECTIVES
-- ============================================
INSERT INTO objectives (lesson_id, description) VALUES
(1, 'Understand solving for x'),
(2, 'Identify triangle types'),
(3, 'State Newton''s 3 laws'),
(4, 'Spot metaphors in poems'),
(5, 'Write your first Python script');

-- ============================================
-- ACTIVITIES
-- ============================================
INSERT INTO activities (lesson_id, activity_type, resource_link) VALUES
(1, 'quiz', 'https://quiz.com/equations'),
(2, 'game', 'https://game.com/triangles'),
(3, 'experiment', 'https://lab.com/newton'),
(4, 'reading', 'https://read.com/poetry'),
(5, 'code_task', 'https://code.com/hello-python');

-- ============================================
-- ASSESSMENTS
-- ============================================
INSERT INTO assessments (lesson_id, type, data) VALUES
(1, 'formative', '{"questions":5,"pass_mark":60}'),
(2, 'summative', '{"questions":10,"pass_mark":70}'),
(3, 'formative', '{"questions":4,"pass_mark":65}'),
(4, 'summative', '{"questions":6,"pass_mark":75}'),
(5, 'formative', '{"questions":3,"pass_mark":50}');

-- ============================================
-- PROGRESS TRACKING
-- ============================================
INSERT INTO progress_tracking (student_id, lesson_id, status, score, time_spent) VALUES
(1, 1, 'completed', 85, 30),
(1, 2, 'in_progress', 60, 20),
(1, 3, 'completed', 90, 25);

-- ============================================
-- AI LEARNING PATHS
-- ============================================
INSERT INTO ai_learning_paths (student_id, recommended_lessons) VALUES
(1, '[{"lesson_id":4,"priority":1},{"lesson_id":5,"priority":2}]');

-- ============================================
-- FEES & FINANCIALS
-- ============================================
INSERT INTO fees (student_id, amount, paid_on, status) VALUES
(1, 50000.00, '2025-06-15', 'paid'),
(1, 30000.00, NULL, 'due');

-- ============================================
-- MARKETING LOGS
-- ============================================
INSERT INTO marketing_logs (campaign, ctr, cpa, country) VALUES
('SummerBootcamp', 6.5, 210, 'Nigeria'),
('VRPromo', 4.2, 170, 'Kenya');

-- ============================================
-- AUDIT LOGS
-- ============================================
INSERT INTO audit_logs (user_action, table_affected, record_id, performed_by) VALUES
('INSERT', 'users', 1, 'admin'),
('UPDATE', 'fees', 1, 'admin');

-- ============================================
-- PSYCHOMOTOR LOGS
-- ============================================
INSERT INTO psychomotor_logs (student_id, game, skill_area, score) VALUES
(1, 'ShapeMatch', 'visual', 78),
(1, 'ReflexTap', 'reaction', 92);

-- ============================================
-- ACADEMIC RECORDS
-- ============================================
INSERT INTO academic_records (student_id, subject, week, score, assessment_type) VALUES
(1, 'Mathematics', 1, 88, 'quiz'),
(1, 'Science', 1, 91, 'test');

-- ============================================
-- PARENTS
-- ============================================
INSERT INTO parents (student_id, name, phone, email, address) VALUES
(1, 'Carol White', '08031234567', 'carol@parent.com', 'Lagos, Nigeria');