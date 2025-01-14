const {
	Scenes, Markup
} = require('telegraf');

const scenesComment = new Scenes.BaseScene('sceneComment');


scenesComment.enter(async (ctx) => {
	ctx.reply('Iltimos o\'z fikringiz va takliflaringizni  qoldiring!'
		, Markup.keyboard(['⬅️']).resize())
		.catch(err => {
            console.error(`scenesComment sahnasida  enterda  xatolik : ${err}`)
        });
})

scenesComment.on('text', async (ctx) => {
	if (ctx.message.text == '⬅️') {
		ctx.reply('amal bekor qilindi!',
			Markup.keyboard([['✅Darjangizni aniqlang.'],
			['👤Hozirgi natijam↗️','📝 Fikr mulohaza']]).resize())
			.catch(err => {
				console.error(`scenesComment sahnasida  1-replyda  xatolik : ${err}`)
			});
		ctx.scene.leave()
	} else {
		let content =
			`<b>ILC Qoldirilgan Kommentarya :</b>\n\n` +
			`User telegrami :@${ctx.message.from.username}\n` +
			`User muloqot ID si: <code>${ctx.message.from.id}</code>\n` +
			`<b>Kommentarya vaqti :</b>\n    sana : ${ctx.session.format()}\n    soat : ${ctx.session.format(true)}\n\n` +
			`<b>Kommentarya :</b>\n` + ctx.message.text;

		ctx.telegram.sendMessage('-1001592690464', content, { parse_mode: 'HTML' })
		.catch(err => {
			console.error(`scenesComment sahnasida  sendMessageda  xatolik :  ${err}`)
		});
		ctx.reply('Fikr-mulohaza uchun rahmat!',
			Markup.keyboard([['✅Darjangizni aniqlang.'],
			['👤Hozirgi natijam↗️','📝 Fikr mulohaza']]).resize())
			.catch(err => {
				console.error(`scenesComment sahnasida  2-replyda  xatolik :  ${err}`)
			});
		ctx.scene.leave()
	}
})

module.exports = scenesComment;