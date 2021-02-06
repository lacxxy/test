const query = require('../../mysql/connect');
module.exports = async (ctx, next) => {
    const types = {
        index: 0,
        home: 1,
        cloth: 2,
        food: 3,
        clean: 4,
        child: 5,
        sport: 6,
        digit: 7,
        world: 8
    }
    let sql;
    const type = types[ctx.request.query.type];
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