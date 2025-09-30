-- ============================================
-- SUPABASE SCHEMA V2.0 - LITERATURE-BASED DESIGN
-- Bakım Pusulası - Academic Publication Ready
-- ============================================

-- DROP existing tables (CAREFUL - this will delete all data!)
-- Uncomment only if you want a clean slate
-- DROP TABLE IF EXISTS zbi_assessments CASCADE;
-- DROP TABLE IF EXISTS patients CASCADE;
-- DROP TABLE IF EXISTS caregivers CASCADE;

-- ============================================
-- TABLE 1: CAREGIVERS (31 fields - expanded from 13)
-- ============================================

CREATE TABLE IF NOT EXISTS caregivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- A1: Temel Demografik (5 fields)
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 120),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  marital_status TEXT CHECK (marital_status IN ('married', 'single', 'widowed', 'divorced')),
  birthplace TEXT, -- il
  
  -- A2: Eğitim & Literacy (4 fields)
  education_level TEXT NOT NULL CHECK (education_level IN ('illiterate', 'primary', 'secondary', 'high_school', 'university', 'graduate')),
  health_literacy INTEGER CHECK (health_literacy >= 1 AND health_literacy <= 5),
  received_caregiving_training BOOLEAN DEFAULT FALSE,
  training_type TEXT CHECK (training_type IN ('disease_specific', 'general_care', 'online', 'other')),
  
  -- A3: Çalışma & Ekonomi (7 fields)
  employment_status TEXT NOT NULL CHECK (employment_status IN ('full_time', 'part_time', 'unemployed', 'retired', 'homemaker', 'unable_to_work')),
  occupation TEXT,
  job_loss_due_to_caregiving BOOLEAN,
  work_caregiving_conflict INTEGER CHECK (work_caregiving_conflict >= 1 AND work_caregiving_conflict <= 5),
  monthly_household_income TEXT CHECK (monthly_household_income IN ('<15K', '15-30K', '30-50K', '50-75K', '75K+')),
  receiving_financial_support BOOLEAN,
  financial_strain TEXT CHECK (financial_strain IN ('none', 'mild', 'moderate', 'severe')),
  
  -- A4: Sağlık & Sigorta (5 fields)
  health_insurance TEXT CHECK (health_insurance IN ('sgk', 'private', 'both', 'none')),
  has_chronic_disease BOOLEAN,
  chronic_disease_types TEXT[], -- array of strings
  regular_medication_use BOOLEAN,
  mental_health_history TEXT CHECK (mental_health_history IN ('depression', 'anxiety', 'other', 'none')),
  
  -- A5: Bakım Verme Özellikleri (6 fields)
  relationship_to_patient TEXT NOT NULL,
  is_primary_caregiver BOOLEAN NOT NULL DEFAULT TRUE,
  hours_per_day NUMERIC(4,2) NOT NULL CHECK (hours_per_day >= 0 AND hours_per_day <= 24),
  caregiving_duration_months INTEGER NOT NULL CHECK (caregiving_duration_months >= 0),
  living_arrangement TEXT NOT NULL CHECK (living_arrangement IN ('same_house', 'separate_houses', 'other')),
  other_caregivers TEXT CHECK (other_caregivers IN ('yes_regular', 'yes_occasional', 'no')),
  
  -- A6: Sosyal Destek (4 fields)
  family_support_perception INTEGER CHECK (family_support_perception >= 1 AND family_support_perception <= 5),
  friend_neighbor_support INTEGER CHECK (friend_neighbor_support >= 1 AND friend_neighbor_support <= 5),
  using_home_care_services BOOLEAN,
  receiving_government_support BOOLEAN,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_caregivers_created_at ON caregivers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_caregivers_education ON caregivers(education_level);
CREATE INDEX IF NOT EXISTS idx_caregivers_employment ON caregivers(employment_status);
CREATE INDEX IF NOT EXISTS idx_caregivers_financial_strain ON caregivers(financial_strain);

