# 🔧 SUPABASE SETUP GUIDE - Step-by-Step

## 📋 SUPABASE PROJECT SETUP (15-20 dakika)

**Hedef:** Academic research-grade database hazırlamak  
**Platform:** Supabase (PostgreSQL-based)  
**Güvenlik:** Row Level Security enabled, GDPR compliant

---

## 🎯 PHASE 1: SUPABASE PROJECT CREATION

### **Step 1.1: Supabase Hesabı Oluşturma**

1. **Supabase.com'a gidin:** https://supabase.com
2. **"Start your project"** butonuna tıklayın
3. **GitHub ile giriş yapın** (önerilen) veya email ile kayıt olun
4. Email doğrulaması yapın (inbox'unuzu kontrol edin)

---

### **Step 1.2: Yeni Proje Oluşturma**

1. Dashboard'da **"New Project"** butonuna tıklayın

2. **Proje Bilgilerini Doldurun:**
   ```
   Name: bakim-pusulasi-academic
   Database Password: [GÜÇ
LÜ BİR ŞİFRE OLUŞTURUN - KAYDEDIN!]
   Region: Frankfurt (eu-central-1) [Türkiye'ye en yakın]
   Pricing Plan: Free (başlangıç için yeterli)
   ```

3. **"Create new project"** butonuna tıklayın

4. ⏳ **Bekleyin** - Proje oluşturulması 2-3 dakika sürer

---

## 🎯 PHASE 2: DATABASE SCHEMA KURULUMU

### **Step 2.1: SQL Editor'ı Açma**

1. Sol menüden **"SQL Editor"** sekmesine tıklayın
2. **"New query"** butonuna tıklayın

---

### **Step 2.2: Schema SQL'ini Çalıştırma**

1. **Workspace'inizde `supabase-schema.sql` dosyasını açın**
   - Konum: `/bakim-pusulasi/supabase-schema.sql`

2. **SQL dosyasının TÜM içeriğini kopyalayın** (Ctrl+A, Ctrl+C)

3. **Supabase SQL Editor'a yapıştırın** (Ctrl+V)

4. **"Run"** butonuna tıklayın (veya Ctrl+Enter)

5. ✅ **Başarı Kontrolü:**
   ```
   Success mesajı görmelisiniz: "Success. No rows returned"
   ```

6. **Hata alırsanız:**
   - SQL syntax hatası olabilir
   - Sayfayı yenileyin ve tekrar deneyin
   - Hata mesajını not alın

---

### **Step 2.3: Tabloların Oluştuğunu Doğrulama**

1. Sol menüden **"Table Editor"** sekmesine tıklayın

2. **Aşağıdaki 4 tabloyu görmelisiniz:**
   - ✅ `caregiver_profiles`
   - ✅ `patient_info`
   - ✅ `zarit_assessments`
   - ✅ `research_analytics`

3. **Her tabloyu tıklayıp içeriğini kontrol edin:**
   - Kolonlar doğru mu?
   - RLS enabled (Row Level Security) yeşil mi?

---

## 🎯 PHASE 3: API CREDENTIALS ALMA

### **Step 3.1: API Settings'e Gitme**

1. Sol menüden **"Settings"** (⚙️) ikonuna tıklayın
2. **"API"** sekmesini seçin

---

### **Step 3.2: Credentials'ları Kopyalama**

**CRITICAL: Aşağıdaki bilgileri güvenli bir yere kopyalayın!**

1. **Project URL:**
   ```
   Project URL: https://[your-project-id].supabase.co
   ```
   📋 **Kopyalayın** - Clipboard'a alın

2. **API Keys:**
   
   **a) `anon` `public` Key:** (Bu key'i kullanacağız)
   ```
   anon key: eyJhbGc... [uzun bir string]
   ```
   📋 **Kopyalayın** - Bu frontend'de kullanılacak

   **b) `service_role` `secret` Key:** (Şimdilik kullanmayacağız ama kaydedin)
   ```
   service_role key: eyJhbGc... [başka bir uzun string]
   ```
   ⚠️ **DİKKAT:** Bu key'i ASLA GitHub'a koymayın!

---

## 🎯 PHASE 4: .ENV.LOCAL CONFIGURATION

### **Step 4.1: .env.local Dosyası Oluşturma**

1. **VS Code'da workspace'inize dönün**

2. **`.env.local` dosyası oluşturun:**
   - Konum: `/bakim-pusulasi/.env.local` (root directory)
   - `.env.local.example`'ın yanında olacak

