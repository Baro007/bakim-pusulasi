# VERİ GÜVENLİĞİ VE KVKK UYUMLULUK PLANI

**Araştırma:** Kronik Nörolojik Hastalığı Olan Bireylere Bakım Verenlerde Bakım Yükü ve Ruh Sağlığı Sonuçları

---

## 1. YASAL ÇERÇEVE

Bu araştırma veri güvenliği ve gizlilik planı aşağıdaki yasal düzenlemelere uygun olarak hazırlanmıştır:

### **1.1 Ulusal Mevzuat**
- ✅ **6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)** - 2016
- ✅ **Kişisel Verilerin Korunması Kurumu (KVKK) Tebliğleri**
- ✅ **Helsinki Deklarasyonu** (2013 Fortaleza revizyonu)
- ✅ **T.C. Sağlık Bakanlığı Klinik Araştırmalar Yönetmeliği**

### **1.2 Uluslararası Standartlar**
- ✅ **GDPR (General Data Protection Regulation)** - EU 2018
- ✅ **ISO 27001:2013** (Information Security Management)
- ✅ **HIPAA** (Health Insurance Portability and Accountability Act) - USA

---

## 2. KİŞİSEL VERİLERİN TOPLANMASI

### **2.1 Toplanan Kişisel Veriler**

#### **A. TOPLANAN VERİLER:**
**Hassas Kişisel Veri (Özel Nitelikli):**
- Sağlık verileri (kronik hastalık, ruh sağlığı tarama sonuçları)
- NOT: Bu veriler **KVKK md. 6** kapsamında özel korumadadır

**Demografik Veriler (Hassas Değil):**
- Yaş, cinsiyet, eğitim seviyesi
- Meslek, gelir düzeyi
- İl (doğum yeri)

#### **B. TOPLANMAYAN VERİLER:**
❌ **Açık Kimlik Bilgisi:**
- İsim, soyisim (sadece ilk isim - anonim)
- TC kimlik numarası
- Adres (tam adres)
- Telefon numarası
- E-mail adresi (opsiyonel - sadece rapor göndermek için, ayrı sistemde)

❌ **Lokasyon Verisi:**
- IP adresi
- GPS koordinatları
- Detaylı adres bilgisi

