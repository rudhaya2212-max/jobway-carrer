-- =========================================================
-- JOB WAY AI - PostgreSQL / Supabase Core Database Schema
-- Version: 2.4.0
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Learner Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    target_career_id VARCHAR(100) NOT NULL,
    current_role VARCHAR(255),
    education VARCHAR(255),
    weekly_hours INTEGER DEFAULT 15,
    preferred_format VARCHAR(100) DEFAULT 'Interactive Coding',
    streak_days INTEGER DEFAULT 1,
    total_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Verified Skills Table (Grounded Evidence Model)
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL, -- Beginner, Intermediate, Advanced
    confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
    source VARCHAR(50) NOT NULL, -- resume, github, manual, assessment
    verified BOOLEAN DEFAULT FALSE,
    evidence TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Career Paths Catalog
CREATE TABLE IF NOT EXISTS career_paths (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    average_salary VARCHAR(100),
    demand_level VARCHAR(50),
    difficulty VARCHAR(50),
    estimated_months INTEGER,
    required_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Roadmaps & Milestone Progress
CREATE TABLE IF NOT EXISTS user_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    career_path_id VARCHAR(100) REFERENCES career_paths(id),
    current_stage INTEGER DEFAULT 1,
    completed_milestones TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 7-Day Gap Sprints
CREATE TABLE IF NOT EXISTS sprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    career_path_id VARCHAR(100) REFERENCES career_paths(id),
    target_company VARCHAR(255),
    days_data JSONB NOT NULL,
    completed_days INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Coding Attempts & Socratic Intervention Logs
CREATE TABLE IF NOT EXISTS coding_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    challenge_id VARCHAR(100) NOT NULL,
    language VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    passed BOOLEAN NOT NULL,
    output TEXT,
    consecutive_failures INTEGER DEFAULT 0,
    remedial_drill_taken BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Autonomous Agent Event Bus Ledger
CREATE TABLE IF NOT EXISTS agent_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    agent_name VARCHAR(255) NOT NULL,
    task VARCHAR(255) NOT NULL,
    activity TEXT NOT NULL,
    result VARCHAR(50) NOT NULL,
    handoff_to VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_profile ON skills(profile_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_profile ON user_roadmaps(profile_id);
CREATE INDEX IF NOT EXISTS idx_attempts_profile ON coding_attempts(profile_id);
CREATE INDEX IF NOT EXISTS idx_events_profile ON agent_events(profile_id);

