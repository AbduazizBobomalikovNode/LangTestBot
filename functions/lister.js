async function listen(ctx) {
    let kass = 0;
    if (ctx.session.big_data.polls.includes(ctx.pollAnswer.poll_id)) {
        let index = ctx.session.big_data.polls.indexOf(ctx.pollAnswer.poll_id);
        if (ctx.session.big_data.trus[index] == ctx.pollAnswer.option_ids[0]) {
            kass = 1;
        } else {
            kass = 0;
        }
        if (ctx.session.big_data.users[`x${ctx.pollAnswer.user.id}`]) {
            ctx.session.big_data.users[`x${ctx.pollAnswer.user.id}`].count += 1;
            ctx.session.big_data.users[`x${ctx.pollAnswer.user.id}`].true_value += kass;
        } else {
            ctx.session.big_data.users[`x${ctx.pollAnswer.user.id}`] = {
                count: 1,
                true_value: kass
            };
        }

    }
}
module.exports = listen;