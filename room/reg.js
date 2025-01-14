const {
    Scenes, Markup
} = require('telegraf');

const scenesReg = new Scenes.BaseScene('scenesReg');

let user = [];
let flag = true;
const  REMOTE_CHANNEL = process.env.REMOTE_CHANNEL;

function send_chanel(user, ctx) {
    ctx.telegram.sendMessage(REMOTE_CHANNEL,
        `${user.id}-raqmli xabar.` +
        '\n<b>ILC Talabasi Haqida : </b> ' +
        '\n<b>Talaba :</b> ' + user.name +
        '\n<b>Telegrami :</b> @' + user.user +
        '\n<b>Tel Nomeri :</b> ' + user.contact +
        '\n<b>Group :</b>1', {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            [
                Markup.button.callback('➖', '--'),
                Markup.button.callback('🆗', 'ok'),
                Markup.button.callback('➕', '++'),
            ]
        ])
    }).catch(err => {
        console.error(`bloklanish yoki boshqa xatolik : ${err}`)
    });
}



scenesReg.enter(async ctx => {
    ctx.reply('Birinchi Ismingiz va Familyangizni kiriting.', Markup.keyboard(['⬅️']))
        .catch(err => {
            console.error(`bloklanish yoki boshqa xatolik : ${err}`)
        });
    user[`x${ctx.from.id}`] = {
        id: ctx.from.id,
        name: '',
        user: ctx.from.username,
        contact: '',
        group: 1,
        result:
        {
            name: 'test1',
            count: 0,
            use: 0,
            trues: 0
        }
    }
})
scenesReg.hears('⬅️', async ctx => {
    ctx.reply('Amal bekor qilindi!', Markup.keyboard(['🪪Ro\'yxatdan o\'tish']).resize())
        .catch(err => {
            console.error(`bloklanish yoki boshqa xatolik : ${err}`)
        });
    ctx.scene.leave();
})
scenesReg.on('text', async ctx => {
    ctx.reply('Yaxshi endi telefon raqamingizni ⬇️pastdagi tugmacha orqali jo\'nating.',
        Markup.keyboard([[Markup.button.contactRequest('☎️Raqamingizni ulashing')], ['⬅️']]).resize())
        .catch(err => {
            console.error(`bloklanish yoki boshqa xatolik : ${err}`)
        });
    if (flag) {
        user[`x${ctx.from.id}`].name = ctx.message.text;
        flag = false;
    } else {
        ctx.reply('Iltimos raqamingizni ⬇️pastdagi \'☎️Raqamingizni ulashing\' tugmasini bosib bizga yuboring.')
            .catch(err => {
                console.error(`bloklanish yoki boshqa xatolik : ${err}`)
            });
    }
})
scenesReg.on('contact', async ctx => {
    ctx.reply('🥳Tabriklayman mufaqiyatli ro\'xatdan o\'tingiz.'
        , Markup.keyboard([['✅Darjangizni aniqlang.'],
        ['👤Hozirgi natijam↗️', '📝 Fikr mulohaza']]).resize())
        .catch(err => {
            console.error(`bloklanish yoki boshqa xatolik : ${err}`)
        });
    user[`x${ctx.from.id}`].contact = ctx.message.contact.phone_number;
    //console.log(ctx.session.db);
    ctx.session.db.add_user(user[`x${ctx.from.id}`]);
    send_chanel(user[`x${ctx.from.id}`], ctx);
    ctx.scene.leave();
})



module.exports = scenesReg;
