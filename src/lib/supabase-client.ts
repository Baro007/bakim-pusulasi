import { createClient } from '@supabase/supabase-js';
import type { CaregiverProfile, PatientInformation, ZaritResult, MentalHealthScreening } from './zarit-questions';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database operations
export interface AssessmentSubmission {
  caregiver: CaregiverProfile;
  patient: PatientInformation;
  zarit_answers: number[];
  zarit_result: ZaritResult;
  mental_health?: MentalHealthScreening; // Optional: PHQ-2 + GAD-2
  session_metadata?: {
    device_type?: string;
    user_agent?: string;
    completion_time_seconds?: number;
    started_at?: string;
    completed_at?: string;
  };
}

export interface DatabaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Submit a complete assessment to Supabase
 */
export async function submitAssessment(
  submission: AssessmentSubmission
): Promise<DatabaseResponse<{ assessment_id: string }>> {
  try {
    // 1. Insert caregiver profile (31 fields - v2.0)
    const caregiverId = crypto.randomUUID();
    
    const { error: caregiverError } = await supabase
      .from('caregivers')
      .insert({
        id: caregiverId,
        
        // A1: Temel Demografik
        name: submission.caregiver.name,
        age: submission.caregiver.age,
        gender: submission.caregiver.gender,
        marital_status: submission.caregiver.maritalStatus,
        birthplace: submission.caregiver.birthplace,
        
        // A2: Eğitim & Literacy
        education_level: submission.caregiver.educationLevel,
        health_literacy: submission.caregiver.healthLiteracy,
        received_caregiving_training: submission.caregiver.receivedCaregivingTraining,
        training_type: submission.caregiver.trainingType,
        
        // A3: Çalışma & Ekonomi
        employment_status: submission.caregiver.employmentStatus,
        occupation: submission.caregiver.occupation,
        job_loss_due_to_caregiving: submission.caregiver.jobLossDueToCaregiving,
        work_caregiving_conflict: submission.caregiver.workCaregivingConflict,
        monthly_household_income: submission.caregiver.monthlyHouseholdIncome,
        receiving_financial_support: submission.caregiver.receivingFinancialSupport,
        financial_strain: submission.caregiver.financialStrain,
        
        // A4: Sağlık & Sigorta
        health_insurance: submission.caregiver.healthInsurance,
        has_chronic_disease: submission.caregiver.hasChronicDisease,
        chronic_disease_types: submission.caregiver.chronicDiseaseTypes,
        regular_medication_use: submission.caregiver.regularMedicationUse,
        mental_health_history: submission.caregiver.mentalHealthHistory,
        
        // A5: Bakım Verme Özellikleri
        relationship_to_patient: submission.caregiver.relationshipToPatient,
        is_primary_caregiver: submission.caregiver.primaryCaregiver,
        hours_per_day: Math.max(0, Math.min(24, submission.caregiver.hoursPerDay || 0)),
        caregiving_duration_months: submission.caregiver.caregivingDurationMonths || 0,
        living_arrangement: submission.caregiver.livingArrangement,
        other_caregivers: submission.caregiver.otherCaregivers,
        
        // A6: Sosyal Destek
        family_support_perception: submission.caregiver.familySupportPerception,
        friend_neighbor_support: submission.caregiver.friendNeighborSupport,
        using_home_care_services: submission.caregiver.usingHomeCareServices,
        receiving_government_support: submission.caregiver.receivingGovernmentSupport,
      });

    if (caregiverError) throw new Error(`Caregiver insert failed: ${caregiverError.message}`);

    // 2. Insert patient information (16 fields - v2.0)
    const patientId = crypto.randomUUID();
    
    const { error: patientError } = await supabase
      .from('patients')
      .insert({
        id: patientId,
        caregiver_id: caregiverId,
        
        // B1: Demografik
        age: submission.patient.age,
        gender: submission.patient.gender,
        education_level: submission.patient.educationLevel,
        
        // B2: Klinik Durum
        primary_diagnosis: submission.patient.primaryDiagnosis,
        diagnosis_duration_years: submission.patient.diagnosisDurationYears,
        comorbidities: submission.patient.comorbidities,
        disease_stage: submission.patient.diseaseStage,
        neuropsychiatric_symptoms: submission.patient.neuropsychiatricSymptoms,
        pain_level: submission.patient.painLevel,
        
        // B3: Fonksiyonel Durum
        mobility_status: submission.patient.mobilityStatus,
        cognition_status: submission.patient.cognitionStatus,
        adl_dependency_level: submission.patient.adlDependencyLevel,
        iadl_dependency_level: submission.patient.iadlDependencyLevel,
        
        // B4: Bakım & Tedavi
        medical_equipment_used: submission.patient.medicalEquipmentUsed,
        home_healthcare_services: submission.patient.homeHealthcareServices,
        hospitalization_last_6_months: submission.patient.hospitalizationLast6Months,
      });

    if (patientError) throw new Error(`Patient insert failed: ${patientError.message}`);

    // 3. Insert ZBI assessment
    const assessmentId = crypto.randomUUID();
    
    const { error: assessmentError } = await supabase
      .from('zbi_assessments')
      .insert({
        id: assessmentId,
        caregiver_id: caregiverId,
        patient_id: patientId,
        answers: submission.zarit_answers,
        total_score: submission.zarit_result.totalScore,
        risk_level: submission.zarit_result.riskLevel,
        interpretation: submission.zarit_result.interpretation,
        session_metadata: submission.session_metadata,
      });

    if (assessmentError) throw new Error(`Assessment insert failed: ${assessmentError.message}`);

    // 4. Insert mental health screening (Optional: PHQ-2 + GAD-2)
    if (submission.mental_health) {
      const { error: mentalHealthError } = await supabase
        .from('mental_health_screenings')
        .insert({
          id: crypto.randomUUID(),
          assessment_id: assessmentId,
          phq2_anhedonia: submission.mental_health.phq2_anhedonia,
          phq2_depressed: submission.mental_health.phq2_depressed,
          phq2_total: submission.mental_health.phq2_total,
          gad2_nervous: submission.mental_health.gad2_nervous,
          gad2_worry: submission.mental_health.gad2_worry,
          gad2_total: submission.mental_health.gad2_total,
          phq2_positive: submission.mental_health.phq2_positive,
          gad2_positive: submission.mental_health.gad2_positive,
        });

      if (mentalHealthError) {
        console.warn('Mental health screening insert failed (non-critical):', mentalHealthError.message);
      }
    }

    return {
      success: true,
      data: {
        assessment_id: assessmentId,
      },
    };
  } catch (error) {
    console.error('Assessment submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get analytics summary for research dashboard
 */
export async function getAnalyticsSummary(): Promise<DatabaseResponse> {
  try {
    const { data, error } = await supabase.from('analytics_summary').select('*').single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch analytics',
    };
  }
}

/**
 * Get all assessments (for admin/research purposes)
 * Note: This would typically require authentication and authorization
 */
export async function getAllAssessments(): Promise<DatabaseResponse> {
  try {
    const { data, error } = await supabase
      .from('zbi_assessments')
      .select(
        `
        *,
        caregivers (*),
        patients (*)
      `
      )
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Assessments fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch assessments',
    };
  }
}
