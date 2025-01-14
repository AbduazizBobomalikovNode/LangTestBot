# LangTestBot

**LangTestBot** – bu yangi foydalanuvchining ingliz tili bilim darajasini aniqlash va natijalarni boshqarish uchun mo‘ljallangan bot. U foydalanuvchilarni test qilish, natijalarni qayta ishlash va ma‘lumotlarni boshqarish jarayonlarini avtomatlashtiradi.

---

## Botning asosiy funksiyalari

1. **Ingliz tilini bilish darajasini baholash**: 
   - Bot foydalanuvchiga test yuboradi va natijani qaytaradi.

2. **Admin kanaliga ma‘lumot yuborish**: 
   - Yangi foydalanuvchi haqida ma‘lumot admin kanaliga avtomatik ravishda post qilinadi.

3. **Foydalanuvchilarni guruhlarga ajratish**: 
   - Admin foydalanuvchilarni tegishli guruhlarga ajratishi mumkin.

4. **Test yuborish imkoniyati**: 
   - Admin foydalanuvchilarga maxsus guruh orqali testlarni yuboradi.

5. **Maxsus guruhda test o‘tkazish**: 
   - Test qatnashchilari maxsus guruhga taklif qilinadi va u yerda test jarayonida ishtirok etadi.

6. **Natijalarni qayta ishlash**: 
   - Foydalanuvchilarga shaxsiy natijalar bot orqali yuboriladi.
   - Asosiy kanalda umumiy natijalar e‘lon qilinadi.

7. **Guruhni boshqarish**: 
   - Test tugagandan so‘ng, barcha foydalanuvchilar maxsus guruhdan avtomatik ravishda chiqarib yuboriladi.

---

## O‘rnatish

1. Repozitoriyani klonlash:
   ```bash
   git clone https://github.com/AbduazizBobomalikovNode/LangTestBot.git
   cd LangTestBot
   ```

2. Kutubxonalarni o‘rnatish:
   ```bash
   npm install
   ```

3. Botni ishga tushirish:
   ```bash
   node index.js
   ```

---


## 🔐 Muhit o'zgaruvchilari
  - BOT_TOKEN - sizning  telegram bot  tokeningiz
  - DATABASE_URL - sizning  MongoDb   cloud dagi tokeningiz
  - BOT_ADMINS - bot  adminlari quyidagi tartibda  [admin1_id,admin2_id.. ] shu tartib beriladi
  - REMOTE_CHANNEL - bot  foydalanuvchilarni boshqarish uchun maxsus telegram  kanal ID yoki USERNAME si 
  - CHANNEL_FOR_BOT_ADVERTISING - foydalanuvchilarga reklamalarni yuborish uchun  kanal  ID yoki USERNAME si.  ushbu kanalga   har qanday post joylasangiz   bot  foydalanuvchilariga  ham boradi.
  - SPECIAL_GROUP - maxsus   guruh  foydalanuchilarga  test jarayonini o'tqazish uchun guruh  ID yoki USERNAME si 
   
## ⚙ Muhit o'zgaruvchilari Muhitga taminlash
1. Windows muhiti uchun:
   ```bash
   set BOT_TOKEN=sizning_telegram_bot_tokeningiz
   set DATABASE_URL=sizning_MongoDb_cloud_dagi_tokeningiz
   set BOT_ADMINS=[admin1,admin2,admin3]
   set REMOTE_CHANNEL=sizning_foydalanuvchilarni_boshqarish_uchun_kerakli_kanal
   set CHANNEL_FOR_BOT_ADVERTISING=botda_foydalanuvchilarga_reklama_yuborish_uchun_kanal
   set SPECIAL_GROUP=test_o'tkaziladigan_maxsus_supper_gurppa
   ```
2. Linux muhiti uchun:
   ```bash
   export BOT_TOKEN="sizning_telegram_bot_tokeningiz"
   export DATABASE_URL="sizning_MongoDb_cloud_dagi_tokeningiz"
   export BOT_ADMINS="[admin1,admin2,admin3]"
   export REMOTE_CHANNEL="sizning_foydalanuvchilarni_boshqarish_uchun_kerakli_kanal"
   export CHANNEL_FOR_BOT_ADVERTISING="botda_foydalanuvchilarga_reklama_yuborish_uchun_kanal"
   export SPECIAL_GROUP="test_o'tkaziladigan_maxsus_supper_gurppa"
   ```

## Foydalanish

1. **Admin kanali sozlamalari**:
   - Admin kanalini sozlang va botni kanalga qo‘shing.

2. **Foydalanuvchilarni qo‘shish va testni boshlash**:
   - Foydalanuvchilar test jarayonida ishtirok etishi uchun maxsus guruhga taklif qilinadi.

3. **Test natijalari**:
   - Foydalanuvchilar testni tugatgandan so‘ng, shaxsiy natijalar bot orqali yuboriladi.
   - Asosiy kanalda umumiy natijalar post qilinadi.

4. **Guruhni boshqarish**:
   - Test yakunlangach, maxsus guruh avtomatik tozalanadi.

---

## Hissa qo‘shish

1. Repozitoriyani fork qiling.
2. O‘zgarishlarni amalga oshiring va commit qiling:
   ```bash
   git commit -m "O‘zgarish tavsifi"
   ```
3. Pull request yuboring.

---



## 📧 Bog'lanish

Loyiha haqida savollaringiz bo'lsa, quyidagi manzilga murojaat qiling:
- **Muallif:** [Abduaziz Bobomalikov](https://github.com/AbduazizBobomalikovNode)
- **Telegram:** [AbduazizBobomalikov](https://t.me/Bobomalikov_Abduaziz)


## Litsenziya

Ushbu loyiha [MIT Litsenziyasi](https://opensource.org/licenses/MIT) ostida tarqatiladi.

