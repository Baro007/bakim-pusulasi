# PHASE 2: DATA COLLECTION & Q1 PUBLICATION ROADMAP

## ✅ **TAMAMLANANLAR (Phase 1)**
- [x] Form v2.0 (63 alan - literatür temelli)
- [x] Informed Consent + KVKK compliance
- [x] Auto-save & UX optimizasyonu
- [x] Supabase schema v2.0

---

## 🎯 **PHASE 2: DATA COLLECTION (4-6 Ay)**

### **STEP 1: Pilot Study (Ay 1-2)** 🏃
**Hedef:** n=30-50 pilot veri, form validation

#### A. Sample Size Calculation
```
Primary Outcome: ZBI-12 mean difference (effect size d=0.5)
- α = 0.05, Power = 0.80
- Minimum n = 128 (pilot: 30-50 yeterli)
- Target for main study: n=200-300 (subgroup için)
```

#### B. Recruitment Strategy
**1. Online Channels (Hedef: 60%)**
- 🔗 Hasta dernekleri (Alzheimer, Parkinson, MS dernekleri)
- 📱 Sosyal medya kampanyası (Instagram, Facebook grupları)
- 🌐 Google Ads (bakım veren, Alzheimer bakımı vb.)
- 📧 E-mail listesi (sağlık kurumları)

**2. Offline Channels (Hedef: 40%)**
- 🏥 Hastane nöroloji/geriatri poliklinikleri
- 🏠 Evde bakım hizmetleri (özel firmalar)
- 🏢 Belediye sosyal destek merkezleri
- 👥 Bakım veren destek grupları

#### C. Pilot Study Checklist
- [ ] Ethics committee approval (ÖNCELİK!)
- [ ] Informed consent finalize
- [ ] QR kod + kısa link hazırla (bakim.pusulasi.com/anket)
- [ ] Flyer/poster tasarımı (A4 + Instagram Story)
- [ ] 5 hasta derneği ile iletişim
- [ ] İlk 30 katılımcı → completion rate & feedback
- [ ] Form revize (gerekirse)

---

### **STEP 2: Main Data Collection (Ay 3-5)** 📊
**Hedef:** n=200-300

#### A. Inclusion Criteria
✅ **Dahil edilecekler:**
- 18+ yaş bakım veren
- En az 3 ay bakım verme süresi
- Kronik hastalıklı hasta (Alzheimer, Parkinson, İnme, Kanser vb.)
- Türkçe okur-yazar
- Dijital form doldurabilir (kendisi veya yardımla)

❌ **Hariç tutulacaklar:**
- Profesyonel/ücretli bakıcılar
- <3 ay bakım verme süresi
- Bakım veren de ağır kronik hastalıklı (form dolduramaz)

#### B. Data Quality Control
- **Completion rate target:** >65%
- **Missing data strategy:** Multiple imputation (eğer <10% missing)
- **Outlier detection:** Z-score >3 → manuel kontrol
- **Duplicate check:** IP + timestamp çapraz kontrol

#### C. Weekly Monitoring
```python
# Dashboard metrics
- Günlük form doldurma: X/gün
- Completion rate: Y%
- Section dropout: Bölüm X'te %Z drop
- Avg completion time: Z dakika
```

---

### **STEP 3: Statistical Analysis (Ay 6)** 📈

#### A. Descriptive Statistics
- Demographics (caregiver + patient)
- ZBI-12 distribution (mean, SD, range)
- PHQ-2/GAD-2 prevalence

#### B. Primary Analysis
**Research Question 1:** Bakım yükü prevalansı ve severity
- ZBI-12 cut-off: <17 (minimal), 17-32 (mild-moderate), >32 (severe)
- Prevalence rates + 95% CI

**Research Question 2:** Bakım yükü ile ilişkili faktörler
- **Multiple Linear Regression:**
  - DV: ZBI-12 total score
  - IV: Patient factors (disease type, stage, ADL/IADL dependency)
  - IV: Caregiver factors (age, gender, education, hours/day, duration)
  - IV: Support factors (family support, government support, home care)

**Research Question 3:** Mental health outcomes
- PHQ-2 ≥3 prevalence (depression screening +)
- GAD-2 ≥3 prevalence (anxiety screening +)
- Correlation: ZBI-12 vs. PHQ-2/GAD-2

