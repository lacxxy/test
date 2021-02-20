const query = require('../../mysql/connect');
const mysql = require('mysql');
module.exports = async (ctx, next) => {
    const id = mysql.escape(ctx.request.query.id);
    const index=ctx.request.query.index;//页码
    const sql = `select * from postings where id=${id}`;
    const [head, err] = await query(sql);
    const authorid = head.authorid;
    const userSql = `select username,avatar from users where id=${authorid}`;
    const countSql=`select count(*) as total from comments where postingId=${id}`;
    const cmtSql = `select a.username,a.avatar,b.* 
    from users a,comments b 
    where a.id=b.authorid and b.postingId=${id} 
    group by b.date
    limit ${index*8},8
    `;
    const count=(await query(countSql))[0].total;
    const user = await query(userSql);
    const comments = await query(cmtSql);
    const res = {
        head: {
            date: head.date,
            title: head.title,
            word: head.word,
            username: user[0].username,
            avatar: user[0].avatar,
            count:count
        },
        comments: comments
    }
    if (err) {
        ctx.response.body = {
            code: 500,
            msg: err
        }
    } else {
        ctx.response.body = {
            code: 200,
            data: res
        }
    }
}