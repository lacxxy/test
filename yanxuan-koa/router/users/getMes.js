const query = require('../../mysql/connect');
module.exports = async (ctx, next) => {
    let sql;
    const id = ctx.session.userId;
    const res = await query(`select username,avatar,email from users where id='${id}'`);
    if (!res.length) {
        ctx.response.body = {
            code: 403,
            msg: '请先登录'
        }
    } else {
        ctx.response.body = {
            code: 200,
            data: res
        }
    }
    next();
}