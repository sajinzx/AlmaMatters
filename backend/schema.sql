-- ========================================================================
-- AlmaMatters PostgreSQL / Supabase Database Schema
-- Compatible with PostgreSQL 14+ / Supabase
-- ========================================================================

-- Enable extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clean up existing tables and functions (Safe Reset)
DROP TABLE IF EXISTS community_messages CASCADE;
DROP TABLE IF EXISTS community_members CASCADE;
DROP TABLE IF EXISTS communities CASCADE;
DROP TABLE IF EXISTS comment_likes CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS message_conversations CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS session_applications CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS user_followers CASCADE;
DROP TABLE IF EXISTS post_shares CASCADE;
DROP TABLE IF EXISTS post_comments CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS admin_login_accounts CASCADE;
DROP TABLE IF EXISTS admin_address_details CASCADE;
DROP TABLE IF EXISTS admin_contact_details CASCADE;
DROP TABLE IF EXISTS admin_personal_details CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS alumni_address_details CASCADE;
DROP TABLE IF EXISTS alumni_academic_details CASCADE;
DROP TABLE IF EXISTS alumni_higher_studies_details CASCADE;
DROP TABLE IF EXISTS alumni_login_accounts CASCADE;
DROP TABLE IF EXISTS alumni_professional_details CASCADE;
DROP TABLE IF EXISTS alumni_personal_details CASCADE;
DROP TABLE IF EXISTS alumni CASCADE;
DROP TABLE IF EXISTS student_login_accounts CASCADE;
DROP TABLE IF EXISTS student_academic_details CASCADE;
DROP TABLE IF EXISTS student_areas_of_interest CASCADE;
DROP TABLE IF EXISTS student_address_details CASCADE;
DROP TABLE IF EXISTS student_contact_details CASCADE;
DROP TABLE IF EXISTS student_personal_details CASCADE;
DROP TABLE IF EXISTS students CASCADE;

-- ========================================================================
-- HELPER FUNCTIONS
-- ========================================================================

