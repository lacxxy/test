const query = require('../../mysql/connect');
module.exports = async (ctx, next) => {
    const id = ctx.session.userId;
    const index = ctx.request.query.index; //页码
    const num = ctx.request.query.num; //每页数目
    const numSql = `select count(*) as total from postings where authorid=${id}`;
    let sql = `select a.id,a.title,a.type,a.date,b.num 
    from postings a
    left join(select postingId,count(*) as num from comments group by postingId) b 
    on a.id=b.postingId 
    where authorid=${id} 
    order by a.date desc
    limit ${num*index},${num}
    `;
    const permit = (await query(`select * from users where id='${id}'`)).length;
    if (!permit) {
        ctx.response.body = {
            code: 403,
            msg: '请先登录'
        }
    } else {
        const count = (await query(numSql))[0].total;
        await query(sql).then((res, err) => {
            if (err) {
                ctx.response.body = {
                    data: err,
                    code: 500
                }
            } else {
                ctx.response.body = {
                    data: {
                        data: res,
                        total: count
                    },
                    code: 200
                }
            }
        })
    }
    next();
}