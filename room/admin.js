const {
    Scenes, Markup
} = require('telegraf');

const scenesAdmin = new Scenes.BaseScene('scenesAdmin');

scenesAdmin.enter(async ctx => {
    ctx.reply('😊Assalomu aleykum Ishingiz maroqli bo\'lsin.'
        , Markup.keyboard(['🆙Test boshlash']).resize()).catch(err => {
            console.error(`scenesAdmin sahnada enterda  xatolik : ${err}`)
        });
})
scenesAdmin.hears('🆙Test boshlash', async ctx => {
    ctx.scene.enter('scenesTest');
})
scenesAdmin.action('start', ctx => {
    ctx.telegram.editMessageText(ctx.callbackQuery.from.id, ctx.callbackQuery.message.message_id, null,
        '🥳Tabriklayman  Test mufaqiyatli boshlandi. Xoxlasangiz Test jarayonini ❌to\'tatishingiz mumkin.',
        {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([Markup.button.callback('❌to\'xtatish', 'stop')])
        }
    ).catch(err => {
        console.error(`scenesAdmin sahnada editMessageTextda  xatolik :  ${err}`)
    });
    ctx.session.getQuiz(ctx);
})
scenesAdmin.action('stop', ctx => {
    ctx.telegram.deleteMessage(ctx.callbackQuery.from.id, ctx.callbackQuery.message.message_id).catch(err => {
        console.error(`scenesAdmin sahnada deleteMessageda  xatolik :  ${err}`)
    });
    ctx.session.stop = true;
    ctx.answerCbQuery('test to\'xtatildi!').catch(err => {
        console.error(`scenesAdmin sahnada answerCbQueryda  xatolik :  ${err}`)
    });
})
scenesAdmin.on(['left_chat_member', 'new_chat_members'], ctx => {
    console.log(ctx);
})

module.exports = scenesAdmin;
