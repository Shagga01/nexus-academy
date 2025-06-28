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