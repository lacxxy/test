const query = require('../../mysql/connect');
const mysql = require('mysql');

module.exports = async (ctx, next) => {
    const id = ctx.session.userId;
    const permit = (await query(`select * from users where id='${id}'`)).length;
    if (!permit) {
        ctx.response.body = {
            code: 403,
            msg: '请先登录'
        }
    } else {
        const sql = `select * from comments where authorid=${id} order by date desc`;
        const res = await query(sql);
        ctx.response.body = {
            code: 200,
            data: res
        }
    }
}