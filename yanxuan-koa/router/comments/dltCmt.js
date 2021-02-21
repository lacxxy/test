const query = require('../../mysql/connect');
const mysql = require('mysql');
module.exports = async (ctx, next) => {
    const userid = ctx.session.userId;
    const id = mysql.escape(ctx.request.body.id);
    const permit = (await query(`select * from users where id=${userid}`)).length;
    const {
        authorid,
        superiorId
    } = (await query(`select authorid,superiorId from comments where id=${id}`))[0];
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
    let sql = `
    update comments
    set nextCount=nextCount-1
    where id='${superiorId}'
    `;
    await query(sql);
    sql = `delete 
    from comments 
    where id=${id} or superiorId=${id}`;
    await query(sql).then((res, err) => {
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