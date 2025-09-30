export interface ZaritQuestion {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface ZaritResult {
  totalScore: number; // Changed from 'score' to 'totalScore' for consistency
  interpretation: string;
  description: string;
  recommendations: string[];
  riskLevel: 'düşük' | 'orta' | 'yüksek' | 'çok yüksek';
}

// ============================================
// FORM V2.0 - LITERATURE-BASED DATA INTERFACES
// ============================================

// BÖLÜM A: Bakım Veren Profili (31 alan)
export interface CaregiverProfile {
  // A1: Temel Demografik (5 alan)
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  maritalStatus?: 'married' | 'single' | 'widowed' | 'divorced';
  birthplace?: string; // il (kültürel bağlam için)

  // A2: Eğitim & Literacy (4 alan)
  educationLevel: 'illiterate' | 'primary' | 'secondary' | 'high_school' | 'university' | 'graduate';
  healthLiteracy?: number; // 1-5 subjective scale
  receivedCaregivingTraining?: boolean;
  trainingType?: 'disease_specific' | 'general_care' | 'online' | 'other';

  // A3: Çalışma & Ekonomi (7 alan)
  employmentStatus: 'full_time' | 'part_time' | 'unemployed' | 'retired' | 'homemaker' | 'unable_to_work';
  occupation?: string;
  jobLossDueToCaregiving?: boolean;
  workCaregivingConflict?: number; // 1-5: hiç yok → her zaman var
  monthlyHouseholdIncome?: '<15K' | '15-30K' | '30-50K' | '50-75K' | '75K+';
  receivingFinancialSupport?: boolean;
  financialStrain?: 'none' | 'mild' | 'moderate' | 'severe';

  // A4: Sağlık & Sigorta (5 alan)
  healthInsurance?: 'sgk' | 'private' | 'both' | 'none';
  hasChronicDisease?: boolean;
  chronicDiseaseTypes?: string[]; // multi-select
  regularMedicationUse?: boolean;
  mentalHealthHistory?: 'depression' | 'anxiety' | 'other' | 'none';

  // A5: Bakım Verme Özellikleri (6 alan)
  relationshipToPatient: string;
  primaryCaregiver: boolean;
  hoursPerDay: number; // 0-24
  caregivingDurationMonths: number;
  livingArrangement: 'same_house' | 'separate_houses' | 'other';
  otherCaregivers?: 'yes_regular' | 'yes_occasional' | 'no';

  // A6: Sosyal Destek (4 alan)
  familySupportPerception?: number; // 1-5
  friendNeighborSupport?: number; // 1-5
  usingHomeCareServices?: boolean;
  receivingGovernmentSupport?: boolean; // valilik, belediye
}

// BÖLÜM B: Hasta Klinik Profili (16 alan)
export interface PatientInformation {
  // B1: Demografik (3 alan)
  age: number;
  gender: 'male' | 'female' | 'other';
  educationLevel?: 'illiterate' | 'primary' | 'secondary' | 'high_school' | 'university' | 'graduate';

  // B2: Klinik Durum (6 alan)
  primaryDiagnosis: string;
  diagnosisDurationYears?: number;
  comorbidities?: string[]; // multi-select
  diseaseStage?: 'early' | 'moderate' | 'advanced' | 'terminal' | 'unknown';
  neuropsychiatricSymptoms?: 'yes_mild' | 'yes_severe' | 'no';
  painLevel?: number; // 0-10 NRS

  // B3: Fonksiyonel Durum (4 alan)
  mobilityStatus: string;
  cognitionStatus: string;
  adlDependencyLevel?: 'independent' | 'partially_dependent' | 'fully_dependent';
  iadlDependencyLevel?: 'independent' | 'partially_dependent' | 'fully_dependent';

  // B4: Bakım & Tedavi (3 alan)
  medicalEquipmentUsed?: string[];
  homeHealthcareServices?: string[];
  hospitalizationLast6Months?: '0' | '1-2' | '3+';
}

// BÖLÜM D: Mental Health Screening (Opsiyonel)
export interface MentalHealthScreening {
  // PHQ-2 (Depression)
  phq2_anhedonia?: 0 | 1 | 2 | 3; // Zevk almama
  phq2_depressed?: 0 | 1 | 2 | 3; // Depresif hissetme
  phq2_total?: number; // 0-6

  // GAD-2 (Anxiety)
  gad2_nervous?: 0 | 1 | 2 | 3; // Sinirli, endişeli
  gad2_worry?: 0 | 1 | 2 | 3; // Endişelenmeyi durduramama
  gad2_total?: number; // 0-6

  // Screening results
  phq2_positive?: boolean; // ≥3
  gad2_positive?: boolean; // ≥3
}

// Zarit Bakım Verme Yükü Ölçeği - Kısa Form (ZBI-12)
// Standard validated questions (English + Turkish)
export const zaritQuestions: ZaritQuestion[] = [
  {
    id: 1,
    text: "Kendiniz için yeterli zamanınız olmadığını hissediyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 2,
    text: "Bakım verme ve diğer sorumluluklarınızı yerine getirme arasında stres yaşıyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 3,
    text: "Hasta yakınınızın yanında olduğunuzda öfke hissediyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 4,
    text: "Hasta yakınınızın diğer kişilerle olan ilişkinizi olumsuz etkilediğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 5,
    text: "Hasta yakınınızın yanında bulunduğunuzda gerilim yaşıyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 6,
    text: "Hasta yakınınıza bakmak nedeniyle sağlığınızın olumsuz etkilendiğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 7,
    text: "Hasta yakınınız nedeniyle istediğiniz kadar mahremiyetinizin olmadığını hissediyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 8,
    text: "Hasta yakınınıza bakmak nedeniyle sosyal yaşamınızın olumsuz etkilendiğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 9,
    text: "Hasta yakınınızın hastalığı nedeniyle hayatınızın kontrolünü kaybettiğinizi hissediyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 10,
    text: "Hasta yakınınız için ne yapacağınız konusunda belirsizlik yaşıyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 11,
    text: "Hasta yakınınız için daha fazla şey yapmanız gerektiğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  },
  {
    id: 12,
    text: "Hasta yakınınıza daha iyi bakım verebileceğinizi düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Her zaman" }
    ]
  }
];

