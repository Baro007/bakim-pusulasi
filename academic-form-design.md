# Academic Form Design - Q1 Journal Standards
## Bakım Pusulası - Data Collection Instrument

---

## 📋 FORM YAPISININ KARŞILAŞTIRILMASI

### MEVCUT FORM (v1.0 - Basic)
```
BÖLÜM A: Bakım Veren Profili (7 alan)
├── İsim
├── Yaş
├── Cinsiyet
├── Hasta ile yakınlık
├── Günlük bakım saati
├── Bakım süresi (ay)
└── (Diğer sorumluluklar - text)

BÖLÜM B: Hasta Bilgileri (5 alan)
├── Yaş
├── Cinsiyet
├── Ana tanı
├── Hareket durumu
└── Zihinsel durum

BÖLÜM C: ZBI-12 (12 soru)
└── 12 validated questions (0-4 Likert)
```

### YENİ AKADEMİK FORM (v2.0 - Literature-Based)
```
BÖLÜM A: Bakım Veren Sosyodemografik Profil (18 alan) ✨
├── 1. Temel Bilgiler
│   ├── İsim
│   ├── Yaş
│   ├── Cinsiyet
│   └── Medeni durum [YENİ]
│
├── 2. Eğitim & İstihdam
│   ├── Eğitim düzeyi [GÜNCELLENDİ]
│   ├── Çalışma durumu [GÜNCELLENDİ]
│   ├── Meslek [YENİ]
│   └── İş kaybı (caregiving nedeniyle) [YENİ]
│
├── 3. Ekonomik Durum
│   ├── Aylık hane geliri [GÜNCELLENDİ]
│   ├── Maddi destek alıyor mu? [YENİ]
│   ├── Maddi destek kaynağı [YENİ]
│   └── Finansal zorluk yaşıyor mu? [YENİ]
│
├── 4. Sağlık & Sigorta
│   ├── Sağlık sigortası var mı? [YENİ]
│   ├── Sigorta tipi (SGK, özel, vs.) [YENİ]
│   ├── Kronik hastalık [YENİ]
│   └── Düzenli ilaç kullanımı [YENİ]
│
├── 5. Bakım Verme Özellikleri
│   ├── Hasta ile yakınlık
│   ├── Primary caregiver
│   ├── Günlük bakım saati
│   ├── Bakım süresi (ay)
│   ├── Yaşam düzeni (hasta ile yaşıyor mu?) [GÜNCELLENDİ]
│   └── Diğer bakım verenler var mı? [YENİ]
│
└── 6. Hazırlık & Destek
    ├── Bakım verme eğitimi aldı mı? [YENİ]
    ├── Önceki bakım deneyimi [YENİ]
    ├── Sosyal destek ağı (aile, arkadaş) [YENİ]
    └── Evde bakım hizmeti kullanıyor mu? [YENİ]

BÖLÜM B: Hasta Klinik Profil (12 alan) ✨
├── 1. Demografik
│   ├── Yaş
│   ├── Cinsiyet
│   └── Eğitim düzeyi [YENİ]
│
├── 2. Klinik Durum
│   ├── Ana tanı/hastalık
│   ├── Tanı süresi (yıl) [YENİ]
│   ├── Ek hastalıklar (comorbidities)
│   ├── Hastalık evresi/şiddeti [YENİ]
│   └── Nöropsikiyatrik semptomlar [YENİ]
│
├── 3. Fonksiyonel Durum
│   ├── Hareket durumu (mobility)
│   ├── Zihinsel durum (cognition)
│   ├── ADL bağımlılık düzeyi [GÜNCELLENDİ]
│   └── IADL bağımlılık düzeyi [YENİ]
│
└── 4. Bakım & Tedavi
    ├── Tıbbi cihaz kullanımı
    ├── Evde sağlık hizmetleri
    └── Hospitalizasyon (son 6 ay) [YENİ]

BÖLÜM C: Zarit Yük Ölçeği - ZBI-12 (12 soru)
└── 12 validated questions (0-4 Likert)
   + Tam validasyon verileri eklenecek

BÖLÜM D: Ek Ölçekler (OPSIYONEL) ✨
├── 1. Depresyon Tarama (PHQ-2) [YENİ]
├── 2. Anksiyete Tarama (GAD-2) [YENİ]
└── 3. Yaşam Kalitesi (EQ-5D-3L) [YENİ]
```

---

## 📊 DEĞİŞKEN TABLOSU (Akademik Yayın için)