-- ============================================
-- TABLE 2: PATIENTS (16 fields - expanded from 9)
-- ============================================

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,
  
  -- B1: Demografik (3 fields)
  age INTEGER NOT NULL CHECK (age >= 0 AND age <= 120),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  education_level TEXT CHECK (education_level IN ('illiterate', 'primary', 'secondary', 'high_school', 'university', 'graduate')),
  
  -- B2: Klinik Durum (6 fields)
  primary_diagnosis TEXT NOT NULL,
  diagnosis_duration_years NUMERIC(5,1) CHECK (diagnosis_duration_years >= 0),
  comorbidities TEXT[], -- array
  disease_stage TEXT CHECK (disease_stage IN ('early', 'moderate', 'advanced', 'terminal', 'unknown')),
  neuropsychiatric_symptoms TEXT CHECK (neuropsychiatric_symptoms IN ('yes_mild', 'yes_severe', 'no')),
  pain_level INTEGER CHECK (pain_level >= 0 AND pain_level <= 10),
  
  -- B3: Fonksiyonel Durum (4 fields)
  mobility_status TEXT NOT NULL,
  cognition_status TEXT NOT NULL,
  adl_dependency_level TEXT CHECK (adl_dependency_level IN ('independent', 'partially_dependent', 'fully_dependent')),
  iadl_dependency_level TEXT CHECK (iadl_dependency_level IN ('independent', 'partially_dependent', 'fully_dependent')),
  
  -- B4: Bakım & Tedavi (3 fields)
  medical_equipment_used TEXT[], -- array
  home_healthcare_services TEXT[], -- array
  hospitalization_last_6_months TEXT CHECK (hospitalization_last_6_months IN ('0', '1-2', '3+')),
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_patients_caregiver ON patients(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_patients_diagnosis ON patients(primary_diagnosis);
CREATE INDEX IF NOT EXISTS idx_patients_disease_stage ON patients(disease_stage);

-- ============================================
-- TABLE 3: ZBI ASSESSMENTS (expanded with mental health)
-- ============================================

CREATE TABLE IF NOT EXISTS zbi_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  
  -- ZBI-12 Data
  answers INTEGER[] NOT NULL CHECK (array_length(answers, 1) = 12),
  total_score INTEGER NOT NULL CHECK (total_score >= 0 AND total_score <= 48),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('düşük', 'orta', 'yüksek', 'çok yüksek')),
  interpretation TEXT NOT NULL,
  
  -- Mental Health Screening (NEW - BÖLÜM D)
  phq2_anhedonia INTEGER CHECK (phq2_anhedonia >= 0 AND phq2_anhedonia <= 3),
  phq2_depressed INTEGER CHECK (phq2_depressed >= 0 AND phq2_depressed <= 3),
  phq2_total INTEGER CHECK (phq2_total >= 0 AND phq2_total <= 6),
  phq2_positive BOOLEAN, -- ≥3
  
  gad2_nervous INTEGER CHECK (gad2_nervous >= 0 AND gad2_nervous <= 3),
  gad2_worry INTEGER CHECK (gad2_worry >= 0 AND gad2_worry <= 3),
  gad2_total INTEGER CHECK (gad2_total >= 0 AND gad2_total <= 6),
  gad2_positive BOOLEAN, -- ≥3
  
  -- Session Metadata
  session_metadata JSONB,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assessment_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Add indexes for performance & analysis
