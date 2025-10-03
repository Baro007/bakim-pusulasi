-- Bakım Pusulası - Academic Research Database Schema
-- Version: 1.0
-- Date: 2025-01-30

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table 1: Caregiver Profiles (Bölüm A)
-- ============================================
CREATE TABLE IF NOT EXISTS caregiver_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Bölüm A: Bakım Veren Bilgileri
    age INTEGER CHECK (age >= 18 AND age <= 120),
    gender VARCHAR(30) CHECK (gender IN ('Kadın', 'Erkek', 'Belirtmek İstemiyorum')),
    relationship_to_patient VARCHAR(50) CHECK (relationship_to_patient IN (
        'Eşi', 'Çocuğu', 'Gelini/Damadı', 'Kardeşi', 'Diğer Akraba', 'Ücretli Bakıcı'
    )),
    lives_with_patient BOOLEAN,
    caregiving_duration_years DECIMAL(4,1) CHECK (caregiving_duration_years >= 0),
    daily_care_hours VARCHAR(30) CHECK (daily_care_hours IN (
        '4 saatten az', '5-8 saat', '9 saatten fazla'
    )),
    has_chronic_illness BOOLEAN,
    social_support_level INTEGER CHECK (social_support_level BETWEEN 1 AND 5),
    
    -- Session & Device Metadata
    session_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    device_type VARCHAR(20),
    browser_info VARCHAR(100),
    screen_size VARCHAR(20),
    
    -- Completion Status
    section_a_completed BOOLEAN DEFAULT FALSE,
    section_b_completed BOOLEAN DEFAULT FALSE,
    section_c_completed BOOLEAN DEFAULT FALSE,
    fully_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- Table 2: Patient Information (Bölüm B)
-- ============================================
CREATE TABLE IF NOT EXISTS patient_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caregiver_id UUID REFERENCES caregiver_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Bölüm B: Hasta Bilgileri
    daily_independence_level VARCHAR(100) CHECK (daily_independence_level IN (
        'Neredeyse tamamen bağımsız (Çok az yardıma ihtiyacı var)',
        'Çoğu aktivitede yardıma muhtaç (Yarı Bağımlı)',
        'Hemen her şey için tamamen muhtaç (Tam Bağımlı)'
    )),
    cognitive_symptoms VARCHAR(30) CHECK (cognitive_symptoms IN (
        'Hayır, olmadı', 'Evet, ara sıra oldu', 'Evet, sık sık oluyor'
    )),
    medication_count VARCHAR(20) CHECK (medication_count IN (
        '4''ten az', '5 ile 9 arası', '10 ve üzeri'
    )),
    incontinence_present BOOLEAN,
    
    -- Unique constraint: one patient per caregiver
    CONSTRAINT unique_patient_per_caregiver UNIQUE(caregiver_id)
);

-- ============================================
-- Table 3: Zarit Burden Assessments (Bölüm C)
-- ============================================
CREATE TABLE IF NOT EXISTS zarit_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caregiver_id UUID REFERENCES caregiver_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Zarit-12 Questions (0-4 Likert Scale)
    q1_time_for_self INTEGER CHECK (q1_time_for_self BETWEEN 0 AND 4),
    q2_stress_balance INTEGER CHECK (q2_stress_balance BETWEEN 0 AND 4),
    q3_anger INTEGER CHECK (q3_anger BETWEEN 0 AND 4),
    q4_relationships_affected INTEGER CHECK (q4_relationships_affected BETWEEN 0 AND 4),
    q5_feeling_tense INTEGER CHECK (q5_feeling_tense BETWEEN 0 AND 4),
    q6_health_suffering INTEGER CHECK (q6_health_suffering BETWEEN 0 AND 4),
    q7_privacy_loss INTEGER CHECK (q7_privacy_loss BETWEEN 0 AND 4),
    q8_social_life_suffering INTEGER CHECK (q8_social_life_suffering BETWEEN 0 AND 4),
    q9_lost_control INTEGER CHECK (q9_lost_control BETWEEN 0 AND 4),
    q10_uncertainty INTEGER CHECK (q10_uncertainty BETWEEN 0 AND 4),
    q11_should_do_more INTEGER CHECK (q11_should_do_more BETWEEN 0 AND 4),
    q12_could_do_better INTEGER CHECK (q12_could_do_better BETWEEN 0 AND 4),
    
    -- Calculated Results
    total_score INTEGER CHECK (total_score BETWEEN 0 AND 48),
    burden_level VARCHAR(30) CHECK (burden_level IN (
        'Hafif veya Yük Yok', 'Hafif-Orta Yük', 'Orta-Şiddetli Yük', 'Şiddetli Yük'
    )),
    
    -- Response Analytics
    completion_time_seconds INTEGER,
    question_response_times JSONB, -- Individual question timing
    completed BOOLEAN DEFAULT FALSE,
    
    -- Unique constraint: one assessment per caregiver
    CONSTRAINT unique_assessment_per_caregiver UNIQUE(caregiver_id)
);