export function calculateZaritScore(answers: number[]): ZaritResult {
  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  
  if (totalScore <= 10) {
    return {
      totalScore,
      interpretation: "Hafif Bakım Yükü",
      riskLevel: "düşük",
      description: "Mevcut durumda yaşadığınız bakım yükü hafif düzeydedir. Bu çok normal ve yönetilebilir bir durumdur.",
      recommendations: [
        "Mevcut baş etme stratejilerinizi koruyun",
        "Düzenli dinlenme zamanlarınızı ihmal etmeyin",
        "Sosyal aktivitelerinizi sürdürmeye özen gösterin",
        "Gerekli durumlarda profesyonel destek almaktan çekinmeyin"
      ]
    };
  } else if (totalScore <= 20) {
    return {
      totalScore,
      interpretation: "Orta Düzey Bakım Yükü",
      riskLevel: "orta",
      description: "Yaşadığınız bakım yükü orta düzeydedir. Bu durum dikkat gerektirmekte ve aktif müdahale faydalı olacaktır.",
      recommendations: [
        "Bakım sorumluluklarınızı aile üyeleri ile paylaşmayı düşünün",
        "Kendinize düzenli zaman ayırın ve bu konuda titiz olun",
        "Bakım verme becerilerinizi geliştirmek için eğitim alın",
        "Yerel destek gruplarına katılmayı değerlendirin",
        "Gerekirse profesyonel psikolojik destek alın"
      ]
    };
  } else if (totalScore <= 30) {
    return {
      totalScore,
      interpretation: "Yüksek Bakım Yükü",
      riskLevel: "yüksek",
      description: "Yaşadığınız bakım yükü yüksek düzeydedir. Bu durum hem sizin hem de bakım verdiğiniz kişinin sağlığını olumsuz etkileyebilir.",
      recommendations: [
        "Mutlaka profesyonel destek alın",
        "Bakım yükünüzü azaltmak için alternatif bakım seçenekleri araştırın",
        "Aile danışmanlığı veya terapi almayı düşünün",
        "Sosyal hizmetler ve evde bakım desteği için başvurun",
        "Kendi sağlığınızı ihmal etmeyin, düzenli check-up yaptırın",
        "Bakım verme becerilerinizi artırmak için mutlaka eğitim alın"
      ]
    };
  } else {
    return {
      totalScore,
      interpretation: "Çok Yüksek Bakım Yükü",
      riskLevel: "çok yüksek",
      description: "Yaşadığınız bakım yükü kritik düzeydedir. Bu durum acil müdahale gerektirmektedir ve hem sizin hem de sevdiklerinizin sağlığı risk altındadır.",
      recommendations: [
        "ACİL: Derhal profesyonel yardım alın",
        "Sağlık ekibinizle durumunuzu paylaşın",
        "Alternatif bakım seçenekleri için sosyal hizmetler ile görüşün",
        "Geçici veya kalıcı kurumsal bakım seçeneklerini değerlendirin",
        "Kendi fiziksel ve ruhsal sağlığınız için derhal müdahale edin",
        "Aile üyelerinden acil destek talep edin",
        "Kriz müdahale hizmetlerinden yararlanın"
      ]
    };
  }
}

export function getColorByRiskLevel(riskLevel: string): string {
  switch (riskLevel) {
    case 'düşük':
      return 'text-green-600 bg-green-50';
    case 'orta':
      return 'text-yellow-600 bg-yellow-50';
    case 'yüksek':
      return 'text-orange-600 bg-orange-50';
    case 'çok yüksek':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}
