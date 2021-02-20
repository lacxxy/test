const query = require('../../mysql/connect');
const guide=require('../../const/guide');
module.exports = async (ctx, next) => {
    let sql;
    let numSql;
    const type = guide[ctx.request.query.type];
    const index=ctx.request.query.index;//页码
    const num=ctx.request.query.num;//每页数目
    if (type === 0) {
        numSql=`select count(*) as total from postings`;
        sql = `select a.id,a.title,a.type,a.date,b.num
        from postings a 
        left join(select postingId,count(*) as num from comments group by postingId) b 
        on a.id=b.postingId 
        order by a.date desc
        limit ${num*index},${num}
        `;
    } else {
        numSql=`select count(*) as total from postings where type=${type}`;
        sql = `select a.id,a.title,a.type,a.date,b.num 
        from postings a 
        left join(select postingId,count(*) as num from comments group by postingId) b 
        on a.id=b.postingId 
        where type=${type} 
        order by a.date desc
        limit ${num*index},${num}
        `;
    }
    const count=(await query(numSql))[0].total;
    await query(sql).then((res, err) => {
        if (err) {
            ctx.response.body = {
                data: err,
                code: 500
            }
        } else {
            ctx.response.body = {
                data: {
                    total:count,
                    data:res
                },
                code: 200
            }
        }
    })
    next();
}