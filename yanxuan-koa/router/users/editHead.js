const query = require('../../mysql/connect');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
module.exports = async (ctx, next) => {
    const id = ctx.session.userId;
    const permit = (await query(`select * from users where id='${id}'`)).length;
    if (!permit) {
        ctx.response.body = {
            code: 403,
            msg: '请先登录'
        }
    } else {
        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = path.join(__dirname, '../../public/upload/') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        const url=`http://127.0.0.1:5000/upload/${file.name}`;
        let sql = `update users set avatar='${url}' where id=${id}`;
        await query(sql).then((res, err) => {
            if (err) {
                ctx.response.body = {
                    data: err,
                    code: 500
                }
            } else {
                ctx.response.body = {
                    msg: '成功',
                    code: 200
                }
            }
        })
    }
    next();
}