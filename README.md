# 🧭 Bakım Pusulası

**Bakım verenlerin yolculuğunda kanıta dayalı rehberlik sunan açık kaynak dijital platform**

---

## 📖 Proje Hakkında

Bakım Pusulası, bakım veren desteğini bir lüks olmaktan çıkarıp, proaktif, ölçülebilir ve şefkatli bir bakım standardına dönüştüren yaşayan bir dijital rehberdir. Bu platform, hem sağlık profesyonellerini kanıta dayalı araçlarla güçlendirmeyi hem de bakım verenlere bu zorlu yolculukta yalnız olmadıklarını hissettiren bir sığınak sunmayı amaçlar.

### 🎯 Misyon
> "Görünmez hastalar" olan bakım verenleri güçlendirmek ve desteklemek için bilimsel temelli, erişilebilir ve şefkatli çözümler sunmak.

### ✨ Temel Özellikler

#### 🔬 Bilimsel Tanılama
- **Zarit Bakım Yükü Ölçeği (ZBI-12)** ile objektif değerlendirme
- Kişiselleştirilmiş sonuç yorumları
- PDF rapor oluşturma ve yazdırma
- Sonuçları sağlık ekibi ile paylaşma özelliği

#### 🛠️ Kapsamlı Araç Kiti
- **Teknik Beceriler**: Bası yarası önleme, güvenli transfer, ilaç yönetimi
- **Duygusal Dayanıklılık**: Stres yönetimi, self-care, suçluluk hissiyle başa çıkma
- **Sistem Navigasyonu**: Sağlık hakları, mali destek, yasal bilgiler

#### 🤝 Güçlü Destek Ağı
- Türkiye genelindeki destek kaynaklarının haritası
- Dernekler, vakıflar ve sağlık kurumları rehberi
- Proaktif "Nasılsınız?" destek modeli
- Acil durum iletişim hatları

#### 🎤 Sunum Modu
- Kongre sunumları için özel tasarım
- "P" tuşu ile aktif/deaktif
- Tam ekran, büyütülmüş metin
- PowerPoint alternatifi olarak kullanım

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18.18.0 veya üzeri
- npm veya yarn

### Adım Adım Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/bakim-pusulasi/bakim-pusulasi.git
cd bakim-pusulasi

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

### Production Build

```bash
# Production build oluşturun
npm run build

# Production server başlatın
npm start
```

---

## 🛠️ Teknoloji Yığını

- **Framework**: Next.js 15 (App Router)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS
- **Animasyonlar**: Framer Motion
- **İkonlar**: Heroicons
- **PDF**: react-to-print
- **Deployment**: Vercel

