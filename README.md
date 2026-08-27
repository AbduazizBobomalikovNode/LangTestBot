# LangTestBot

Ingliz tili bilim darajasini test orqali aniqlaydigan Telegram bot.

Foydalanuvchi botni ochadi, testni yechadi va darajasini darhol biladi. Natija bazaga yoziladi, yangi kelgan odam haqida admin kanaliga xabar boradi.

---

**Sahifa:** [abduazizbobomalikovnode.github.io/LangTestBot/](https://abduazizbobomalikovnode.github.io/LangTestBot/)

## Muammo

Til o'quv markaziga kelgan har bir odamni qaysi guruhga qo'yishni bilish kerak. Buning uchun daraja aniqlanadi: test beriladi, tekshiriladi, natija yozib qo'yiladi.

Bu ish administratorga tushadi va har bir kelgan odam uchun takrorlanadi. Kechqurun yoki dam olish kunida esa umuman hech kim javob bermaydi — ariza ertagacha kutadi.

## Nima qiladi

- **Test o'tkazadi** — savollar bazadan keladi, javoblar yig'iladi
- **O'zi baholaydi** — natija darhol chiqadi, odam kutmaydi
- **Natijani saqlaydi** — kim qachon qanday daraja olgani bazada qoladi
- **Admin kanaliga xabar beradi** — har yangi foydalanuvchi va uning natijasi avtomatik post bo'ladi
- **Kechayu kunduz ishlaydi** — ariza vaqtidan qat'i nazar qabul qilinadi

## Qanday ishlaydi

```
/start
   └─► ro'yxatdan o'tish
         └─► test boshlanadi        (savollar bazadan)
               └─► javoblar yig'iladi
                     ├─► daraja hisoblanadi → foydalanuvchiga
                     └─► natija bazaga + admin kanaliga
```

## O'rnatish

```bash
git clone https://github.com/AbduazizBobomalikovNode/LangTestBot.git
cd LangTestBot
npm install

cp .env.example .env      # qiymatlarni to'ldiring
npm start
```

Kerak bo'ladi: Node.js 16+ va MongoDB.

## Environment

| O'zgaruvchi | Nima uchun |
|---|---|
| `BOT_API` | [@BotFather](https://t.me/BotFather) bergan token |
| `DATE_URL` | MongoDB ulanish satri |
| `BOT_ADMINS` | Adminlar ID si, vergul bilan |
| `REMOTE_CHANNEL` | Natijalar yuboriladigan kanal |
| `CHANNEL_FOR_BOT_ADVERTISING` | Reklama kanali |
| `SPECIAL_GROUP` | Maxsus guruh |
| `PORT` | Server porti |
| `YOUR_HOST` | Tashqi manzil (webhook uchun) |

## Tuzilma

```
index.js       bot va server
room/          suhbat sahnalari
functions/     yordamchi funksiyalar
db/            MongoDB ulanishi
tests/         savollar va baholash
images/        rasmlar
```

## Texnologiyalar

Node.js · Telegraf · MongoDB · Express