-- ============================================
-- Table 4: Research Analytics & User Journey
-- ============================================
CREATE TABLE IF NOT EXISTS research_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caregiver_id UUID REFERENCES caregiver_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- User Journey Data
    page_visits JSONB DEFAULT '[]'::jsonb,
    navigation_pattern JSONB DEFAULT '[]'::jsonb,
    form_interactions JSONB DEFAULT '{}'::jsonb,
    
    -- Technical Metadata
    device_type VARCHAR(20),
    browser VARCHAR(50),
    operating_system VARCHAR(50),
    screen_resolution VARCHAR(20),
    
    -- Accessibility Features Used
    accessibility_features JSONB DEFAULT '{}'::jsonb,
    voice_input_used BOOLEAN DEFAULT FALSE,
    font_size_adjusted BOOLEAN DEFAULT FALSE,
    high_contrast_used BOOLEAN DEFAULT FALSE,
    
    -- Performance Metrics
    page_load_times JSONB DEFAULT '{}'::jsonb,
    interaction_delays JSONB DEFAULT '[]'::jsonb
);

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX idx_caregiver_session ON caregiver_profiles(session_id);
CREATE INDEX idx_caregiver_created ON caregiver_profiles(created_at DESC);
CREATE INDEX idx_caregiver_completed ON caregiver_profiles(fully_completed);
CREATE INDEX idx_patient_caregiver ON patient_info(caregiver_id);
CREATE INDEX idx_zarit_caregiver ON zarit_assessments(caregiver_id);
CREATE INDEX idx_zarit_burden_level ON zarit_assessments(burden_level);
CREATE INDEX idx_zarit_total_score ON zarit_assessments(total_score);
CREATE INDEX idx_analytics_caregiver ON research_analytics(caregiver_id);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS
ALTER TABLE caregiver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE zarit_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_analytics ENABLE ROW LEVEL SECURITY;

-- Anonymous users can insert (for form submission)
CREATE POLICY "Allow anonymous insert" ON caregiver_profiles
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON patient_info
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON zarit_assessments
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON research_analytics
    FOR INSERT TO anon
    WITH CHECK (true);

-- Users can only read their own data (via session_id)
CREATE POLICY "Users can read own data" ON caregiver_profiles
    FOR SELECT TO anon
    USING (session_id::text = current_setting('request.jwt.claims', true)::json->>'session_id');

-- Admin/Authenticated users can read all (for research)
CREATE POLICY "Authenticated can read all" ON caregiver_profiles
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Authenticated can read all" ON patient_info
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Authenticated can read all" ON zarit_assessments
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Authenticated can read all" ON research_analytics
    FOR SELECT TO authenticated
    USING (true);

-- ============================================
-- Functions & Triggers
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_caregiver_updated_at
    BEFORE UPDATE ON caregiver_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-calculate Zarit total score and burden level
CREATE OR REPLACE FUNCTION calculate_zarit_score()
RETURNS TRIGGER AS $$
DECLARE
    score INTEGER;
BEGIN
    -- Calculate total score
    score := COALESCE(NEW.q1_time_for_self, 0) + 
             COALESCE(NEW.q2_stress_balance, 0) + 
             COALESCE(NEW.q3_anger, 0) + 
             COALESCE(NEW.q4_relationships_affected, 0) + 
             COALESCE(NEW.q5_feeling_tense, 0) + 
             COALESCE(NEW.q6_health_suffering, 0) + 
             COALESCE(NEW.q7_privacy_loss, 0) + 
             COALESCE(NEW.q8_social_life_suffering, 0) + 
             COALESCE(NEW.q9_lost_control, 0) + 
             COALESCE(NEW.q10_uncertainty, 0) + 
             COALESCE(NEW.q11_should_do_more, 0) + 
             COALESCE(NEW.q12_could_do_better, 0);
    
    NEW.total_score := score;
    
    -- Determine burden level
    IF score <= 10 THEN
        NEW.burden_level := 'Hafif veya Yük Yok';
    ELSIF score <= 20 THEN
        NEW.burden_level := 'Hafif-Orta Yük';
    ELSIF score <= 40 THEN
        NEW.burden_level := 'Orta-Şiddetli Yük';
    ELSE
        NEW.burden_level := 'Şiddetli Yük';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_zarit_before_insert_update
    BEFORE INSERT OR UPDATE ON zarit_assessments
    FOR EACH ROW
    EXECUTE FUNCTION calculate_zarit_score();

