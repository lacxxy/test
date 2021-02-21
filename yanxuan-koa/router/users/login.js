const query = require('../../mysql/connect');
const mysql = require('mysql');
const md5 = require('md5');
module.exports = async (ctx, next) => {
    const email = ctx.request.body.email;
    const pwd = ctx.request.body.password;
    const salt= (await query(`select salt from users where email=${mysql.escape(email)}`))[0].salt;
    const password=md5(pwd+salt);
    const sql = `select * from users where email=${mysql.escape(email)} and password=${mysql.escape(password)}`;
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
                    username:res[0].username,
                    avatar:res[0].avatar,
                    id:res[0].id
                }
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