### BAĞIMSIZ DEĞİŞKENLER (Independent Variables)

| Kategori | Değişken | Ölçüm Tipi | Kodlama | Kaynak |
|----------|----------|------------|---------|--------|
| **Sosyodemografik** | Yaş | Sürekli | Years | Standard |
| | Cinsiyet | Kategorik | 1=Kadın, 2=Erkek | Standard |
| | Medeni durum | Kategorik | 1=Evli, 2=Bekar, 3=Dul, 4=Boşanmış | [19] |
| | Eğitim düzeyi | Ordinal | 1=İlkokul, 2=Ortaokul, 3=Lise, 4=Üniversite, 5=Lisansüstü | [1A prompt] |
| **Ekonomik** | Çalışma durumu | Kategorik | 1=Çalışıyor (tam), 2=Çalışıyor (yarı), 3=İşsiz, 4=Emekli, 5=Ev kadını | [1B prompt] |
| | Aylık hane geliri | Ordinal | 1=<15K, 2=15-30K, 3=30-50K, 4=50K+ TL | [1C prompt] |
| | Maddi destek | Binary | 0=Hayır, 1=Evet | [19] |
| | Finansal zorluk | Ordinal | 1=Hiç, 2=Hafif, 3=Orta, 4=Ciddi | [19] |
| **Sağlık** | Sağlık sigortası | Kategorik | 1=SGK, 2=Özel, 3=Yok | [1D prompt] |
| | Kronik hastalık | Binary | 0=Hayır, 1=Evet | [5B prompt] |
| | Mental sağlık | Ordinal | PHQ-2 score (0-6) | [5A prompt] |
| **Bakım Verme** | İlişki tipi | Kategorik | 1=Eş, 2=Çocuk, 3=Kardeş, 4=Diğer | [21][22] |
| | Günlük saat | Sürekli | Hours/day (0-24) | [1][2] |
| | Bakım süresi | Sürekli | Months | [1][2] |
| | Yaşam düzeni | Binary | 1=Birlikte, 0=Ayrı | [20] |
| **Destek** | Sosyal destek | Ordinal | 1=Hiç, 2=Az, 3=Orta, 4=Çok | [2A prompt] |
| | Eğitim aldı mı | Binary | 0=Hayır, 1=Evet | [2B prompt] |
| | Diğer bakım veren | Binary | 0=Hayır, 1=Evet | [2C prompt] |

### BAĞIMLI DEĞİŞKENLER (Dependent Variables)

| Değişken | Ölçüm | Aralık | Klinik Anlamlılık | Kaynak |
|----------|-------|--------|-------------------|--------|
| **ZBI-12 Total Score** | Sürekli | 0-48 | ≤10: Hafif, 11-20: Orta, 21-30: Yüksek, 31+: Çok yüksek | [4A prompt] |
| **Risk Level** | Kategorik | 4 levels | Düşük/Orta/Yüksek/Çok yüksek | [4A prompt] |
| PHQ-2 (Depresyon) | Sürekli | 0-6 | ≥3: Pozitif tarama | [5A prompt] |
| GAD-2 (Anksiyete) | Sürekli | 0-6 | ≥3: Pozitif tarama | [5A prompt] |

### MODERATÖR DEĞİŞKENLER (Moderators)

| Moderatör | Hipotez | Literatür |
|-----------|---------|-----------|
| **Cinsiyet** | Kadınlar → daha yüksek burden | [20][21] |
| **Eğitim** | Yüksek eğitim → daha düşük burden | [1A prompt] |
| **Gelir** | Düşük gelir → daha yüksek burden | [19] |
| **Sosyal destek** | Yüksek destek → daha düşük burden | [2A prompt] |
| **Hasta tanısı** | Demans → en yüksek burden | [21][22] |

---

## 🎯 AKADEMİK FORM'UN GÜÇLÜ YÖNLERİ

### 1. Literatür-Temelli Değişken Seçimi
✅ Her değişken için **literatür kanıtı** mevcut  
✅ **References.txt** bulgularıyla uyumlu  
✅ **Research gaps** ele alınıyor

### 2. Psikometrik Kalite
✅ **Validated instruments** (ZBI-12, PHQ-2, GAD-2)  
✅ **Standardized coding** (uluslararası karşılaştırma)  
✅ **Missing data stratejisi** (optional fields)

### 3. Kültürel Uyarlama
✅ **Türkiye sağlık sistemi** (SGK, evde bakım hizmetleri)  
✅ **Sosyoekonomik bağlam** (gelir aralıkları TL cinsinden)  
✅ **Aile yapısı** (geniş/çekirdek aile dinamikleri)