---

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── layout.tsx          # Ana layout
│   ├── page.tsx           # Ana sayfa
│   ├── tanilama/          # Zarit Ölçeği modülü
│   ├── arac-kiti/         # Araç kiti modülü
│   └── destek-agi/        # Destek ağı modülü
├── components/            # React bileşenleri
│   ├── ui/               # Temel UI bileşenleri
│   ├── layout/           # Layout bileşenleri
│   └── tanilama/         # Tanılama özgü bileşenler
├── lib/                  # Utility fonksiyonları
│   ├── zarit-questions.ts # Zarit ölçeği veri yapısı
│   └── presentation-context.tsx # Sunum modu yönetimi
└── app/globals.css       # Global stiller
```

---

## 🎯 Kullanım

### Temel Kullanım
1. **Ana Sayfa**: Projeye genel bakış ve başlangıç noktası
2. **Tanılama**: Zarit Bakım Yükü Ölçeği ile değerlendirme
3. **Araç Kiti**: Kategorilenmiş rehber ve kaynaklar
4. **Destek Ağı**: Yerel ve ulusal destek kaynaklarına erişim

### Sunum Modu
- Klavyede **P** tuşuna basarak aktif edin
- **ESC** tuşu ile deaktif edin
- Kongre sunumları için optimize edilmiştir
- Tam ekran ve büyütülmüş fontlar

### Zarit Ölçeği Kullanımı
1. Tanılama modülüne gidin
2. 12 soruyu dürüstçe yanıtlayın
3. Sonuçları görüntüleyin ve yorumlayın
4. PDF olarak kaydedin veya yazdırın

---

## 🤝 Katkıda Bulunma

Bu açık kaynak proje katkılarınızı memnuniyetle karşılar!

### Katkı Türleri
- 🐛 Hata raporları
- 💡 Özellik önerileri
- 📝 Dokümantasyon iyileştirmeleri
- 🔧 Kod katkıları
- 🌍 Çeviri desteği

### Katkı Süreci
1. Bu repository'i fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Kod Standartları
- TypeScript kullanın
- ESLint ve Prettier kurallara uyun
- Bileşenler için JSDoc yorumları ekleyin
- Test yazın (gelecekte eklenecek)

---

## 📊 Proje İstatistikleri

- **Modüller**: 3 ana modül (Tanılama, Araç Kiti, Destek Ağı)
- **Bileşenler**: 20+ React bileşeni
- **Sorular**: 12 bilimsel Zarit ölçeği sorusu
- **Kaynaklar**: 12+ rehber ve kaynak
- **Destek Noktaları**: 8+ kayıtlı destek kaynağı

---

## 🔬 Bilimsel Temeller

### Zarit Bakım Yükü Ölçeği
- Uluslararası geçerliliği kanıtlanmış
- 40+ ülkede kullanılan standart ölçek
- Güvenilirlik katsayısı: α > 0.85
- Kısa form (ZBI-12) 5-10 dakikada tamamlanır

### Kanıta Dayalı Yaklaşım
- Tüm rehberler peer-reviewed kaynaklara dayanır
- Güncel araştırma bulgularını içerir
- Uzman görüşleri ile desteklenir

---

## 🌍 Sosyal Etki

### Hedef Kitle
- **Birincil**: Evde bakım veren aile üyeleri
- **İkincil**: Sağlık profesyonelleri
- **Üçüncül**: Politika yapıcılar ve araştırmacılar

### Beklenen Etkiler
- Bakım veren yükünün erken tespiti
- Uygun destek kaynaklarına yönlendirme
- Sağlık sistemi maliyetlerinin azaltılması
- Bakım kalitesinin artırılması

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

```
MIT License

Copyright (c) 2025 Bakım Pusulası Ekibi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 👥 Ekip ve Teşekkürler

### Proje Ekipi
- **Proje Lideri & Geliştirici**: Dr. Sadık Barış Adıgüzel
  - Arş. Gör. Dr., Sağlık Bilimleri Üniversitesi Antalya Eğitim ve Araştırma Hastanesi
  - Aile Hekimliği Anabilim Dalı, Antalya, Türkiye
- **Danışman**: Doç. Dr. Mehmet Özen
- **Sunum**: VII. Uluslararası Evde Sağlık ve Sosyal Hizmetler Kongresi (13-16 Kasım 2025, Ankara)

### Teşekkürler
- Türkiye Alzheimer Derneği
- Palyatif Bakım Derneği
- Tüm geri bildirimde bulunan bakım verenler
- Açık kaynak topluluğu

---

## 📞 İletişim

- **Web**: https://bakimpusulasi.netlify.app
- **GitHub**: https://github.com/Baro007/bakim-pusulasi
- **Geliştirici**: https://sadikbarisadiguzel.com/
- **E-posta**: sadikbarisadiguzel@gmail.com 

---

## 🔮 Gelecek Planları

- [ ] Mobil uygulama (React Native)
- [ ] Video rehber kütüphanesi
- [ ] Topluluk forumu
- [ ] Çoklu dil desteği (İngilizce, Almanca)
- [ ] AI-destekli kişiselleştirilmiş öneriler
- [ ] Wearable cihaz entegrasyonu
- [ ] Telemedicine entegrasyonu

---

<div align="center">

**💖 Bu proje sevgiyle geliştirilmiştir**

*Bakım verenlerin yolculuğunda yalnız olmadıklarını bilmeleri için...*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4)](https://tailwindcss.com/)

</div>
