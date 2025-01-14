
//tutiloars
const { Telegraf, Markup, session, Scenes } = require('telegraf');
const db = require('./db/db');
const fs = require('fs');
const express = require('express');
const http = require('http');
const app = express();

//functions
const reset = require('./functions/reset');
const getQuiz = require('./functions/getquiz');
const listen = require('./functions/lister');
const listen2 = require('./functions/listen2');
const format = require('./functions/format');

//testing
const quizs = require('./tests/A1');

//rooms
const scenesReg = require('./room/reg');
const scenesAdmin = require('./room/admin');
const scenesTest = require('./room/test');
const scenesComment = require('./room/coment');

const degree = require('./tests/degree')();
let kales = { degree_red: false };
let koll = null;
let coll = 0;

let degrees = { count: [], arr: [], user: [] }
let big = {
    tname: '504',
    tgroup: 1,
    ttime: 60,
    counts: 0,
    users: [],
    polls: [],
    trus: [],
    messege: [],
};
let test = {
    'test1': 'A1',
    'test2': 'A2',
    'test3': 'B1',
    'test4': 'Pre-IELTS',
    'test5': 'IELTS'
}
let bot_API = process.env.BOT_API;
const BOT_ADMINS = JSON.parse(process.env.BOT_ADMINS);
const  REMOTE_CHANNEL = process.env.REMOTE_CHANNEL;
const  CHANNEL_FOR_BOT_ADVERTISING = process.env.CHANNEL_FOR_BOT_ADVERTISING;
const SPECIAL_GROUP = process.env.SPECIAL_GROUP;

const bot = new Telegraf(bot_API);
const stage = new Scenes.Stage([scenesReg, scenesAdmin, scenesTest, scenesComment]);


bot.use((ctx, next) => {
    ctx.session = ctx.session ? ctx.session : {};
    return next();
})
bot.use(session());
bot.use(stage.middleware())

bot.use((ctx, next) => {
    ctx.session.db = ctx.session.db ? ctx.session.db : db;
    ctx.session.degrees = ctx.session.degrees ? ctx.session.degrees : degrees;
    ctx.session.reset = ctx.session.reset ? ctx.session.reset : reset;
    ctx.session.quizs = ctx.session.quizs ? ctx.session.quizs : quizs;
    ctx.session.getQuiz = ctx.session.getQuiz ? ctx.session.getQuiz : getQuiz;
    ctx.session.test = ctx.session.test ? ctx.session.test : test;
    ctx.session.format = ctx.session.format ? ctx.session.format : format;
    ctx.session.stop = ctx.session.stop ? ctx.session.stop : false;
    return next();
})
bot.use((ctx, next) => {
    ctx.session.big_data = ctx.session.big_data ? ctx.session.big_data : big;
    return next();
})


bot.start(async (ctx) => {
    if (BOT_ADMINS.includes(ctx.message.from.id)) {
        ctx.scene.enter('scenesAdmin');
    } else if (await ctx.session.db.is_user(ctx.from.id)) {
        ctx.reply(`Assalomu aleykum ${ctx.from.first_name}`
            , Markup.keyboard(
                [
                    ['✅Darjangizni aniqlang.'],
                    [
                        '👤Hozirgi natijam↗️',
                        '📝 Fikr mulohaza'
                    ]
                ]).resize()
        ).catch(err => {
            console.error(`index  modulida  1-replyda xatolik : ${err}`)
        })
    } else {
        ctx.reply(`Assalomu aleykum ${ctx.from.first_name} xush kelibsiz!`
            , Markup.keyboard(['🪪Ro\'yxatdan o\'tish']).resize()).catch(err => {
                console.error(`index  modulida  2-replyda xatolik : ${err}`)
            });
    }
})
bot.hears('🆙Test boshlash', async ctx => {
    if (BOT_ADMINS.includes(ctx.chat.id)) {
        ctx.scene.enter('scenesTest');
    } else {
        ctx.reply('kechirasiz unday huquq mavjut emas!').catch(err => {
            console.error(`index  modulida  3-replyda xatolik : ${err}`)
        })
    }
})
bot.hears('🪪Ro\'yxatdan o\'tish', async (ctx) => {
    ctx.scene.enter('scenesReg');
})
bot.hears('✅Darjangizni aniqlang.', async (ctx) => {
    kales.degree_red = true;
    ctx.reply('darjani aniqlash funksiyasi faollashdi.', Markup.keyboard(['⬅️chiqish']).resize())
        .catch(err => {
            console.error(`index  modulida  4-replyda xatolik : ${err}`)
        })
    koll = await ctx.telegram.sendPoll(
        ctx.message.chat.id,
        degree[coll][0],
        degree[coll][1],
        degree[coll++][2]
    ).catch(err => {
        console.error(`index  modulida  sendPollda xatolik : ${err}`)
    });
    ctx.session.degrees.count['x' + ctx.message.chat.id] = 1;
    ctx.session.degrees.arr.push(koll);
})
bot.hears('⬅️chiqish', async ctx => {

    if (ctx.session.degrees.user['x' + ctx.message.chat.id] <= 15) {
        ctx.telegram.sendPhoto(ctx.message.chat.id, { source: fs.createReadStream('./images/A1.png') }, {
            caption: `Sizning darajangiz BEGINNER (A1).\nTo\'g\'ri javoblaris:${ctx.session.degrees.user['x' + ctx.message.chat.id]}`,
            parse_mode: 'HTML'
        }).catch(err => {
            console.error(`index  modulida  1-sendPhotoda xatolik : ${err}`)
        });
    } else if (ctx.session.degrees.user['x' + ctx.message.chat.id] <= 35) {
        ctx.telegram.sendPhoto(ctx.message.chat.id, { source: fs.createReadStream('./images/A2.png') }, {
            caption: `Sizning darajangiz ELEMENTARY (A2).\nTo\'g\'ri javoblaris:${ctx.session.degrees.user['x' + ctx.message.chat.id]}`,
            parse_mode: 'HTML'
        }).catch(err => {
            console.error(`index  modulida  2-sendPhotoda xatolik : ${err}`)
        });
    } else if (ctx.session.degrees.user['x' + ctx.message.chat.id] <= 40) {
        ctx.telegram.sendPhoto(ctx.message.chat.id, { source: fs.createReadStream('./images/B1.png') }, {
            caption: `Sizning darajangiz INTERMEDIATE (B1).\nTo\'g\'ri javoblaris:${ctx.session.degrees.user['x' + ctx.message.chat.id]}`,
            parse_mode: 'HTML'
        }).catch(err => {
            console.error(`index  modulida  3-sendPhotoda xatolik : ${err}`)
        });
    }

    ctx.telegram.sendMessage(ctx.message.chat.id, 'Darajani baholash yakunlandii!',
        Markup.keyboard([['✅Darjangizni aniqlang.'],
        ['👤Hozirgi natijam↗️', '📝 Fikr mulohaza']]).resize())
        .catch(err => {
            console.error(`index  modulida  sendMessageda xatolik : ${err}`)
        });
    ctx.session.degrees.arr = [];
    ctx.session.degrees.user['x' + ctx.message.chat.id] = 0;
    ctx.session.degrees.count['x' + ctx.message.chat.id] = 0;
    kales.degree_red = false;
})
bot.hears('👤Hozirgi natijam↗️', async ctx => {
    let res = await ctx.session.db.is_user(ctx.chat.id);
    let str = '👤Talaba ' + res.name + ` (@${res.user})` +
        `\n ${res.group} - 👥Guruh. 🗒${test[res.result.name]} testi.` +
        '\n↗️Natijasi :' +
        `\n   ❔Savollar soni : ${res.result.count} ta` +
        `\n   🔅Javob berildi : ${res.result.use} ta` +
        `\n   ✅To'gri javoblar : ${res.result.trues} ta`;
    ctx.replyWithPhoto({ source: fs.createReadStream('./images/res.png') }, {
        caption: str,
        parse_mode: 'HTML'
    }).catch(err => {
        console.error(`index  modulida  replyWithPhotoda xatolik : ${err}`)
    });
})
bot.hears('📝 Fikr mulohaza', async ctx => {
    ctx.scene.enter('sceneComment');
})