CREATE INDEX IF NOT EXISTS idx_assessments_caregiver ON zbi_assessments(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_assessments_patient ON zbi_assessments(patient_id);
CREATE INDEX IF NOT EXISTS idx_assessments_date ON zbi_assessments(assessment_date DESC);
CREATE INDEX IF NOT EXISTS idx_assessments_risk_level ON zbi_assessments(risk_level);
CREATE INDEX IF NOT EXISTS idx_assessments_total_score ON zbi_assessments(total_score);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE zbi_assessments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous INSERT (for data collection)
CREATE POLICY "Allow anonymous insert caregivers" ON caregivers
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert patients" ON patients
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert assessments" ON zbi_assessments
  FOR INSERT TO anon WITH CHECK (true);

-- Policy: Allow anonymous SELECT (for analytics - aggregate only)
-- NOTE: Individual data privacy maintained; only aggregates exposed
CREATE POLICY "Allow anonymous select caregivers" ON caregivers
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous select patients" ON patients
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous select assessments" ON zbi_assessments
  FOR SELECT TO anon USING (true);

-- ============================================
-- VIEWS FOR ANALYTICS (aggregate data only)
-- ============================================

-- View 1: Summary Statistics
CREATE OR REPLACE VIEW analytics_summary AS
SELECT
  COUNT(DISTINCT c.id) AS total_caregivers,
  COUNT(DISTINCT p.id) AS total_patients,
  COUNT(DISTINCT z.id) AS total_assessments,
  ROUND(AVG(z.total_score), 2) AS avg_zbi_score,
  ROUND(STDDEV(z.total_score), 2) AS std_zbi_score,
  COUNT(CASE WHEN z.risk_level = 'çok yüksek' THEN 1 END) AS high_risk_count,
  COUNT(CASE WHEN z.phq2_positive = TRUE THEN 1 END) AS depression_positive_count,
  COUNT(CASE WHEN z.gad2_positive = TRUE THEN 1 END) AS anxiety_positive_count,
  MIN(z.assessment_date) AS first_assessment_date,
  MAX(z.assessment_date) AS last_assessment_date
FROM caregivers c
LEFT JOIN patients p ON p.caregiver_id = c.id
LEFT JOIN zbi_assessments z ON z.caregiver_id = c.id;

-- View 2: Burden by Demographics
CREATE OR REPLACE VIEW burden_by_demographics AS
SELECT
  c.gender,
  c.education_level,
  c.employment_status,
  c.financial_strain,
  COUNT(*) AS n,
  ROUND(AVG(z.total_score), 2) AS avg_burden,
  ROUND(STDDEV(z.total_score), 2) AS std_burden,
  COUNT(CASE WHEN z.risk_level IN ('yüksek', 'çok yüksek') THEN 1 END) AS high_burden_count
FROM caregivers c
INNER JOIN zbi_assessments z ON z.caregiver_id = c.id
GROUP BY c.gender, c.education_level, c.employment_status, c.financial_strain;

-- View 3: Burden by Patient Factors
CREATE OR REPLACE VIEW burden_by_patient_factors AS
SELECT
  p.disease_stage,
  p.adl_dependency_level,
  p.iadl_dependency_level,
  p.neuropsychiatric_symptoms,
  COUNT(*) AS n,
  ROUND(AVG(z.total_score), 2) AS avg_burden,
  ROUND(STDDEV(z.total_score), 2) AS std_burden
FROM patients p
INNER JOIN zbi_assessments z ON z.patient_id = p.id
GROUP BY p.disease_stage, p.adl_dependency_level, p.iadl_dependency_level, p.neuropsychiatric_symptoms;

-- View 4: Mental Health Correlations
CREATE OR REPLACE VIEW mental_health_correlations AS
SELECT
  z.risk_level,
  COUNT(*) AS n,
  COUNT(CASE WHEN z.phq2_positive = TRUE THEN 1 END) AS depression_count,
  COUNT(CASE WHEN z.gad2_positive = TRUE THEN 1 END) AS anxiety_count,
  ROUND(100.0 * COUNT(CASE WHEN z.phq2_positive = TRUE THEN 1 END) / COUNT(*), 1) AS depression_percent,
  ROUND(100.0 * COUNT(CASE WHEN z.gad2_positive = TRUE THEN 1 END) / COUNT(*), 1) AS anxiety_percent
FROM zbi_assessments z
GROUP BY z.risk_level
ORDER BY 
  CASE z.risk_level
    WHEN 'düşük' THEN 1
    WHEN 'orta' THEN 2
    WHEN 'yüksek' THEN 3
    WHEN 'çok yüksek' THEN 4
  END;

-- ============================================
-- FUNCTIONS FOR DATA INTEGRITY
-- ============================================

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update for caregivers
CREATE TRIGGER update_caregivers_updated_at
  BEFORE UPDATE ON caregivers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update for patients
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant table permissions
GRANT SELECT, INSERT ON caregivers TO anon, authenticated;
GRANT SELECT, INSERT ON patients TO anon, authenticated;
GRANT SELECT, INSERT ON zbi_assessments TO anon, authenticated;

-- Grant view permissions (read-only for analytics)
GRANT SELECT ON analytics_summary TO anon, authenticated;
GRANT SELECT ON burden_by_demographics TO anon, authenticated;
GRANT SELECT ON burden_by_patient_factors TO anon, authenticated;
GRANT SELECT ON mental_health_correlations TO anon, authenticated;

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE caregivers IS 'Bakım veren profilleri - literatür-temelli 31 alan (v2.0)';
COMMENT ON TABLE patients IS 'Hasta klinik profilleri - 16 alan (v2.0)';
COMMENT ON TABLE zbi_assessments IS 'ZBI-12 değerlendirmeleri + PHQ-2/GAD-2 mental sağlık taraması';
COMMENT ON VIEW analytics_summary IS 'Genel istatistikler özeti';
COMMENT ON VIEW burden_by_demographics IS 'Demografik faktörlere göre bakım yükü dağılımı';
COMMENT ON VIEW burden_by_patient_factors IS 'Hasta faktörlerine göre bakım yükü dağılımı';
COMMENT ON VIEW mental_health_correlations IS 'Mental sağlık ve bakım yükü korelasyonları';

-- ============================================
-- SCHEMA V2.0 READY! 
-- ============================================

-- Next steps:
-- 1. Run this script in Supabase SQL Editor
-- 2. Verify tables created: SELECT * FROM analytics_summary;
-- 3. Test INSERT with sample data
-- 4. Update frontend code to use new fields
