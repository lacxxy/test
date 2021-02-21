const query = require('../../mysql/connect');
const mysql = require('mysql');
module.exports = async (ctx, next) => {
    const userid = ctx.session.userId;
    const permit = (await query(`select * from users where id=${userid}`)).length;
    const id = mysql.escape(ctx.request.body.id); //帖子id
    const authorid = (await query(`select authorid from postings where id=${id}`))[0].authorid;
    if (!permit) {
        return ctx.response.body = {
            code: 403,
            msg: '请登录'
        }
    }
    if (userid != authorid) {
        return ctx.response.body = {
            code: 400,
            msg: 'token错误'
        }
    }
    let sql = `delete
    from postings
    where id=${id}`;
    await query(sql);
    sql = `delete from comments where postingId=${id}`;
    await query(sql).then(async (res, err) => {
        if (err) {
            ctx.response.body = {
                code: 500,
                msg: err
            }
        } else {
            ctx.response.body = {
                code: 200,
                msg: '删除成功'
            }
        }
    })
}