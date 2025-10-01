-- FIX RLS Policies for Bakım Pusulası
-- Run this in Supabase SQL Editor

-- ============================================
-- TEMPORARY FIX: Disable RLS for Testing
-- ============================================
-- Uncomment below if you want to quickly test without RLS
-- WARNING: Only for development/testing!
/*
ALTER TABLE caregiver_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE patient_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE zarit_assessments DISABLE ROW LEVEL SECURITY;
ALTER TABLE research_analytics DISABLE ROW LEVEL SECURITY;
*/

-- ============================================
-- PROPER FIX: Update RLS Policies
-- ============================================

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous insert" ON caregiver_profiles;
DROP POLICY IF EXISTS "Allow anonymous insert" ON patient_info;
DROP POLICY IF EXISTS "Allow anonymous insert" ON zarit_assessments;
DROP POLICY IF EXISTS "Allow anonymous insert" ON research_analytics;

DROP POLICY IF EXISTS "Users can read own data" ON caregiver_profiles;
DROP POLICY IF EXISTS "Authenticated can read all" ON caregiver_profiles;
DROP POLICY IF EXISTS "Authenticated can read all" ON patient_info;
DROP POLICY IF EXISTS "Authenticated can read all" ON zarit_assessments;
DROP POLICY IF EXISTS "Authenticated can read all" ON research_analytics;

-- ============================================
-- Create NEW policies with correct syntax
-- ============================================

-- 1. CAREGIVER PROFILES
-- Allow anyone (including anonymous) to insert
CREATE POLICY "Enable insert for all users" ON caregiver_profiles
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- Allow anyone to read (for now - can restrict later)
CREATE POLICY "Enable read for all users" ON caregiver_profiles
    FOR SELECT
    TO public
    USING (true);

-- 2. PATIENT INFO
CREATE POLICY "Enable insert for all users" ON patient_info
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON patient_info
    FOR SELECT
    TO public
    USING (true);

-- 3. ZARIT ASSESSMENTS
CREATE POLICY "Enable insert for all users" ON zarit_assessments
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON zarit_assessments
    FOR SELECT
    TO public
    USING (true);

-- 4. RESEARCH ANALYTICS
CREATE POLICY "Enable insert for all users" ON research_analytics
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON research_analytics
    FOR SELECT
    TO public
    USING (true);

-- ============================================
-- OPTIONAL: More Secure Policies (Future)
-- ============================================
-- Uncomment when you want stricter security:
/*
-- Drop the open policies
DROP POLICY "Enable insert for all users" ON caregiver_profiles;
DROP POLICY "Enable read for all users" ON caregiver_profiles;

-- Create session-based policies
CREATE POLICY "Insert with session" ON caregiver_profiles
    FOR INSERT
    TO public
    WITH CHECK (
        session_id IS NOT NULL AND
        session_id = gen_random_uuid()::text::uuid
    );

CREATE POLICY "Read own session data" ON caregiver_profiles
    FOR SELECT
    TO public
    USING (
        session_id::text = current_setting('request.jwt.claims', true)::json->>'session_id'
        OR auth.role() = 'authenticated'
    );
*/

-- ============================================
-- Verify policies are created
-- ============================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;


