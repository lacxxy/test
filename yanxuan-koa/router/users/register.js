const query = require('../../mysql/connect');
const mysql = require('mysql');
module.exports = async (ctx, next) => {
    const {
        username,
        password,
        email
    } = ctx.request.body;
    if (!username.length || !email.length) {
        ctx.response.body = {
            code: 400,
            msg: '不能为空'
        }
    } else {
        const sql = `insert into users (username, password,email,avatar) values (${mysql.escape(username)},${mysql.escape(password)},${mysql.escape(email)},'')`;
        await query(`select * from users where email=${mysql.escape(email)}`).then(async (res, err) => {
            if (res.length > 0) {
                ctx.response.body = {
                    code: 400,
                    msg: '该邮箱已创建过用户'
                }
            } else {
                await query(sql).then((res, err) => {
                    {
                        if (err) {
                            ctx.response.body = {
                                code: 500,
                                msg: err
                            }
                        } else {
                            ctx.response.body = {
                                code: 200,
                                msg: '创建成功'
                            }

                        }
                    }
                })
            }
        })
    }
}