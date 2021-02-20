const query = require('../../mysql/connect');
const guide=require('../../const/guide');
module.exports = async (ctx, next) => {
    let sql;
    const type = guide[ctx.request.query.type];
    if (type === 0) {
        sql = `select a.id,a.title,a.type,a.date,b.num from postings a left join(select postingId,count(*) as num from comments group by postingId) b on a.id=b.postingId order by a.date desc`;
    } else {
        sql = `select a.id,a.title,a.type,a.date,b.num from postings a left join(select postingId,count(*) as num from comments group by postingId) b on a.id=b.postingId where type=${type} order by a.date desc`;
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