#### C. Subgroup Analysis (High-Impact!)
- **By disease type:** Alzheimer vs. Parkinson vs. Stroke
- **By disease stage:** Early vs. Advanced
- **By caregiver type:** Spouse vs. Adult child
- **By support level:** High vs. Low social support

#### D. Software & Scripts
```r
# R packages
- tidyverse (data wrangling)
- psych (psychometric analysis)
- lavaan (if CFA needed)
- ggplot2 (visualization)
- tableone (Table 1 generation)
```

---

## 📝 **STEP 4: Manuscript Writing (Ay 6-7)**

### **Target Journal (Q1 Options)**
1. **International Journal of Nursing Studies** (IF: 8.1, Q1)
   - Scope: ✅ Caregiver burden, nursing assessment
   - Turkish data: ✅ Accepts international samples

2. **Journal of Advanced Nursing** (IF: 3.8, Q1)
   - Scope: ✅ Caregiver assessment, chronic disease

3. **Aging & Mental Health** (IF: 3.4, Q1)
   - Scope: ✅ Caregiver burden, mental health

### **Manuscript Structure**
```
Title: "Caregiver Burden and Mental Health Outcomes in Caregivers 
       of Patients with Chronic Neurological Diseases: A Cross-Sectional 
       Study Using a Comprehensive Digital Assessment Tool"

Abstract (250 words)
- Background, Aim, Methods, Results, Conclusion

Introduction (800 words)
- Burden: Global & Turkish context
- Gap: Limited comprehensive assessment tools
- Aim: Assess burden + identify risk factors + mental health

Methods (1200 words)
- Design: Cross-sectional
- Sample: n=250, recruitment strategy
- Tool: ZBI-12 + comprehensive caregiver/patient assessment
- Ethics: Approved, informed consent
- Analysis: Multiple regression, subgroup analysis

Results (1000 words)
- Table 1: Demographics
- Table 2: ZBI-12 descriptives + prevalence
- Table 3: Regression model (factors associated with burden)
- Figure 1: ZBI score distribution by disease type
- Figure 2: Mental health screening results

Discussion (1500 words)
- Key findings vs. literature
- Clinical implications
- Policy recommendations (Turkey + global)
- Strengths: Comprehensive data, digital tool, large sample
- Limitations: Cross-sectional, convenience sampling

Conclusion (200 words)
```

---

## 🏆 **SUCCESS METRICS**

### **Short-term (6 months)**
- [ ] n=250+ data collected
- [ ] Completion rate >65%
- [ ] Manuscript submitted to Q1 journal

### **Medium-term (12 months)**
- [ ] Manuscript accepted & published
- [ ] Tool open-sourced (GitHub)
- [ ] 2+ conference presentations

### **Long-term (18 months)**
- [ ] Cited 5+ times
- [ ] Integrated into clinical practice (1+ hospital)
- [ ] Erasmus+ proposal submitted

---

## 📅 **GANTT CHART**

| Month | Activity | Deliverable |
|-------|----------|-------------|
| **1** | Ethics approval | Certificate |
| **1-2** | Pilot study (n=30-50) | Validation report |
| **3-5** | Main data collection (n=250) | Dataset |
| **6** | Statistical analysis | Results tables |
| **6-7** | Manuscript writing | Draft manuscript |
| **7** | Submit to journal | Submission confirmation |
| **8-10** | Revisions | Revised manuscript |
| **11** | Acceptance 🎉 | Published paper |

---

## 💰 **BUDGET ESTIMATE (If needed)**

| Item | Cost (TL) | Notes |
|------|-----------|-------|
| Google Ads (recruitment) | 5,000 | Optional |
| Poster/Flyer printing | 1,000 | 500 adet |
| SPSS/R license | 0 | R is free |
| Supabase Pro (data storage) | 2,000 | $20/month x 10 months |
| Open Access fee (if required) | 30,000 | Some journals charge |
| **TOTAL** | ~38,000 | Minimal if no OA fee |

**🎯 Strategy:** Apply for university research fund (BAP) or TÜBİTAK 1001 (~100K TL)

---

## ⚠️ **CRITICAL PATH (What to do NOW)**

### **IMMEDIATE ACTIONS (This Week):**
1. ✅ **Ethics Committee Application** → Başvuru dosyası hazırla
2. ✅ **QR Code + Short Link** → bakim.pusulasi.com/anket
3. ✅ **Recruitment Materials** → Flyer tasarımı
4. ✅ **Partner Outreach** → 5 hasta derneği ile iletişim

---

**🚀 Hangisinden başlayalım?**