-- Function to automatically set updated_at column on row update
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ========================================================================
-- 1. STUDENTS
-- ========================================================================
CREATE TABLE students (
    student_id BIGSERIAL PRIMARY KEY,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_students
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE student_personal_details (
    student_id BIGINT PRIMARY KEY REFERENCES students(student_id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    full_name VARCHAR(200),
    date_of_birth DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(5),
    nationality VARCHAR(50),
    religion VARCHAR(50),
    aadhaar_number VARCHAR(20),
    passport_number VARCHAR(20),
    profile_photo_url TEXT
);

CREATE TABLE student_contact_details (
    student_id BIGINT PRIMARY KEY REFERENCES students(student_id) ON DELETE CASCADE,
    email VARCHAR(150),
    phone_number VARCHAR(15),
    alternate_phone_number VARCHAR(15)
);

CREATE TABLE student_address_details (
    student_id BIGINT PRIMARY KEY REFERENCES students(student_id) ON DELETE CASCADE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100)
);

CREATE TABLE student_areas_of_interest (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    area_of_interest VARCHAR(100) NOT NULL
);

CREATE TABLE student_academic_details (
    student_id BIGINT PRIMARY KEY REFERENCES students(student_id) ON DELETE CASCADE,
    batch_year INTEGER,
    admission_date DATE,
    expected_graduation_date DATE,
    current_year INT,
    current_semester INT,
    section VARCHAR(10),
    academic_status VARCHAR(50)
);

CREATE TABLE student_login_accounts (
    student_id BIGINT PRIMARY KEY REFERENCES students(student_id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE,
    account_status VARCHAR(50) DEFAULT 'ACTIVE'
);


-- ========================================================================
-- 2. ALUMNI
-- ========================================================================
CREATE TABLE alumni (
    alumni_id BIGSERIAL PRIMARY KEY,
    student_id BIGINT UNIQUE NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    graduation_year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_alumni
BEFORE UPDATE ON alumni
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE alumni_personal_details (
    alumni_id BIGINT PRIMARY KEY REFERENCES alumni(alumni_id) ON DELETE CASCADE,
    linkedin_url TEXT,
    current_city VARCHAR(100)
);

CREATE TABLE alumni_professional_details (
    alumni_id BIGINT PRIMARY KEY REFERENCES alumni(alumni_id) ON DELETE CASCADE,
    company_name VARCHAR(150),
    job_title VARCHAR(150),
    industry VARCHAR(150),
    years_of_experience DECIMAL(4,1)
);

CREATE TABLE alumni_login_accounts (
    alumni_id BIGINT PRIMARY KEY REFERENCES alumni(alumni_id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE,
    password_hash TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    account_status VARCHAR(50) DEFAULT 'ACTIVE'
);

CREATE TABLE alumni_higher_studies_details (
    alumni_id BIGINT PRIMARY KEY REFERENCES alumni(alumni_id) ON DELETE CASCADE,
    university_name VARCHAR(150),
    degree VARCHAR(150),
    field_of_study VARCHAR(150),
    country VARCHAR(100),
    start_year INTEGER,
    end_year INTEGER
);

CREATE TABLE alumni_academic_details (
    alumni_id BIGINT PRIMARY KEY REFERENCES alumni(alumni_id) ON DELETE CASCADE,
    department VARCHAR(150),
    program VARCHAR(100),
    course VARCHAR(150),
    batch_year INTEGER,
    graduation_year INTEGER,
    cgpa DECIMAL(4,2),
    class_obtained VARCHAR(50)
);

CREATE TABLE alumni_address_details (
    alumni_id BIGINT PRIMARY KEY REFERENCES alumni(alumni_id) ON DELETE CASCADE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100)
);


-- ========================================================================
-- 3. ADMINS
-- ========================================================================
CREATE TABLE admins (
    admin_id BIGSERIAL PRIMARY KEY,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_admins
BEFORE UPDATE ON admins
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE admin_personal_details (
    admin_id BIGINT PRIMARY KEY REFERENCES admins(admin_id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    full_name VARCHAR(200),
    date_of_birth DATE,
    gender VARCHAR(10),
    profile_photo_url TEXT
);

CREATE TABLE admin_contact_details (
    admin_id BIGINT PRIMARY KEY REFERENCES admins(admin_id) ON DELETE CASCADE,
    email VARCHAR(150),
    phone_number VARCHAR(15),
    alternate_phone_number VARCHAR(15)
);

CREATE TABLE admin_address_details (
    admin_id BIGINT PRIMARY KEY REFERENCES admins(admin_id) ON DELETE CASCADE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100)
);

CREATE TABLE admin_login_accounts (
    admin_id BIGINT PRIMARY KEY REFERENCES admins(admin_id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE,
    account_status VARCHAR(50) DEFAULT 'ACTIVE'
);


-- ========================================================================
-- 4. POSTS & SOCIAL FEED
-- ========================================================================
CREATE TABLE posts (
    post_id BIGSERIAL PRIMARY KEY,
    poster_type VARCHAR(20) NOT NULL CHECK (poster_type IN ('student', 'alumni', 'admin')),
    poster_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    media_url TEXT,
    like_count INTEGER DEFAULT 0 CHECK (like_count >= 0),
    comment_count INTEGER DEFAULT 0 CHECK (comment_count >= 0),
    share_count INTEGER DEFAULT 0 CHECK (share_count >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_posts
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE INDEX idx_posts_created_at ON posts (created_at DESC);

CREATE TABLE post_likes (
    like_id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    liker_type VARCHAR(20) NOT NULL CHECK (liker_type IN ('student', 'alumni', 'admin')),
    liker_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_post_like UNIQUE (post_id, liker_type, liker_id)
);

CREATE TABLE post_comments (
    comment_id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    parent_comment_id BIGINT DEFAULT NULL REFERENCES post_comments(comment_id) ON DELETE CASCADE,
    commenter_type VARCHAR(20) NOT NULL CHECK (commenter_type IN ('student', 'alumni', 'admin')),
    commenter_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_post_comments
BEFORE UPDATE ON post_comments
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE INDEX idx_comments_post_id ON post_comments (post_id);

CREATE TABLE post_shares (
    share_id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    sharer_type VARCHAR(20) NOT NULL CHECK (sharer_type IN ('student', 'alumni', 'admin')),
    sharer_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comment_likes (
    like_id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT NOT NULL REFERENCES post_comments(comment_id) ON DELETE CASCADE,
    liker_type VARCHAR(20) NOT NULL CHECK (liker_type IN ('student', 'alumni', 'admin')),
    liker_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_comment_like UNIQUE (comment_id, liker_type, liker_id)
);


-- ========================================================================
-- POST METRICS TRIGGERS (Automated Counts)
-- ========================================================================
CREATE OR REPLACE FUNCTION trg_fn_post_like_insert()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET like_count = like_count + 1 WHERE post_id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_fn_post_like_delete()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET like_count = GREATEST(like_count - 1, 0) WHERE post_id = OLD.post_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_like_insert
AFTER INSERT ON post_likes
FOR EACH ROW
EXECUTE FUNCTION trg_fn_post_like_insert();

CREATE TRIGGER trg_like_delete
AFTER DELETE ON post_likes
FOR EACH ROW
EXECUTE FUNCTION trg_fn_post_like_delete();


CREATE OR REPLACE FUNCTION trg_fn_post_comment_insert()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET comment_count = comment_count + 1 WHERE post_id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_fn_post_comment_delete()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET comment_count = GREATEST(comment_count - 1, 0) WHERE post_id = OLD.post_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_comment_insert
AFTER INSERT ON post_comments
FOR EACH ROW
EXECUTE FUNCTION trg_fn_post_comment_insert();

CREATE TRIGGER trg_comment_delete
AFTER DELETE ON post_comments
FOR EACH ROW
EXECUTE FUNCTION trg_fn_post_comment_delete();


CREATE OR REPLACE FUNCTION trg_fn_post_share_insert()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET share_count = share_count + 1 WHERE post_id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_fn_post_share_delete()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET share_count = GREATEST(share_count - 1, 0) WHERE post_id = OLD.post_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_share_insert
AFTER INSERT ON post_shares
FOR EACH ROW
EXECUTE FUNCTION trg_fn_post_share_insert();

CREATE TRIGGER trg_share_delete
AFTER DELETE ON post_shares
FOR EACH ROW
EXECUTE FUNCTION trg_fn_post_share_delete();


-- ========================================================================
-- 5. FOLLOWERS & NETWORK
-- ========================================================================
CREATE TABLE user_followers (
    follower_type VARCHAR(20) NOT NULL CHECK (follower_type IN ('student', 'alumni', 'admin')),
    follower_id BIGINT NOT NULL,
    following_type VARCHAR(20) NOT NULL CHECK (following_type IN ('student', 'alumni', 'admin')),
    following_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_type, follower_id, following_type, following_id)
);


-- ========================================================================
-- 6. JOBS & INTERNSHIPS
-- ========================================================================
CREATE TABLE jobs (
    job_id BIGSERIAL PRIMARY KEY,
    alumni_id BIGINT NOT NULL REFERENCES alumni(alumni_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT,
    stipend_salary VARCHAR(100),
    expectations TEXT,
    qualification VARCHAR(255),
    application_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_jobs
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE INDEX idx_jobs_deadline ON jobs (application_deadline);

CREATE TABLE job_applications (
    application_id BIGSERIAL PRIMARY KEY,
    job_id BIGINT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
    applicant_type VARCHAR(20) NOT NULL CHECK (applicant_type IN ('student', 'alumni')),
    applicant_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_job_application UNIQUE (job_id, applicant_type, applicant_id)
);


-- ========================================================================
-- 7. MENTORSHIP SESSIONS
-- ========================================================================
CREATE TABLE sessions (
    session_id BIGSERIAL PRIMARY KEY,
    requester_type VARCHAR(20) NOT NULL CHECK (requester_type IN ('student', 'alumni')),
    requester_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    approved_by_admin_id BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_sessions
BEFORE UPDATE ON sessions
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE INDEX idx_sessions_status_scheduled ON sessions (status, scheduled_at);

CREATE TABLE session_applications (
    application_id BIGSERIAL PRIMARY KEY,
    session_id BIGINT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
    applicant_type VARCHAR(20) NOT NULL CHECK (applicant_type IN ('student', 'alumni')),
    applicant_id BIGINT NOT NULL,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_session_applicant UNIQUE (session_id, applicant_type, applicant_id)
);


-- ========================================================================
-- 8. NOTIFICATIONS
-- ========================================================================
CREATE TABLE notifications (
    notification_id BIGSERIAL PRIMARY KEY,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('student', 'alumni', 'admin')),
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications (user_type, user_id, is_read);


-- ========================================================================
-- 9. DIRECT MESSAGING
-- ========================================================================
CREATE TABLE message_conversations (
    conversation_id BIGSERIAL PRIMARY KEY,
    user1_type VARCHAR(20) NOT NULL CHECK (user1_type IN ('student', 'alumni')),
    user1_id BIGINT NOT NULL,
    user2_type VARCHAR(20) NOT NULL CHECK (user2_type IN ('student', 'alumni')),
    user2_id BIGINT NOT NULL,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_conversation UNIQUE (user1_type, user1_id, user2_type, user2_id)
);

CREATE TABLE messages (
    message_id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT NOT NULL REFERENCES message_conversations(conversation_id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('student', 'alumni')),
    sender_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversation_created ON messages (conversation_id, created_at);


-- ========================================================================
-- 10. COMMUNITIES
-- ========================================================================
CREATE TABLE communities (
    community_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_type VARCHAR(20) NOT NULL CHECK (owner_type IN ('student', 'alumni', 'admin')),
    owner_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp_communities
BEFORE UPDATE ON communities
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE INDEX idx_communities_owner ON communities (owner_type, owner_id);

CREATE TABLE community_members (
    membership_id BIGSERIAL PRIMARY KEY,
    community_id BIGINT NOT NULL REFERENCES communities(community_id) ON DELETE CASCADE,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('student', 'alumni', 'admin')),
    user_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_community_member UNIQUE (community_id, user_type, user_id)
);

CREATE TRIGGER set_timestamp_community_members
BEFORE UPDATE ON community_members
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE community_messages (
    message_id BIGSERIAL PRIMARY KEY,
    community_id BIGINT NOT NULL REFERENCES communities(community_id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('student', 'alumni', 'admin')),
    sender_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_community_messages_created ON community_messages (community_id, created_at ASC);