bot.action('ok', (ctx) => {
    ctx.answerCbQuery('🧑‍🎓Talabani ↗️malumotlari shu.')
        .catch(err => {
            console.error(`index  modulida  answerCbQueryda xatolik : ${err}`)
        });
})

bot.action(['++', '--'], async (ctx) => {
    let user = ctx.callbackQuery.message.text.split('-')[0];
    let data = ctx.callbackQuery.message.text.split(':');
    if (ctx.callbackQuery.data == '++') {
        data[data.length - 1] = parseInt(data[data.length - 1]) + 1;
    } else {
        if (data[data.length - 1] > 1) {
            data[data.length - 1] = parseInt(data[data.length - 1]) - 1;
        }
    }
    ctx.answerCbQuery(data[data.length - 1] + ' ga o\'zgardi🆗.')
        .catch(err => {
            console.error(`index  modulida  answerCbQueryda xatolik : ${err}`)
        })
    let groups = data[data.length - 1];
    data = data.join(':');

    let button = Markup.inlineKeyboard([
        [
            Markup.button.callback('➖', '--'),
            Markup.button.callback('🆗', 'ok'),
            Markup.button.callback('➕', '++'),
        ]
    ]);

    let result = await bot.telegram.editMessageText(
        REMOTE_CHANNEL,
        ctx.callbackQuery.message.message_id,
        null,
        data, {
        parse_mode: 'HTML',
        ...button
    }).catch(err => {
        console.error(`index  modulida  editMessageTextda xatolik : ${err}`)
    });
    let cx = await ctx.session.db.update_user({ id: parseFloat(user), group: groups })
})
bot.on('channel_post', async ctx => {
    let { message_id } = ctx.update.channel_post;
    let poll = ctx.update.channel_post.poll
    let { id } = ctx.update.channel_post.sender_chat;
    if (id == CHANNEL_FOR_BOT_ADVERTISING) {
        let users = await ctx.session.db.getAllUsers()//'')
        for (i in users) {
            try {
                if (poll) {
                    ctx.telegram.forwardMessage(users[i].id, id, message_id).catch(err => {
                        console.error(`Index moduli forwardMessage xatolik : ${err}`)
                    });
                } else {
                    ctx.telegram.copyMessage(users[i].id, id, message_id).catch(err => {
                        console.error(`Index moduli copyMessageda xatolik : ${err}`)
                    });
                }
            } catch (err) {
                console.log('Index moduli reklamalar bo\'limida xatolik')
            }
        }
    }
})
bot.on('poll_answer', async (ctx) => {

    if (!kales.degree_red) {
        listen(ctx);
    } else {
        listen2(ctx, kales);
    }
})

bot.on(['left_chat_member', 'new_chat_members'], async ctx => {
    let x = await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.get('/', async (req, res) => {
    return res.send('Bot ishlati!');
});

const server = http.createServer(app);

var server_port = process.env.PORT || 8080;
var server_host = process.env.YOUR_HOST || '0.0.0.0';//

server.listen(server_port);