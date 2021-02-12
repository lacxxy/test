const query = require('../../mysql/connect');
const mysql = require('mysql');
const moment = require('moment');
module.exports = async (ctx, next) => {
    const {
        postingId,
        word,
        superiorId
    } = ctx.request.body;
    const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const userid = ctx.session.userId;
    const permit = (await query(`select * from users where id='${userid}'`)).length;
    if (!permit) {
        ctx.response.body = {
            code: 403,
            msg: '请先登录'
        }
    } else {
        if(superiorId!=-1){
            const sql=`update comments set nextCount=nextCount+1 where id=${superiorId}`;
            await query(sql);
        }
        const istSql = `insert into comments (word,date,postingId,authorid,superiorId,nextCount) values (${mysql.escape(word)},'${date}',${mysql.escape(postingId)},${mysql.escape(userid)},${mysql.escape(superiorId)},0)`;
        const res = await query(istSql);

        ctx.response.body = {
            code: 200,
            msg: '回复成功'
        };

    }
    next();
}