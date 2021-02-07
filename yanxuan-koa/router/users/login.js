const query = require('../../mysql/connect');
const mysql = require('mysql');
module.exports = async (ctx, next) => {
    const email = ctx.request.body.email;
    const pwd = ctx.request.body.password;
    //todo 加密
    const sql = `select * from users where email=${mysql.escape(email)} and password=${mysql.escape(pwd)}`;
    await query(sql).then((res, err) => {
        if (err) {
            ctx.response.body = {
                code: 500,
                msg: err
            }
        } else {
            if (res.length > 0) {
                ctx.response.body = {
                    code: 200,
                    username:res[0].username
                }
                //session
                ctx.session.userId = res[0].id;
            } else {
                ctx.response.body = {
                    code: 400,
                    msg: '密码错误'
                }
            }
        }
    })
    next();
}