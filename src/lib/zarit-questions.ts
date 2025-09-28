export interface ZaritQuestion {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface ZaritResult {
  score: number;
  interpretation: string;
  description: string;
  recommendations: string[];
  riskLevel: 'düşük' | 'orta' | 'yüksek' | 'çok yüksek';
}

// Zarit Bakım Verme Yükü Ölçeği - Kısa Form (ZBI-12)
export const zaritQuestions: ZaritQuestion[] = [
  {
    id: 1,
    text: "Akrabanızın sizden daha fazla yardım istediğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 2,
    text: "Akrabanızın davranışları nedeniyle zamanınızın yetmediğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 3,
    text: "Akrabanıza bakım vermek ile diğer sorumluluklar arasında bocalayarak stres yaşıyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 4,
    text: "Akrabanızın yanında bulunmanız nedeniyle utanç duyuyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 5,
    text: "Akrabanızın yanında bulunduğunuzda sinirli ya da kızgın hissediyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 6,
    text: "Akrabanızın sizin diğer aile bireyleri ile olan ilişkilerinizi olumsuz etkilediğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 7,
    text: "Akrabanızın gelecekte ne olacağından korkuyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 8,
    text: "Akrabanızın size bağımlı olduğunu düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 9,
    text: "Akrabanızın yanında bulunduğunuzda gerilim yaşıyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 10,
    text: "Akrabanıza bakım vermeniz nedeniyle sağlığınızın olumsuz etkilendiğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 11,
    text: "Akrabanızın yanında bulunmanız nedeniyle istediğiniz kadar kişisel mahremiyetinizin olmadığını düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  },
  {
    id: 12,
    text: "Akrabanıza bakım vermeniz nedeniyle sosyal yaşamınızın olumsuz etkilendiğini düşünüyor musunuz?",
    options: [
      { value: 0, label: "Hiçbir zaman" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Bazen" },
      { value: 3, label: "Oldukça sık" },
      { value: 4, label: "Hemen hemen her zaman" }
    ]
  }
];

export function calculateZaritScore(answers: number[]): ZaritResult {
  const score = answers.reduce((sum, answer) => sum + answer, 0);
  
  if (score <= 10) {
    return {
      score,
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
  } else if (score <= 20) {
    return {
      score,
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
  } else if (score <= 30) {
    return {
      score,
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
      score,
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
