const fs = require('fs')
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

async function  get(ctx) {
    let count_quiz = 0;
    count_quiz = ctx.session.quizs.length;
    ctx.session.big_data.counts = ctx.session.quizs.length;
    let i = 0;
    let poll = await ctx.telegram.sendPoll(
        '-1001536201756',
        ctx.session.quizs[i][0],
        ctx.session.quizs[i][1],
        ctx.session.quizs[i][2]
    ).catch(err => {
        console.error(`getquiz fuksiyasida 1-sendPollda  xatolik :  ${err}`)
    });

    let trus = ctx.session.quizs[i][2].correct_option_id;
    let id = poll.message_id;
    let poll_id = poll.poll.id;

    ctx.session.big_data.polls.push(poll_id);
    ctx.session.big_data.trus.push(trus);
    ctx.session.big_data.messege.push(id);

    count_quiz--;
    myInterval = setInterval(async function () {
        if (count_quiz == 0 || ctx.session.stop == true) {
            ctx.session.stop = false;
            let sum = ctx.session.reset(ctx);
            clearInterval(myInterval);
            for(let i of ctx.session.big_data.messege){
                ctx.telegram.deleteMessage('-1001536201756',i).catch(err => {
                    console.error(`getquiz fuksiyasida deleteMessageda  xatolik :  ${err}`)
                });
            }
            let groups =  await ctx.session.db.getGroup(ctx.session.big_data.tgroup);
            let gr_result = 'ILC o\'quvchilarini bilimini baholash dasturi natijalari.'
                +'\n🔢guruh raqami : '+ctx.session.big_data.tgroup
                +'☑️\n👥o\'quvchilar soni :'+groups.length
                +'☑️\n✅nazorat testi : '+ ctx.session.test[ctx.session.big_data.tname]
                +'☑️\n❔savollar soni : '+ctx.session.big_data.counts
                +'☑️\n🆙guruh unumdorligi : '+parseInt((100*(await sum))/(ctx.session.big_data.counts*groups.length))+'%'
                +'☑️\nNatijalar :';
            
            for(let i of groups){
                if(ctx.session.big_data.users['x'+i.id]){
                    let res = ctx.session.big_data.users['x'+i.id].true_value/ctx.session.big_data.counts*100;
                    gr_result += '\n  👤'+i.name +' '+res+'% ↗️natija'
                }else{
                    gr_result += '\n  👤'+i.name +': 0% ↗️natija'
                }
                ctx.telegram.banChatSenderChat('-1001536201756',i.id).catch(err => {
                    console.error(`getquiz fuksiyasida banChatSenderChatda  xatolik :  ${err}`)
                });
            }
            gr_result  += '\nbarchaga ishtirok uchun rahmat.'
            ctx.telegram.sendPhoto('-1001840776013',{ source: fs.createReadStream('./images/gr.png') }, {
                caption: gr_result,
                parse_mode: 'HTML'
            }).catch(err => {
                console.error(`getquiz fuksiyasida sendPhotoda  xatolik : ${err}`)
            });
            ctx.session.big_data.users = [];
            ctx.session.big_data.polls = [];
            ctx.session.big_data.messege = [];
            ctx.session.big_data.trus = [];
        } else {
            poll = await ctx.telegram.sendPoll(
                '-1001536201756',
                ctx.session.quizs[i][0],
                ctx.session.quizs[i][1],
                ctx.session.quizs[i][2]
            ).catch(err => {
                console.error(`getquiz fuksiyasida 2-sendPollda  xatolik : ${err}`)
            });
            trus = ctx.session.quizs[i][2].correct_option_id;
            id = poll.message_id;
            let poll_id = poll.poll.id;

            ctx.session.big_data.polls.push(poll_id);
            ctx.session.big_data.trus.push(trus);
            ctx.session.big_data.messege.push(id);
            i++;
            count_quiz--;
        }
    },parseInt(ctx.session.big_data.ttime/ctx.session.big_data.counts*60)*1000)
}
module.exports = get;