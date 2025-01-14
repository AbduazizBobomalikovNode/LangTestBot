const fs = require('fs')
async function reset(ctx) {
    let sum = 0;
    for (var k in ctx.session.big_data.users) {
        if (ctx.session.big_data.users.hasOwnProperty(k)) {
            let up = {
                id: parseInt(k.slice(1)),
                result: {
                    name: ctx.session.big_data.tname,
                    count: ctx.session.big_data.counts,
                    use: ctx.session.big_data.users[k].count,
                    trues: ctx.session.big_data.users[k].true_value
                }
            }
            sum += ctx.session.big_data.users[k].true_value;
            await ctx.session.db.update_user(up);
            let res = await ctx.session.db.is_user(parseInt(k.slice(1)));
            let str = '👤Talaba ' + res.name + ` (@${res.user})` +
                `\n ${res.group} - 👥Guruh. 🗒${ctx.session.test[res.result.name]} testi.` +
                '\n↗️Natijasi :' +
                `\n   ❔Savollar soni : ${res.result.count} ta` +
                `\n   🔅Javob berildi : ${res.result.use} ta` +
                `\n   ✅To'gri javoblar : ${res.result.trues} ta`;
            ctx.telegram.sendPhoto(parseInt(k.slice(1)), { source: fs.createReadStream('./images/res.png') }, {
                caption: str,
                parse_mode: 'HTML'
            }).catch(err => {
                console.error(`reset fuksiyasi n↗️Natijani yuborishda xatolik : ${err}`)
            });
        }
    }
    return sum;
}
module.exports = reset;