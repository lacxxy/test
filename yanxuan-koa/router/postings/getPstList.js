const query = require('../../mysql/connect');
const guide=require('../../const/guide');
module.exports = async (ctx, next) => {
    let sql;
    const type = guide[ctx.request.query.type];
    if (type === 0) {
        sql = `select * from postings`;
    } else {
        sql = `select * from postings where type=${type}`;
    }
    await query(sql).then((res, err) => {
        if (err) {
            ctx.response.body = {
                data: err,
                code: 500
            }
        } else {
            ctx.response.body = {
                data: res,
                code: 200
            }
        }
    })
    next();
}