-- ============================================
-- Views for Research Analysis
-- ============================================

-- Complete assessment view (joins all tables)
CREATE OR REPLACE VIEW complete_assessments AS
SELECT 
    cp.id as caregiver_id,
    cp.created_at,
    cp.age as caregiver_age,
    cp.gender as caregiver_gender,
    cp.relationship_to_patient,
    cp.lives_with_patient,
    cp.caregiving_duration_years,
    cp.daily_care_hours,
    cp.has_chronic_illness as caregiver_has_illness,
    cp.social_support_level,
    
    pi.daily_independence_level as patient_independence,
    pi.cognitive_symptoms as patient_cognitive,
    pi.medication_count as patient_medications,
    pi.incontinence_present as patient_incontinence,
    
    za.total_score as zarit_score,
    za.burden_level,
    za.completion_time_seconds,
    
    cp.device_type,
    cp.fully_completed
FROM caregiver_profiles cp
LEFT JOIN patient_info pi ON cp.id = pi.caregiver_id
LEFT JOIN zarit_assessments za ON cp.id = za.caregiver_id
WHERE cp.fully_completed = true;

-- Statistical summary view
CREATE OR REPLACE VIEW assessment_statistics AS
SELECT 
    COUNT(*) as total_assessments,
    AVG(za.total_score) as mean_zarit_score,
    STDDEV(za.total_score) as std_zarit_score,
    MIN(za.total_score) as min_score,
    MAX(za.total_score) as max_score,
    
    COUNT(CASE WHEN za.burden_level = 'Hafif veya Yük Yok' THEN 1 END) as count_low_burden,
    COUNT(CASE WHEN za.burden_level = 'Hafif-Orta Yük' THEN 1 END) as count_mild_moderate,
    COUNT(CASE WHEN za.burden_level = 'Orta-Şiddetli Yük' THEN 1 END) as count_moderate_severe,
    COUNT(CASE WHEN za.burden_level = 'Şiddetli Yük' THEN 1 END) as count_severe,
    
    AVG(cp.age) as mean_caregiver_age,
    AVG(cp.caregiving_duration_years) as mean_caregiving_years,
    AVG(cp.social_support_level) as mean_social_support,
    
    AVG(za.completion_time_seconds) as mean_completion_time
FROM caregiver_profiles cp
JOIN zarit_assessments za ON cp.id = za.caregiver_id
WHERE cp.fully_completed = true;

-- ============================================
-- Sample Data for Testing (Optional - Remove in Production)
-- ============================================
-- UNCOMMENT BELOW FOR DEVELOPMENT TESTING ONLY
/*
INSERT INTO caregiver_profiles (age, gender, relationship_to_patient, lives_with_patient, caregiving_duration_years, daily_care_hours, has_chronic_illness, social_support_level, device_type, fully_completed) 
VALUES 
(58, 'Kadın', 'Eşi', true, 6.5, '9 saatten fazla', true, 3, 'mobile', true),
(45, 'Erkek', 'Çocuğu', false, 3.0, '5-8 saat', false, 4, 'desktop', true);

INSERT INTO patient_info (caregiver_id, daily_independence_level, cognitive_symptoms, medication_count, incontinence_present)
SELECT id, 'Hemen her şey için tamamen muhtaç (Tam Bağımlı)', 'Evet, sık sık oluyor', '10 ve üzeri', true
FROM caregiver_profiles WHERE age = 58;

INSERT INTO zarit_assessments (caregiver_id, q1_time_for_self, q2_stress_balance, q3_anger, q4_relationships_affected, q5_feeling_tense, q6_health_suffering, q7_privacy_loss, q8_social_life_suffering, q9_lost_control, q10_uncertainty, q11_should_do_more, q12_could_do_better, completion_time_seconds, completed)
SELECT id, 4, 4, 3, 4, 4, 3, 4, 4, 3, 3, 2, 2, 485, true
FROM caregiver_profiles WHERE age = 58;
*/

-- ============================================
-- Grant Permissions
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ============================================
-- Schema Version Tracking
-- ============================================
CREATE TABLE IF NOT EXISTS schema_version (
    version VARCHAR(10) PRIMARY KEY,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description TEXT
);

INSERT INTO schema_version (version, description) 
VALUES ('1.0', 'Initial academic research schema with 3-section assessment');

-- END OF SCHEMA





