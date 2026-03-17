# Torius Atlas – Project TODO

## Completed Features

- [x] Hero bölümünün arka plan görüntüsünü güncelle (WhatsApp resmi ile)
- [x] Shop sayfasını oluştur (ürün listeleme, kategori filtreleme, arama)
- [x] Sepet işlevselliği (ürün ekleme, çıkarma, miktar güncelleme)
- [x] Ürün detay modal'ı
- [x] Navbar'a Shop linki ekle
- [x] Ürün yönetimi API endpoint'leri (createProduct, updateProduct, deleteProduct)
- [x] Ürün görselleri yönetimi (addProductImage, getProductImages)
- [x] Stripe paketini yükle
- [x] Stripe ortam değişkenlerini ekle
- [x] Stripe helper fonksiyonları (createCheckoutSession, getCheckoutSession)
- [x] Sipariş veritabanı tabloları (orders, orderItems)
- [x] Sipariş yönetimi API endpoint'leri (createOrder, updateOrderStatus, getOrdersByUserId)
- [x] Shop router test'leri yazıldı ve geçti

## Pending Features

- [x] Stripe checkout session oluşturma router'ını ekle
- [x] Stripe webhook endpoint'ini oluştur (/api/stripe/webhook)
- [x] Sipariş tamamlama işlemini implement et
- [x] Müşteri sipariş geçmişi sayfası oluştur
- [x] Ödeme başarısı/başarısızlık sayfaları
- [x] Sepet kalıcılığı (localStorage)
- [x] SEO optimizasyonu (meta tags, structured data, sitemap)
- [x] Müşteri hesabı sayfası (Account.tsx)
- [x] Admin panel route'unu App.tsx'e ekle (/admin)
- [x] Admin panel Navbar linkini ekle (admin hesaplarında görünür)
- [x] Brand panel sayfasını oluştur (email/şifre ile kayıt)
- [x] Ürün yönetimi sayfasını oluştur (markalar için)
- [x] Beden/renk yönetimi sayfasını oluştur
- [x] Sipariş görüntüleme sayfasını oluştur (markalar için)
- [x] Shop sayfasına "Marka Ol" butonu ve register dialog'u ekle
- [x] Ürün resim yükleme sistemi (ProductImageUpload bileşeni)
- [x] Shop sayfasındaki buton "Brand Login" olarak değiştirildi
- [x] BrandAuthDialog - Kayıt ve Giriş sekmelerini birleştir
- [x] Ürün silme hatası düzeltildi (deleteProduct mutation eklendi)
- [x] Ürün oluşturma formuna resim yükleme alanı eklendi
- [x] Ürün düzenleme formu eklendi (ad, fiyat, açıklama, kategori)
- [x] Tüm siteyi İngilizceye çevir (UI, formlar, hata mesajları)
- [x] BrandPanel, BrandAuthDialog, BrandSizeColorManagement, BrandOrderManagement İngilizceye çevrildi
- [ ] E-mail bildirimleri (sipariş onayı, kargo takibi)
- [ ] Envanter yönetimi (stok güncelleme)
- [ ] İade/geri ödeme işlemleri
- [ ] Vergi hesaplaması (Stripe Tax entegrasyonu)

## Known Issues

- Dev server'da eski hata mesajı görünebiliyor (esbuild cache) — yeniden başlatma ile çözülüyor
- Stripe test mode kurulumu gerekli (sandbox claim)

## Notes

- Tüm test'ler başarıyla geçiyor (15 test, 4 test dosyası)
- Hero bölümü yeni görüntü ile güncellendi
- Shop sayfası tam işlevsel (listeleme, filtreleme, sepet, detay)
- Stripe entegrasyonu başlatıldı ama checkout flow tamamlanmadı
- [x] Ürün silme hatası düzeltildi (getProductsByBrand'a active filter eklendi)
- [ ] Sosyal medya paylaşım bileşeni oluştur (Instagram, Facebook, Twitter, Pinterest, WhatsApp)
- [ ] Shop sayfasında ürün paylaşım düğmeleri ekle
- [ ] Brand Panel'de ürün paylaşım düğmeleri ekle
- [x] Shop'ta ürün resimlerinin gözükmemesi sorunu düzeltildi (S3 upload sistemi eklendi)
- [ ] Envanter yönetim sistemi - sipariş sırasında stok azaltma
- [ ] Brand Panel'de stok görüntüleme ve yönetimi
- [ ] Düşük stok uyarıları ve bildirimleri
- [x] Sosyal medya paylaşım düğmeleri (Instagram, Facebook, Twitter, Pinterest, WhatsApp)
- [x] Shop sayfasında ürün paylaşım düğmeleri
- [x] Ürün detay modal'ında paylaşım düğmeleri
- [x] Brand Panel'de ürün paylaşım düğmeleri
- [x] Wishlist (istek listesi) özelliği - veritabanı şeması ve tRPC endpoint'leri
- [x] Wishlist sayfası oluşturuldu
- [x] App.tsx'e Wishlist route'u eklendi
- [x] Stokta olmayan ürün wishlist'e eklendiğinde uyarı mesajı göster
- [x] Shop'ta out-of-stock ürünler için uyarı ve wishlist düğmesi ekle
- [x] Ana sayfaya moda defilesi temalı resim ekle
- [x] Ürün tanıtım videoları ekleme özelliği - veritabanı şeması ve tRPC endpoint'leri
- [ ] Brand Panel'de video yükleme UI'ı
- [ ] Shop'ta video görüntüleme
