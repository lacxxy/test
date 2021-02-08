const query = require('../../mysql/connect');
const mysql = require('mysql');
const moment = require('moment');
const guide = require('../../const/guide');
module.exports = async (ctx, next) => {
    const {
        title,
        text
    } = ctx.request.body;
    const type = guide[ctx.request.body.type];
    const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const userid = ctx.session.userId;
    const permit = (await query(`select * from users where id='${userid}'`)).length;
    if (!permit) {
        ctx.response.body = {
            code: 403,
            msg: '请先登录'
        }
    } else {
        const sql = `insert into postings (title,word,date,authorid,type) values (${mysql.escape(title)},${mysql.escape(text)},'${date}',${mysql.escape(userid)},${mysql.escape(type)})`
        await query(sql).then((res, err) => {
            if (err) {
                ctx.response.body = {
                    code: 500,
                    msg: err
                }
            } else {
                ctx.response.body = {
                    code: 200,
                    msg: '新建成功',
                }
            }
        })
    }
    next();
}