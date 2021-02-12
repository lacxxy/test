const query = require('../../mysql/connect');
const mysql = require('mysql');

module.exports = async (ctx, next) => {
    const id = mysql.escape(ctx.request.query.id);
    const sql = `select a.*,b.username,b.avatar from comments a,users b where superiorId=${id} and a.authorid=b.id`;
    const res = await query(sql);
    ctx.response.body = {
        code: 200,
        data: res.length ? res : [res]
    }
}