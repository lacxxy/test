const query = require('../../mysql/connect');
const mysql = require('mysql');
const md5 = require('md5')
module.exports = async (ctx, next) => {
    const {
        username,
        password,
        email
    } = ctx.request.body;
    const salt = Math.random();
    console.log(`${password}${salt}`);
    const pwd = md5(`${password}${salt}`);
    if (!username.length || !email.length) {
        ctx.response.body = {
            code: 400,
            msg: '不能为空'
        }
    } else {
        const sql = `insert into users (username, password,email,avatar,salt) values (${mysql.escape(username)},'${pwd}',${mysql.escape(email)},'',${salt})`;
        await query(`select * from users where email=${mysql.escape(email)}`).then(async (res, err) => {
            if (res.length > 0) {
                ctx.response.body = {
                    code: 400,
                    msg: '该邮箱已创建过用户'
                }
            } else {
                await query(sql).then(async (res, err) => {
                    {
                        if (err) {
                            ctx.response.body = {
                                code: 500,
                                msg: err
                            }
                        } else {
                            const id=await query(`select max(id) from users`);
                            ctx.response.body = {
                                code: 200,
                                msg: '创建成功',
                                username: username,
                                avatar: null,
                                id: id
                            }
                            ctx.session.userId = id;
                        }
                    }
                })
            }
        })
    }
}