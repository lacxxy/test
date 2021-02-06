const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const getPstList=require('./router/postings/getPstList');
// 对于任何请求，app将调用该异步函数处理请求：
router.get('/getPstList',getPstList);
app.use(router.routes());
// 在端口5000监听:
app.listen(5000);
console.log('app started at port 5000...');