### **2.2 Veri Toplama Yöntemi**
- **Platform:** Web-based dijital form (https://bakim-pusulasi.vercel.app)
- **Süre:** Tek seferlik (20-25 dakika)
- **Rıza:** Bilgilendirilmiş onam (informed consent) - dijital checkbox

---

## 3. VERİ İŞLEME AMACI VE HUKUKI DAYANAK

### **3.1 Veri İşleme Amacı**
**KVKK md. 4 uyarınca:**
- ✅ **Bilimsel araştırma:** Bakım yükü ve ruh sağlığı ilişkisinin araştırılması
- ✅ **İstatistiksel analiz:** Prevalans, korelasyon, regresyon analizleri
- ✅ **Akademik yayın:** Makale, bildiri, tez
- ❌ **Ticari amaç YOK**
- ❌ **Pazarlama/reklam YOK**

### **3.2 Hukuki Dayanak**
**KVKK md. 5/2 (Kişisel Veri İşleme Şartları):**
- ✅ **Açık rıza (f):** Katılımcıdan dijital informed consent alınıyor
- ✅ **Bilimsel araştırma (ğ):** İstatistiksel/bilimsel amaçlı (kişi tanımlanamaz şekilde)

**KVKK md. 6/3 (Özel Nitelikli Veri - Sağlık):**
- ✅ **Açık rıza alınıyor** (sağlık verisi için zorunlu)
- ✅ **Kamu sağlığı yararına bilimsel araştırma** (md. 6/3-c)

---

## 4. VERİ GÜVENLİĞİ TEKNİK TEDBİRLER

### **4.1 Veri Depolama ve Şifreleme**

#### **Platform: Supabase (PostgreSQL)**
- **Lokasyon:** EU (Frankfurt) - GDPR uyumlu
- **Sertifikasyon:** ISO 27001, SOC 2 Type II
- **Encryption:**
  - **At Rest:** AES-256 encryption (disk seviyesinde)
  - **In Transit:** TLS 1.3 (HTTPS)
- **Backup:** Otomatik günlük yedekleme (encrypted)

#### **Anonim UUID Kullanımı**
```javascript
// Her katılımcıya rastgele benzersiz ID
const participantID = crypto.randomUUID();
// Örnek: "a3d5f8c2-9e1b-4f7a-b2c3-1d4e5f6a7b8c"
// Kimlik bilgisiyle ilişkilendirilemez
```

### **4.2 Erişim Kontrolü**

#### **Rol Bazlı Erişim (RBAC):**
| Rol | Erişim Yetkisi | Kişi Sayısı |
|-----|----------------|-------------|
| **Veri Giriş** | Sadece form doldurma (katılımcı) | Sınırsız |
| **Veri Görüntüleme** | Aggregate data (admin panel) | 2 (araştırmacı + danışman) |
| **Veri İndirme** | Raw data export (.csv) | 1 (sorumlu araştırmacı) |
| **Veri Silme** | Tüm verileri silme yetkisi | 1 (sorumlu araştırmacı) |

#### **Kimlik Doğrulama:**
- **2FA (Two-Factor Authentication):** Zorunlu
- **Şifre politikası:** Minimum 12 karakter, özel karakter, sayı
- **Oturum zaman aşımı:** 30 dakika
- **IP whitelist:** Sadece kurumsal IP'den erişim (opsiyonel)

### **4.3 Veri Minimizasyonu (KVKK md. 4/c)**

**Toplanan ≠ Saklanan:**
- Form başlangıcında anonim ID oluşturulur
- Kimlik bilgisi (isim) sadece form sırasında görünür, **kaydedilmez**
- Sadece **bilimsel analiz için gerekli** veriler saklanır

**Örnek:**
```json
// SAKLANMAYAN (form sırasında gösterilen):
{
  "display_name": "Ayşe" // Sadece UI'da, DB'ye yazılmaz
}

// SAKLANAN (anonim):
{
  "participant_id": "uuid-xxx-xxx",
  "age": 45,
  "gender": "female",
  "zbi_score": 28,
  ...
}
```

### **4.4 Veri Bütünlüğü ve Doğruluk**

**Validation (Sunucu + İstemci):**
- Input validation (XSS, SQL injection koruması)
- Data type checking (yaş: 18-100, ZBI: 0-48)
- Range validation (günlük bakım saati: 0-24)

**Audit Log:**
- Tüm veri girişleri timestamped
- Değişiklik kayıtları (edit history)
- Erişim logları (kim, ne zaman, hangi veri)

---

## 5. VERİ PAYLAŞIMI VE AKTARIMI

### **5.1 Veri Paylaşım Politikası**

#### **❌ PAYLAŞILMAYACAK:**
- 3. kişi/şirketlere satış/kiralama: **ASLA**
- Pazarlama/reklam amaçlı: **ASLA**
- Sigorta şirketleri: **ASLA**
- İşverenler: **ASLA**
- Bireysel veriler: **ASLA** (KVKK md. 8/1 uyarınca)

#### **✅ PAYLAŞILACAK (Anonim):**
- **Akademik yayın:** Sadece aggregate data (toplam istatistikler)
  - Örnek: "Katılımcıların %45'i orta düzey bakım yükü bildirdi"
- **Kongre bildirisi:** Özet istatistikler
- **Open-source:** Anonim dataset (kişi tanımlanamaz) - eğer etik kurul onaylarsa

### **5.2 Veri Aktarım Güvenliği**

**Yurt Dışı Aktarım (KVKK md. 9):**
- Supabase EU (Frankfurt) sunucusu → Yurt dışı aktarım VAR
- **KVKK md. 9/1:** "Yeterli korumaya sahip ülke" → EU (GDPR) ✅
- **Alternatif:** Türkiye sunucusu (DigitalOcean İstanbul) kullanılabilir

**Aktarım Sırasında:**
- TLS 1.3 şifreleme
- Certificate pinning
- No-log policy (IP logları tutulmuyor)

---

## 6. VERİ SAKLAMA VE İMHA

### **6.1 Saklama Süresi**

**KVKK md. 7 uyarınca:**
- **Minimum:** Makale yayınlanana kadar (review süreçleri için)
- **Maksimum:** Yayın sonrası **5 yıl**
- **Sonrası:** Tüm veriler kalıcı olarak silinir

**Saklama Takvimi:**
| Dönem | Veri Durumu | Erişim |
|-------|-------------|--------|
| **Veri Toplama (6 ay)** | Aktif toplama | Araştırmacı + Katılımcı (kendi verisi) |
| **Analiz (6 ay)** | Analiz aşaması | Sadece araştırmacı |
| **Yayın Review (6-12 ay)** | Dergi review için saklama | Sadece araştırmacı |
| **Yayın Sonrası (5 yıl)** | Arşiv (citation, replication için) | Sadece sorumlu araştırmacı |
| **5 yıl sonrası** | **Kalıcı silme** | Erişim YOK |

### **6.2 Veri İmha Prosedürü**

**Güvenli Silme (Secure Deletion):**
1. **Veritabanı silme:**
   ```sql
   DELETE FROM participants WHERE created_at < (NOW() - INTERVAL '5 years');
   ```
2. **Backup silme:** Otomatik backup rotasyonu (5 yıl sonra overwrite)
3. **Log temizleme:** Audit log'ları da silinir
4. **Doğrulama:** Silme işlemi log'lanır, imzalı rapor üretilir

**İmha Dokümanı:**
- İmha tarihi, veri miktarı, yöntem
- Sorumlu araştırmacı imzası
- Kurumsal arşivde 10 yıl saklanır (KVKK uyumluluk kanıtı için)

---

## 7. KATILIMCI HAKLARI (KVKK md. 11)

### **7.1 Veri Sahibinin Hakları**

Katılımcılar aşağıdaki haklara sahiptir:

#### **a) Bilgi Talep Etme Hakkı**
- Verilerinin işlenip işlenmediğini öğrenme
- İşlenmişse buna ilişkin bilgi talep etme

#### **b) Erişim Hakkı (Right to Access)**
- Kendi verilerine erişim talep etme
- **Uygulama:** `participant_id` ile sorgu

#### **c) Düzeltme Hakkı**
- Yanlış/eksik veri varsa düzeltme talebi
- **Uygulama:** E-mail ile talep → manuel düzeltme

#### **d) Silme Hakkı (Right to be Forgotten)**
- Verilerinin silinmesini talep etme
- **Uygulama:**
  ```sql
  DELETE FROM participants WHERE participant_id = 'xxx';
  ```
- **İstisna:** Bilimsel araştırma için gerekli ise (KVKK md. 7/3-d) silme reddedilebilir (gerekçe ile)

#### **e) İtiraz Hakkı**
- Veri işlemeye itiraz etme
- **Uygulama:** İtiraz form dolduğunda işleme durdurulur, veri silinir

### **7.2 Hak Kullanım Prosedürü**

**Başvuru Yöntemi:**
1. E-mail: bakim-pusulasi@destek.com
2. Kimlik doğrulama (participant_id veya form doldurma tarihi)
3. **30 gün** içinde cevap (KVKK md. 13)

**Başvuru Formu Template:**
```
Konu: KVKK Kapsamında Veri Sahibi Hakkı Talebi

Talep Eden: [İsim - Opsiyonel]
Participant ID: [UUID]
Form Doldurma Tarihi: [Tarih]
Talep: [Bilgi talep / Düzeltme / Silme / İtiraz]
Gerekçe: [...]

İmza:
Tarih:
```

---

## 8. VERİ İHLALİ YÖNETİMİ

### **8.1 Veri İhlali Senaryoları**

**Olası Riskler:**
- Yetkisiz erişim (hacking)
- Veri sızıntısı (data breach)
- Yanlışlıkla açık paylaşım (misconfiguration)
- Insider threat (yetkili kişi kötü niyetli)

### **8.2 Veri İhlali Müdahale Planı**

**İhlal Tespit Edildiğinde (24 saat içinde):**
1. **Derhal durdurma:** İlgili sistem kapatılır
2. **Etki analizi:** Hangi veriler, kaç kişi etkilendi
3. **Bildirim (KVKK md. 12/5):**
   - **KVKK Kurumu'na:** 72 saat içinde
   - **Etkilenen katılımcılara:** Derhal (e-mail, SMS - eğer iletişim varsa)
4. **Forensic analiz:** Nasıl oldu, kim sorumlu
5. **Düzeltme:** Güvenlik açığı kapatılır
6. **Rapor:** Detaylı ihlal raporu (etik kurula + KVKK'ya)

**İhlal Bildirimi İçeriği (KVKK md. 12):**
- İhlal tarihi ve saati
- Etkilenen veri kategorileri
- Etkilenen kişi sayısı
- Olası sonuçlar
- Alınan/alınacak tedbirler

---

## 9. VERİ SORUMLUSU VE VERİ İŞLEYEN

### **9.1 Veri Sorumlusu (Data Controller)**

**[Üniversite Adı] / [Araştırmacı Adı]**
- **Adres:** [Kurum Adresi]
- **E-mail:** bakim-pusulasi@destek.com
- **Telefon:** [Telefon]
- **VERBİS Kayıt No:** [Kayıt sonrası]

**Sorumluluklar:**
- Veri güvenliğini sağlamak
- KVKK uyumluluğunu sağlamak
- Katılımcı haklarını yerine getirmek

### **9.2 Veri İşleyen (Data Processor)**

**Supabase Inc.**
- **Lokasyon:** EU (Frankfurt)
- **Sözleşme:** Data Processing Agreement (DPA) imzalanacak
- **Sorumluluk:** Sadece veri depolama, işleme talimatları veri sorumlusundan

---

## 10. KVKK UYUMLULUK DENETİMİ

### **10.1 İç Denetim**

**Periyodik Kontrol (3 ayda bir):**
- Erişim logları incelemesi
- Güvenlik açığı taraması (penetration test)
- Şifreleme kontrolü
- Backup test

**Checklist:**
- [ ] Tüm veriler şifreli mi?
- [ ] Yetkisiz erişim var mı?
- [ ] Katılımcı talepleri zamanında cevaplanmış mı?
- [ ] Veri minimizasyonu uygulanıyor mu?

### **10.2 VERBİS Kayıt**

**KVKK md. 16 uyarınca:**
- Eğer **50+ kişiden sağlık verisi** toplanıyorsa → **VERBİS kaydı zorunlu**
- **Kayıt süresi:** Veri toplamaya başlamadan önce
- **Kayıt linki:** https://verbis.kvkk.gov.tr

---

## 11. SORUMLU ARAŞTIRMACI BEYANI

Ben, sorumlu araştırmacı olarak:

✅ Bu araştırmada **KVKK'ya tam uyum** sağlayacağımı,

✅ Katılımcıların **gizlilik ve güvenliğini** en üst düzeyde koruyacağımı,

✅ Sadece **bilimsel amaçlı** veri kullanacağımı,

✅ Veri ihlali durumunda **yasal yükümlülüklerimi** yerine getireceğimi,

✅ Katılımcı **haklarını** tam olarak sağlayacağımı,

beyan ederim.

**Araştırmacı Adı:** [Adınız Soyadınız]  
**İmza:**  
**Tarih:**  

---

## 12. EKLER

**EK-1:** Supabase Data Processing Agreement (DPA)  
**EK-2:** Veri İhlali Müdahale Planı (Detaylı)  
**EK-3:** Katılımcı Hak Talep Formu Template  
**EK-4:** VERBİS Kayıt Belgesi (veri toplama sonrası eklenecek)  

---

**KVKK Uyumluluk Onayı:**  
[Üniversite/Kurum KVKK Sorumlusu İmza]  
Tarih: [GG/AA/YYYY]