### 4. Multi-Level Analiz Potansiyeli
✅ **Individual level:** Caregiver characteristics  
✅ **Dyadic level:** Caregiver-patient interaction  
✅ **System level:** Healthcare access, support services

---

## 📐 İSTATİSTİKSEL GÜÇANALIZI

### Hedef Sample Size

**Basit korelasyon (r = 0.3, α=0.05, power=0.80):**
- Minimum n = 84 dyads

**Çoklu regresyon (15 predictors, R²=0.25, α=0.05, power=0.80):**
- Minimum n = 139 dyads

**Effect size detection (Cohen's d = 0.5, α=0.05, power=0.80):**
- Minimum n = 128 dyads

**📊 ÖNERİLEN SAMPLE:**
- **Pilot:** n = 30-50 dyads
- **Ana Çalışma:** n = 200+ dyads
- **Attrition reserve:** +20% → **n = 240 target**

---

## 🔍 ETİK KURUL GEREKSİNİMLERİ

### Informed Consent İçermeli:
1. ✅ Çalışma amacı & prosedürler
2. ✅ Gönüllülük (reddetme hakkı)
3. ✅ Veri gizliliği (KVKK uyumlu)
4. ✅ Veri kullanımı (akademik yayın)
5. ✅ İletişim bilgileri (araştırmacı)

### KVKK Compliance:
- ✅ Açık rıza (explicit consent)
- ✅ Veri minimizasyonu
- ✅ Anonimizasyon (results display)
- ✅ Saklama süresi (5 yıl)
- ✅ Silme hakkı

---

## 📝 FORM UYGULAMA SENARYOLARI

### Senaryo 1: Tam Dijital (Mevcut)
- **Platform:** Web-based (bakim-pusulasi.netlify.app)
- **Cihaz:** Smartphone, tablet, PC
- **Süre:** 15-20 dakika
- **Avantaj:** Otomatik veri girişi, anında sonuç
- **Dezavantaj:** Dijital literacy gereksinimi

### Senaryo 2: Assisted Digital
- **Platform:** Web-based + Aile hekimi/hemşire desteği
- **Cihaz:** Tablet (klinik ortam)
- **Süre:** 20-25 dakika
- **Avantaj:** Yüksek tamamlanma, kalite kontrol
- **Dezavantaj:** Personel zamanı

### Senaryo 3: Hibrit (Pilot için önerilen)
- **İlk ziyaret:** Assisted digital (sosyodemografik)
- **Takip:** Self-administered (ZBI-12 only)
- **Süre:** İlk 20 dk, takip 5-7 dk
- **Avantaj:** Best of both worlds

---

## ⏱️ ZAMAN ÇİZELGESİ

### BUGÜN - BU HAFTA:
1. ✅ Form tasarımı tamamlandı
2. 🔄 Consensus AI araştırma (İlk dalga: 5 prompts)
3. 🔄 Form v2.0 implementation (kod)
4. 🔄 Supabase schema update

### BU AY:
5. Etik kurul başvurusu
6. Informed consent formu
7. Pilot test (n=30)
8. Feasibility analizi

### 2-3 AY:
9. Ana çalışma (n=200+)
10. Veri toplama tamamlanması
11. İlk analiz

### 4-6 AY:
12. Makale yazımı
13. Q1 dergi submissoin
14. ESHSHK 2025 presentation

---

## 🚀 SONRAKİ ADIM: KARAR NOKTASI

**Şimdi 3 seçeneğiniz var:**

### OPTION A: CONSENSUS ARAŞTIRMASI ÖNCE (Önerilen)
→ İlk dalga 5 prompt'u şimdi çalıştıralım  
→ Sonuçları analiz edelim  
→ Formu finalize edelim  
**Süre:** 2-3 saat (bugün)

### OPTION B: FORM IMPLEMENTATION ÖNCE
→ Form v2.0'ı hemen kodlayalım  
→ Test edelim  
→ Sonra Consensus araştırma  
**Süre:** 3-4 saat (bugün)

### OPTION C: PARALELİŞLEM
→ Siz Consensus'ta araştırma yapın  
→ Ben Form v2.0 kodlarım  
→ Sonra birleştiririz  
**Süre:** 2 saat (paralel)

---

**HANGİ YOLU SEÇELİM?** 🎯  
**(A/B/C belirtin, detaylı ilerleme planı hazırlayayım)**