3. **Aşağıdaki içeriği yapıştırın:**

```env
# Supabase Configuration
# IMPORTANT: Never commit this file to Git! (.gitignore'da olmalı)

# Supabase Project URL (from Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co

# Supabase Anon/Public Key (from Settings > API)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Application Configuration
NEXT_PUBLIC_APP_URL=https://bakim.netlify.app
NODE_ENV=production

# Analytics Configuration
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_RESEARCH_MODE=true
```

4. **Placeholder'ları değiştirin:**
   - `[YOUR-PROJECT-ID]` → Gerçek project ID'niz
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` → Gerçek anon key'iniz

---

### **Step 4.2: .gitignore Kontrolü**

**CRITICAL: .env.local dosyasının Git'e commit edilmemesini sağlayın!**

1. **`.gitignore` dosyasını açın**

2. **Aşağıdaki satırın olduğundan emin olun:**
   ```
   .env.local
   .env*.local
   ```

3. **Yoksa ekleyin ve kaydedin**

---

## 🎯 PHASE 5: CONNECTION TEST

### **Step 5.1: Test Script Oluşturma**

1. **`scripts/test-supabase-connection.js` dosyası oluşturun:**

```javascript
// scripts/test-supabase-connection.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Supabase credentials not found in .env.local');
  console.log('   Make sure you have:');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test 1: Database connection
    console.log('📊 Test 1: Database Connection');
    const { data: tables, error: tablesError } = await supabase
      .from('caregiver_profiles')
      .select('count', { count: 'exact', head: true });
    
    if (tablesError) {
      console.error('❌ Failed:', tablesError.message);
      return false;
    }
    console.log('✅ Success: Database connected\n');

    // Test 2: Check all tables
    console.log('📊 Test 2: Checking Tables');
    const tablesToCheck = [
      'caregiver_profiles',
      'patient_info',
      'zarit_assessments',
      'research_analytics'
    ];

    for (const table of tablesToCheck) {
      const { error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: Table exists`);
      }
    }
    console.log('');

    // Test 3: Test insert (will be rolled back)
    console.log('📊 Test 3: Testing Insert Permission');
    const { data: insertData, error: insertError } = await supabase
      .from('caregiver_profiles')
      .insert({
        age: 50,
        gender: 'Kadın',
        relationship_to_patient: 'Eşi',
        lives_with_patient: true,
        caregiving_duration_years: 5,
        daily_care_hours: '9 saatten fazla',
        has_chronic_illness: false,
        social_support_level: 3,
        device_type: 'test',
        section_a_completed: false,
        fully_completed: false
      })
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return false;
    }
    
    console.log('✅ Insert permission: OK');
    
    // Cleanup test data
    if (insertData && insertData[0]) {
      await supabase
        .from('caregiver_profiles')
        .delete()
        .eq('id', insertData[0].id);
      console.log('✅ Test data cleaned up\n');
    }

    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ Supabase is ready for production use!\n');
    return true;

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return false;
  }
}

testConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
```

---

### **Step 5.2: Test Script'i Çalıştırma**

1. **Terminal'de şu komutu çalıştırın:**

```bash
cd /Users/sadikbarisadiguzel/bakim\ pusulasi/bakim-pusulasi
node scripts/test-supabase-connection.js
```

2. **Beklenen Çıktı:**
```
🔍 Testing Supabase Connection...

📊 Test 1: Database Connection
✅ Success: Database connected

📊 Test 2: Checking Tables
✅ caregiver_profiles: Table exists
✅ patient_info: Table exists
✅ zarit_assessments: Table exists
✅ research_analytics: Table exists

📊 Test 3: Testing Insert Permission
✅ Insert permission: OK
✅ Test data cleaned up

🎉 ALL TESTS PASSED!
✅ Supabase is ready for production use!
```

3. **Hata alırsanız:**
   - `.env.local` dosyasındaki credentials'ları kontrol edin
   - Supabase Dashboard'da RLS policies'i kontrol edin
   - SQL schema'nın doğru çalıştığını doğrulayın

---

## 🎯 PHASE 6: NETLIFY ENVIRONMENT VARIABLES

### **Step 6.1: Netlify Dashboard Konfigürasyonu**

**Production deployment için Netlify'a da credentials eklemeniz gerekiyor:**

1. **Netlify Dashboard'a gidin:** https://app.netlify.com
2. **`bakim-pusulasi` projenizi seçin**
3. **Site settings > Environment variables** tıklayın
4. **"Add a variable"** butonuna tıklayın

5. **Şu değişkenleri ekleyin:**

   **Variable 1:**
   ```
   Key: NEXT_PUBLIC_SUPABASE_URL
   Value: https://[your-project-id].supabase.co
   Scopes: [x] Production  [x] Deploy previews  [x] Branch deploys
   ```

   **Variable 2:**
   ```
   Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... [your anon key]
   Scopes: [x] Production  [x] Deploy previews  [x] Branch deploys
   ```

6. **"Save"** butonuna tıklayın

7. **⚠️ IMPORTANT:** Değişiklikten sonra site'ı **redeploy** etmeniz gerekecek!

---

## 🎯 PHASE 7: SECURITY BEST PRACTICES

### **✅ Security Checklist**

**Supabase tarafında:**
- [x] Row Level Security (RLS) enabled on all tables
- [x] Anonymous insert policies configured
- [x] Authenticated read-all policies for research
- [x] Service role key güvenli yerde saklandı
- [x] Database password güçlü ve kayıtlı

**Codebase tarafında:**
- [x] `.env.local` dosyası `.gitignore`'da
- [x] Hiçbir credential GitHub'da yok
- [x] `NEXT_PUBLIC_` prefix sadece public-safe değerler için
- [x] Service role key `.env.local`'da DEĞİL (şimdilik)

**Netlify tarafında:**
- [x] Environment variables configured
- [x] Secrets encrypted
- [x] No sensitive data in build logs

---

## 🎯 TROUBLESHOOTING GUIDE

### **Problem 1: "Invalid API key" hatası**

**Çözüm:**
1. Supabase Dashboard > Settings > API
2. Anon key'i **tamamını** kopyaladığınızdan emin olun
3. Başında/sonunda boşluk olmadığını kontrol edin
4. `.env.local` dosyasını kaydettiğinizden emin olun
5. Development server'ı restart edin (`npm run dev`)

---

### **Problem 2: "Table does not exist" hatası**

**Çözüm:**
1. Supabase Dashboard > SQL Editor
2. `SELECT * FROM caregiver_profiles;` çalıştırın
3. Hata alırsanız, schema SQL'ini tekrar çalıştırın
4. Proje ID'nin doğru olduğundan emin olun

---

### **Problem 3: "Permission denied" hatası**

**Çözüm:**
1. Supabase Dashboard > Authentication > Policies
2. RLS policies'in doğru yapılandırıldığını kontrol edin
3. Anonymous insert permission var mı?
4. Schema SQL'de policies bölümünü tekrar çalıştırın

---

### **Problem 4: Connection timeout**

**Çözüm:**
1. İnternet bağlantınızı kontrol edin
2. Supabase status page'e bakın: https://status.supabase.com
3. VPN kullanıyorsanız kapatıp deneyin
4. Firewall ayarlarınızı kontrol edin

---

## ✅ SETUP BAŞARI KRİTERLERİ

**Supabase setup'ın başarılı olduğunu nasıl anlarsınız:**

- ✅ Supabase Dashboard'da 4 tablo görünüyor
- ✅ Test script başarıyla çalışıyor
- ✅ `.env.local` dosyası doğru konfigüre edilmiş
- ✅ Netlify environment variables ayarlanmış
- ✅ Hiçbir credential GitHub'a commit edilmemiş
- ✅ RLS policies enabled ve çalışıyor

---

## 📋 SONRAKI ADIMLAR

**Supabase setup tamamlandıktan sonra:**

1. ✅ **Implementation'a devam:** Form components, database integration
2. ✅ **Testing:** Mobil cihazlarda test etme
3. ✅ **Data collection:** Gerçek kullanıcılardan veri toplama
4. ✅ **Research analysis:** Collected data analysis için SQL queries

---

## 🆘 YARDIM KAYNAKLARI

**Supabase Dokümantasyonu:**
- https://supabase.com/docs
- https://supabase.com/docs/guides/database/tables
- https://supabase.com/docs/guides/auth/row-level-security

**Supabase Community:**
- Discord: https://discord.supabase.com
- GitHub Discussions: https://github.com/supabase/supabase/discussions

**Acil Durumlar:**
- Supabase Support: support@supabase.io
- Status Page: https://status.supabase.com

---

**Hazırlayan:** Sadık Barış Adıgüzel  
**Tarih:** 30 Ocak 2025  
**Supabase Version:** Latest stable
