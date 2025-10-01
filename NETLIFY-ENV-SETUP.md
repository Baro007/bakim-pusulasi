# NETLIFY ENVIRONMENT VARIABLES SETUP

## 🔐 Supabase Credentials Ekleme

### **Adım 1: Netlify Dashboard'a Git**
1. https://app.netlify.com
2. **Bakım Pusulası** projesini seç
3. **Site Settings** → **Environment Variables** (sol menüde)

---

## 📝 **EKLENECEK ENVIRONMENT VARIABLES**

### **1. NEXT_PUBLIC_SUPABASE_URL**
```
Variable name: NEXT_PUBLIC_SUPABASE_URL
Value: [Supabase Project URL]
Scope: All scopes (Production, Deploy Previews, Branch deploys)
```

**Değerini Nereden Bulursun:**
1. https://supabase.com/dashboard
2. Projeyi seç
3. **Settings** → **API**
4. **Project URL** kopyala
   - Örnek: `https://abcdefghijklmnop.supabase.co`

---

### **2. NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
Variable name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Supabase Anon Key]
Scope: All scopes (Production, Deploy Previews, Branch deploys)
```

**Değerini Nereden Bulursun:**
1. https://supabase.com/dashboard
2. Projeyi seç
3. **Settings** → **API**
4. **Project API keys** → **anon public** kopyala
   - Örnek: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (çok uzun bir string)

---

## ⚙️ **OPSIYONEL ENVIRONMENT VARIABLES**

### **3. NODE_VERSION** (Zaten Netlify.toml'de tanımlı)
```
Variable name: NODE_VERSION
Value: 20.11.0
Scope: All scopes
```

### **4. NPM_VERSION** (Zaten Netlify.toml'de tanımlı)
```
Variable name: NPM_VERSION
Value: 10.2.4
Scope: All scopes
```

---

## 🎯 **HIZLI SETUP KOMUTU (Netlify CLI ile)**

Eğer Netlify CLI kullanıyorsan:

```bash
# Netlify CLI install (eğer yoksa)
npm install -g netlify-cli

# Login
netlify login

# Link project
cd "/Users/sadikbarisadiguzel/bakim pusulasi/bakim-pusulasi"
netlify link

# Environment variables ekle
netlify env:set NEXT_PUBLIC_SUPABASE_URL "YOUR_SUPABASE_URL"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "YOUR_SUPABASE_ANON_KEY"
```

---

## ✅ **KONTROL CHECKLIST**

### **Netlify Dashboard'da Kontrol:**
- [ ] **Site Settings** → **Environment Variables** açık mı?
- [ ] `NEXT_PUBLIC_SUPABASE_URL` eklenmiş mi?
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` eklenmiş mi?
- [ ] Her iki variable **Production, Deploy Previews, Branch deploys** scope'unda mı?

### **Build Kontrol:**
- [ ] Environment variables eklendikten sonra **Trigger deploy** tıklandı mı?
- [ ] Deploy loglarında `NEXT_PUBLIC_SUPABASE_URL is set` görünüyor mu?
- [ ] Build başarılı mı? (yeşil ✅)

---

## 🚀 **DEPLOY TRIGGER**

Environment variables ekledikten sonra:

1. **Deploys** tab'ine git
2. **Trigger deploy** → **Clear cache and deploy site**
3. Build loglarını izle (~2-3 dakika)
4. **Published** görünce test et

---

## 🔍 **TROUBLESHOOTING**

### **Problem:** "Build still failing"
**Çözüm:**
1. Environment variables doğru mu kontrol et
2. **Clear cache and redeploy** yap
3. Build loglarında `Module not found: @supabase/supabase-js` hatası varsa:
   - `package.json`'da `@supabase/supabase-js` var mı kontrol et
   - Netlify build cache'i temizle

### **Problem:** "Supabase connection failed"
**Çözüm:**
1. Supabase URL ve Anon Key doğru mu kontrol et
2. Supabase RLS policies açık mı kontrol et (Tables → Policies)
3. Browser console'da hata mesajı var mı bak

### **Problem:** "Environment variables not visible in app"
**Çözüm:**
1. Variable name **mutlaka** `NEXT_PUBLIC_` prefix'i ile başlamalı
2. Deploy sonrası sayfayı hard refresh yap (Ctrl+Shift+R)

---

## 📊 **CURRENT SETUP STATUS**

✅ **Local (.env.local)**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

🔄 **Netlify (Environment Variables)**
```
Status: PENDING ⏳
Action Required: Add variables manually in Netlify dashboard
```

---

## 📞 **SUPPORT**

**Sorun devam ederse:**
- Netlify Support: https://answers.netlify.com
- Supabase Docs: https://supabase.com/docs

**Quick Links:**
- Netlify Env Vars Docs: https://docs.netlify.com/environment-variables/overview/
- Supabase JS Client: https://supabase.com/docs/reference/javascript

---

## ⚡ **NEXT STEPS AFTER SETUP**

1. ✅ Environment variables ekle (bu guide)
2. ✅ Deploy trigger
3. ✅ Test: https://[your-site].netlify.app/tanilama
4. ✅ Informed consent ekranı görünüyor mu?
5. ✅ Form doldurulabiliyor mu?
6. ✅ Supabase'e veri gidiyor mu?

---

**Last Updated:** [Bugünün Tarihi]  
**Status:** Ready for deployment after env vars are set ✅


