const Koa = require('koa');
const app = new Koa();
const BodyParser = require('koa-bodyparser');
const bodyparser= new BodyParser();
const router = require('./router/index')
const static = require('koa-static');
const mount = require('koa-mount');
var jwt = require('koa-jwt');

const config = require('./config/index')
// Unprotected middleware
app.use(function(ctx, next){
  if (ctx.url.match(/^\/login/)) {
    console.log('-------->>> some other route access, maybe a hacker there')
    ctx.body = 'please input your username and password'
  } else {
    return next().catch((err) => {
      console.log('一个异常的请求: ', err.status)
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = {code: 401, msg: 'need login'};
      } else {
        ctx.status = 200;
        ctx.body = {code: -1, msg: 'you may need login'}
      }
    });
  }
});

app.use(jwt({ secret: config.jwtSec}).unless({ path: [/^\/h5/, /^\/manage/] }));

app.use(async (ctx, next) => {
  console.log('日志系统:开始记录')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`日志系统:单次记录结束：${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(bodyparser);

app.use(router.routes())
  .use(router.allowedMethods());

const h5 = new Koa()
const manage = new Koa()
h5.use(static(__dirname + '/fe'));
manage.use(static(__dirname + '/manage'));
app.use(mount('/h5', h5));
app.use(mount('/manage', manage));

app.listen(3000);
console.log('项目开始启动中...')