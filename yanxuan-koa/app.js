const Koa = require('koa');
const session = require('koa-session');
const koaBody = require('koa-body');
const path = require('path')
const staticFiles = require('koa-static')
const app = new Koa();
app.keys = ['aiojdsabg)432'];
app.use(staticFiles(path.join(__dirname, 'public')))
const CONFIG = {
    key: 'userId',
    secure: false,
    httpOnly: false,
};
app.use(session(CONFIG, app));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));
const router = require('koa-router')();
const getPstList = require('./router/postings/getPstList');
const login = require('./router/users/login');
const register = require('./router/users/register');
const newPst = require('./router/postings/newPst');
const getDetail = require('./router/postings/getDetail');
const newCmt = require('./router/comments/newCmt');
const getReply = require('./router/comments/getReply');
const getHistory = require('./router/postings/getHistory');
const getRlyHistory = require('./router/comments/getRlyHistory');
const getMes = require('./router/users/getMes');
const editHead = require('./router/users/editHead');

// 对于任何请求，app将调用该异步函数处理请求：
router.get('/getPstList', getPstList);
router.post('/login', login);
router.post('/register', register);
router.post('/newPst', newPst);
router.get('/getDetail', getDetail);
router.post('/newCmt', newCmt);
router.get('/getReply', getReply);
router.get('/getHistory', getHistory);
router.get('/getRlyHistory', getRlyHistory);
router.get('/getMes', getMes);
router.post('/editHead', editHead);
app.use(router.routes());
// 在端口5000监听:
app.listen(5000);
console.log('app started at port 5000...');