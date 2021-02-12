const Koa = require('koa');
const session = require('koa-session');
const koaBody = require('koa-body');
const app = new Koa();
app.keys = ['aiojdsabg)432'];
const CONFIG = {
    key: 'userId',
    secure: false,
    httpOnly: false,
};
app.use(session(CONFIG, app));

const router = require('koa-router')();
const getPstList = require('./router/postings/getPstList');
const login = require('./router/users/login');
const register = require('./router/users/register');
const newPst = require('./router/postings/newPst');
const getDetail = require('./router/postings/getDetail');
const newCmt = require('./router/comments/newCmt');
const getReply = require('./router/comments/getReply');
// 对于任何请求，app将调用该异步函数处理请求：
router.get('/getPstList', getPstList);
router.post('/login', koaBody(), login);
router.post('/register', koaBody(), register);
router.post('/newPst', koaBody(), newPst);
router.get('/getDetail', getDetail);
router.post('/newCmt', koaBody(), newCmt);
router.get('/getReply', getReply);
app.use(router.routes());
// 在端口5000监听:
app.listen(5000);
console.log('app started at port 5000...');