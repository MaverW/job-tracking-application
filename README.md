## anTek - Job Tracking App

Modern bir iş takip uygulaması. Yöneticilerin günlük işleri ekleyip yönetebildiği, çalışanların ise güncel işleri takip edebildiği bir sistem.

---

<h2 align="center">Uygulama Görselleri</h2>

<p align="center">
  <img src="src/images/1.png" width="200">
  <img src="src/images/2.png" width="200">
  <img src="src/images/3.png" width="200">
  <br>
  <img src="src/images/4.png" width="200">
  <img src="src/images/5.png" width="200">
</p>

---

## Kullanılan Teknolojiler

* Ionic Framework
* Angular
* Firebase (Authentication & Firestore)

---

## Özellikler

*  Kullanıcı kayıt & giriş sistemi
*  İş ekleme / düzenleme / silme
*  İş durumu takibi (örn: başvuru yapıldı, görüşme vs.)
*  Yetkilendirme (Auth Guard)

---

## Kurulum

Projeyi klonla:

```bash
git clone https://github.com/kullaniciadi/anTek.git
cd anTek
```

Bağımlılıkları yükle:

```bash
npm install
```

Projeyi çalıştır:

```bash
ionic serve
```

---

## Ortam Değişkenleri

Firebase config bilgilerini `environment.ts` dosyasına eklemelisin:

```ts
export const environment = {
  firebase: {
    apiKey: "YOUR_KEY",
    authDomain: "",
    projectId: "",
    ...
  }
};
```

---

## Notlar

* Firebase güvenlik kurallarını doğru yapılandırmayı unutma
* API key bilgilerini public paylaşmamaya dikkat et

---

## Geliştirici

* Emin (GitHub: MaverW)

---

## Katkı

Projeyi beğendiysen bırakmayı unutma!
