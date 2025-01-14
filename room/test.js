const {
    Scenes, Markup
} = require('telegraf');
const A1 = require('../tests/A1');
const A2 = require('../tests/A2');
const B1 = require('../tests/A2');
let clock = false;
let del = [];
const SPECIAL_GROUP = process.env.SPECIAL_GROUP;

const scenesTest = new Scenes.BaseScene('scenesTest');

async function clear(ctx, id) {
    for (let x of del) {
        ctx.telegram.deleteMessage(id, x).catch(err => {
            console.error(`scenesTest sahnasida clear funksiyasida  deleteMessageda  xatolik :  ${err}`)
        });
    }
    del = [];
    return 0;
}

scenesTest.enter(async ctx => {

    del.push((await ctx.reply('🧾Testni boshlash uchun zarur malumotlar menga yuboring!↗️.',
        Markup.keyboard(['⬅️']).resize()).catch(err => {
            console.error(`scenesTest sahnasida   enterda 1-replyda  xatolik :  ${err}`)
        })).message_id);
    del.push((await ctx.reply('Birinchi Qaysi 👥guruhga 📄test o\'tilishini yuboring↗️.')
    .catch(err => {
        console.error(`scenesTest sahnasida   enterda 2-replyda xatolik :  ${err}`)
    })).message_id);
})
scenesTest.hears('⬅️', async ctx => {
    ctx.reply('Amal bekor qilindi!', Markup.keyboard(['🆙Test boshlash']).resize())
        .catch(err => {
            console.error(`scenesTest sahnasida   3-replyda xatolik : ${err}`)
        });
    ctx.scene.enter('scenesAdmin');
    ctx.scene.leave();
})
scenesTest.on('text', async ctx => {
    if (!isNaN(ctx.message.text) && !clock) {
        ctx.session.big_data.tgroup = parseInt(ctx.message.text);
        del.push(ctx.message.message_id)
        await clear(ctx, ctx.chat.id)
        del.push((await ctx.reply('Yaxshi endi Testni tanlang📝.', {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
                [
                    Markup.button.callback('A1', 'test1'),
                    Markup.button.callback('A2', 'test2'),
                    Markup.button.callback('B1', 'test3')
                ],
                [
                    Markup.button.callback('Pre-IELTS', 'test4'),
                    Markup.button.callback('IELTS', 'test5')
                ],
            ])
        }).catch(err => {
            console.error(`scenesTest sahnasida  4-replyda xatolik : ${err}`)
        })).message_id)
        clock = true;
    } else if (!clock) {
        del.push((await ctx.reply('Iltimos guruhni faqat son qiymatda yuboring.').catch(err => {
            console.error(`scenesTest sahnasida  5-replyda xatolik : ${err}`)
        })).message_id)
    } else {
        ctx.session.big_data.ttime = parseInt(ctx.message.text);
        del.push(ctx.message.message_id)
        let groups = await ctx.session.db.getGroup(ctx.session.big_data.tgroup)
        for (let i of groups) {
            ctx.telegram.sendMessage(i.id, 'Assalomu aleykum ' + i.name +
                'ustozingiz sizga testda qatnashingiz uchun so\'rov yubordi.', {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard([
                    Markup.button.url('Testda qatnashish', await ctx.telegram.exportChatInviteLink(SPECIAL_GROUP))
                ])
            }).catch(err => {
                console.error(`scenesTest sahnasida   sendMessageda xatolik : ${err}`)
            });
            await ctx.telegram.unbanChatSenderChat(SPECIAL_GROUP, i.id)
            .catch(err => { console.log(`scenesTest sahnasida   unbanChatSenderChatda xatolik : ${err}`) })

        }
        if (ctx.session.big_data.tname == 'test1') {
            ctx.session.quizs = A1(ctx.session.big_data.ttime);
            ctx.session.big_data.counts = ctx.session.quizs.length
        }
        if (ctx.session.big_data.tname == 'test2') {
            ctx.session.quizs = A2(ctx.session.big_data.ttime);
            ctx.session.big_data.counts = ctx.session.quizs.length
        }
        if (ctx.session.big_data.tname == 'test3') {
            ctx.session.quizs = B1(ctx.session.big_data.ttime);
            ctx.session.big_data.counts = ctx.session.quizs.length
        }
        await clear(ctx, ctx.chat.id);
        ctx.reply('Barcha test qatnashuvchilariga so\'ro\'v yuborildi!↗️\n' +
            'Testni boshlamoqchi bo\'lsangiz 🔘Boshlash tugmasini bosing👈', {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
                Markup.button.callback('🔘Boshlash', 'start')
            ])
        }).catch(err => {
            console.error(`scenesTest sahnasida  6-replyda xatolik : ${err}`)
        });
        clock = false;
        ctx.scene.leave();
        ctx.scene.enter('scenesAdmin');
    }
})
scenesTest.action(['test1', 'test2', 'test3'], async ctx => {
    ctx.session.big_data.tname = ctx.callbackQuery.data;
    await clear(ctx, ctx.callbackQuery.from.id);
    del.push((await ctx.reply('💢Rahmat endi Test qancha vaqt davom etishi yuboring.\n' +
        'Vaqtni⏱ daqiqa hisobida jo\'nating.' +
        ' masalan 80 daqiqa 1 soat tu 20 minut uchun.').catch(err => {
            console.error(`scenesTest sahnasida  7-replyda xatolik : ${err}`)
        })).message_id)
})
module.exports = scenesTest;
