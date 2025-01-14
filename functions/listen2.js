const { Markup } = require('telegraf')
const degree = require('../tests/degree')();
const fs = require('fs');

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

async function listen(ctx, kales) {
    for (i in ctx.session.degrees.arr) {
        if (ctx.session.degrees.arr[i].poll.id == ctx.pollAnswer.poll_id) {
            if (ctx.pollAnswer.option_ids[0] == ctx.session.degrees.arr[i].poll.correct_option_id) {
                if (ctx.session.degrees.user['x' + ctx.pollAnswer.user.id]) {
                    ctx.session.degrees.user['x' + ctx.pollAnswer.user.id]++;
                } else {
                    ctx.session.degrees.user['x' + ctx.pollAnswer.user.id] = 1;
                }
            }
            ctx.telegram.deleteMessage(ctx.pollAnswer.user.id, ctx.session.degrees.arr[i].message_id).catch(err => {
                console.error(`listen funksiyasida deleteMessageda xatolik : ${err}`)
            });
            ctx.session.degrees.arr = arrayRemove(ctx.session.degrees.arr, ctx.session.degrees.arr[i]);
        }
    }
    if (ctx.session.degrees.count['x' + ctx.pollAnswer.user.id] < degree.length) {
        let koll = await ctx.telegram.sendPoll(
            ctx.pollAnswer.user.id,
            degree[ctx.session.degrees.count['x' + ctx.pollAnswer.user.id]][0],
            degree[ctx.session.degrees.count['x' + ctx.pollAnswer.user.id]][1],
            degree[ctx.session.degrees.count['x' + ctx.pollAnswer.user.id]][2]
        ).catch(err => {
            console.error(`listen funksiyasida sendPollda xatolik : ${err}`)
        });
        ctx.session.degrees.count['x' + ctx.pollAnswer.user.id]++;
        ctx.session.degrees.arr.push(koll);
    } else {
        if (ctx.session.degrees.user['x' + ctx.pollAnswer.user.id] <= 15) {
            ctx.telegram.sendPhoto(ctx.pollAnswer.user.id, { source: fs.createReadStream('./images/A1.png') }, {
                caption: `Sizning darajangiz BEGINNER (A1).\nTo\'g\'ri javoblaris:${ctx.session.degrees.user['x' + ctx.pollAnswer.user.id]}`,
                parse_mode: 'HTML'
            }).catch(err => {
                console.error(`listen funksiyasida sendPhotoda xatolik : ${err}`)
            });
        } else if (ctx.session.degrees.user['x' + ctx.pollAnswer.user.id] <= 35) {
            ctx.telegram.sendPhoto(ctx.pollAnswer.user.id, { source: fs.createReadStream('./images/A2.png') }, {
                caption: `Sizning darajangiz ELEMENTARY (A2).\nTo\'g\'ri javoblaris:${ctx.session.degrees.user['x' + ctx.pollAnswer.user.id]}`,
                parse_mode: 'HTML'
            }).catch(err => {
                console.error(`listen funksiyasida sendPhotoda xatolik : ${err}`)
            });
        } else if (ctx.session.degrees.user['x' + ctx.pollAnswer.user.id] <= 40) {
            ctx.telegram.sendPhoto(ctx.pollAnswer.user.id, { source: fs.createReadStream('./images/B1.png') }, {
                caption: `Sizning darajangiz INTERMEDIATE (B1).\nTo\'g\'ri javoblaris:${ctx.session.degrees.user['x' + ctx.pollAnswer.user.id]}`,
                parse_mode: 'HTML'
            }).catch(err => {
                console.error(`listen funksiyasida sendPhotoda xatolik : ${err}`)
            });
        }
        ctx.session.degrees.arr = [];
        ctx.session.degrees.user['x' + ctx.pollAnswer.user.id] = 0;
        ctx.session.degrees.count['x' + ctx.pollAnswer.user.id] = 0;
        kales.degree_red = false;

        ctx.telegram.sendMessage(ctx.pollAnswer.user.id, 'Darajani baholash yakunlandii!',
            Markup.keyboard([['✅Darjangizni aniqlang.'],
            ['👤Hozirgi natijam↗️', '📝 Fikr mulohaza']]).resize())
            .catch(err => {
                console.error(`listen funksiyasida sendMessage xatolik : ${err}`)
            });
    }

}

module.exports = listen;