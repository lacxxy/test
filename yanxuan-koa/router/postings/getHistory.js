const query = require('../../mysql/connect');
module.exports = async (ctx, next) => {
    let sql;
    const id = ctx.session.userId;
    sql = `select a.id,a.title,a.type,a.date,b.num from postings a left join(select postingId,count(*) as num from comments group by postingId) b on a.id=b.postingId where authorid=${id} order by a.date desc`;
    const permit = (await query(`select * from users where id='${id}'`)).length;
    if (!permit) {
        ctx.response.body = {
            code: 403,
            msg: '请先登录'
        }
    } else {
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
    }
    next();
}