# Torius Atlas – Tasarım Fikirleri

## Proje Özeti
Torius Atlas, Türk moda, yaşam tarzı ve aksesuar markalarını ABD pazarına taşıyan bir platform. Pop-up retail etkinlikleri aracılığıyla Türk yaratıcılığını Amerikan tüketicisiyle buluşturuyor.

---

<response>
<idea>

## Yaklaşım 1: "Levantine Modernism" – Doğu Batı Köprüsü

**Design Movement:** Yeni-Osmanlı Minimalizm / Levant Modernizm

**Core Principles:**
- Türk geometrik motiflerini modern grid yapılarıyla harmanlama
- Siyah & krem zemin üzerine altın vurgular – lüks ama ağır değil
- Asimetrik bölüm geçişleri ve diyagonal kesimler
- Yatay kaydırma hissi veren bölüm düzeni

**Color Philosophy:**
- Ana: Derin Gece Mavisi `#0D1B2A` – güven, derinlik, uluslararası prestij
- İkincil: Sıcak Krem `#F5EDD8` – Türk çayı, kültür, sıcaklık
- Vurgu: Antik Altın `#C9A84C` – lüks, zanaat, Osmanlı mirası
- Nötr: Koyu Grafit `#1E2A38`

**Layout Paradigm:**
- Sol-sağ asimetrik iki sütunlu hero bölümü
- Büyük tipografi blokları ile görseller arasında gerilim
- Bölümler arası diyagonal SVG divider'lar
- Sticky sol navigasyon (desktop)

**Signature Elements:**
- Türk geometrik desen (sekizgen yıldız) – arka plan doku olarak, düşük opaklık
- Altın çizgi vurguları – başlık altlarında, kart kenarlıklarında
- Büyük Arap/Latin harfi karışımı tipografi oyunları

**Interaction Philosophy:**
- Hover'da kartlar hafifçe yukarı kayar, altın kenarlık belirir
- Scroll'da bölümler soldan/sağdan süzülür
- Cursor yakınında hafif paralaks efekti

**Animation:**
- Entrance: `translateX(-40px) opacity 0 → 1` (0.6s ease-out)
- Hover cards: `translateY(-6px)` + `box-shadow` derinleşmesi
- Hero text: Karakter bazlı stagger animasyonu

**Typography System:**
- Display: `Playfair Display` – zarif, klasik, güçlü
- Body: `DM Sans` – modern, okunabilir, nötr
- Accent: `Cormorant Garamond` – başlık vurgularında italik kullanım

</idea>
<probability>0.07</probability>
</response>

---

<response>
<idea>

## Yaklaşım 2: "Editorial Luxury" – Moda Dergisi Estetiği

**Design Movement:** High-Fashion Editorial / Brutalist Typography

**Core Principles:**
- Büyük, cesur tipografi – görsel hiyerarşinin baskın unsuru
- Siyah-beyaz zemin üzerine kırmızı vurgular (Türk bayrağı renk kodlaması)
- Asimetrik fotoğraf yerleşimleri – köşeye taşmış, kırpılmış kareler
- "Sayfa" metaforu – her bölüm bir dergi sayfası gibi

**Color Philosophy:**
- Ana: Saf Beyaz `#FAFAFA` – temizlik, premium, nefes alma alanı
- İkincil: Derin Siyah `#0A0A0A` – güç, kontrast, editorial
- Vurgu: Türk Kırmızısı `#C8102E` – kimlik, tutku, Türkiye
- Nötr: Soğuk Gri `#8A8A8A`

**Layout Paradigm:**
- Full-width editorial grid – 12 sütun, bazı elemanlar 2-3 sütun taşar
- Büyük boşluklar – "breathing room" ilkesi
- Fotoğraflar metin bloklarıyla çakışır, üst üste gelir
- Dikey ve yatay tipografi karışımı

**Signature Elements:**
- Büyük harf, geniş letter-spacing başlıklar
- Kırmızı çizgi/blok vurgular – önemli metinlerin yanında
- Siyah-beyaz fotoğraflar üzerine kırmızı overlay efekti

**Interaction Philosophy:**
- Hover'da fotoğraflar renkten siyah-beyaza geçer (veya tersi)
- Scroll'da büyük tipografi parallax ile yavaş kayar
- CTA butonları: solid kırmızı, hover'da siyah

**Animation:**
- Hero: Büyük metin yukarıdan aşağı düşer (stagger 0.1s)
- Fotoğraf reveal: clip-path `inset(100% 0 0 0)` → `inset(0% 0 0 0)`
- Bölüm geçişleri: fade + slight scale (1.02 → 1)

**Typography System:**
- Display: `Bebas Neue` – sert, editorial, güçlü
- Body: `Source Serif 4` – okunabilir, zarif
- Accent: `Italiana` – başlık vurgularında

</idea>
<probability>0.08</probability>
</response>

---

<response>
<idea>

## Yaklaşım 3: "Bosphorus Noir" – Karanlık Lüks

**Design Movement:** Dark Luxury / Art Deco Revival

**Core Principles:**
- Koyu zemin üzerine altın ve krem detaylar – gece kulübü değil, müze estetiği
- Geometrik Art Deco motifler – Türk-Amerikan sentezi
- Yavaş, nefes alan animasyonlar – acele değil, prestij hissi
- Tam ekran bölümler – her bölüm kendi dünyası

**Color Philosophy:**
- Ana: Derin Lacivert-Siyah `#080C14` – gece, derinlik, gizemlilik
- İkincil: Antik Altın `#D4AF37` – lüks, değer, zanaat
- Üçüncül: Krem Beyaz `#EDE8DC` – metin, nefes alanı
- Vurgu: Bakır `#B87333` – sıcaklık, Anadolu toprağı

**Layout Paradigm:**
- Full-screen sections (100vh) – her bölüm tam ekran
- Merkez hizalı değil: sol-ağırlıklı metin, sağda görsel
- Büyük negatif alan kullanımı
- Sticky navigation – şeffaf → koyu geçiş scroll'da

**Signature Elements:**
- İnce altın çizgi çerçeveler – kartlar ve bölüm başlıklarında
- Art Deco geometrik arka plan desenleri (düşük opaklık)
- Büyük Türk kültürel görselleri – İstanbul silueti, tekstil dokuları

**Interaction Philosophy:**
- Hover: Altın parıltı efekti (radial gradient reveal)
- Scroll: Yavaş parallax – arka plan görselleri öne çıkar
- Butonlar: Outline → filled geçişi, altın renk

**Animation:**
- Hero: Fade-in + upward drift (0.8s ease-out)
- Cards: Stagger entrance (0.15s delay arası)
- Gold line: width 0 → 100% (draw efekti)

**Typography System:**
- Display: `Cormorant Garamond` – zarif, tarihi, prestijli
- Body: `Jost` – geometrik, modern, temiz
- Accent: `Cinzel` – başlıklarda küçük caps

</idea>
<probability>0.09</probability>
</response>

---

## Seçilen Yaklaşım: Yaklaşım 2 – "Editorial Luxury"

Torius Atlas'ın hedef kitlesi (Amerikalı tüketiciler, alıcılar, endüstri profesyonelleri) için en etkili yaklaşım editorial lüks estetiği. Türk kırmızısı ile siyah-beyaz kontrast, hem Türk kimliğini yansıtıyor hem de uluslararası bir moda platformunun güvenilirliğini aktarıyor.
