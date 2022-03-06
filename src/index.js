const Koa = require('koa');
const app = new Koa();
const BodyParser = require('koa-bodyparser');
const bodyparser= new BodyParser();
const router = require('./router/index')
const serve = require('koa-static');

app.use(async (ctx, next) => {
  console.log('日志系统:开始记录')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`日志系统:单次记录结束：${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(bodyparser);
// app.use(bodyparser.json({ type: 'application/*+json' }))

app.use(router.routes())
  .use(router.allowedMethods());
app.use(serve(__dirname + '/manage'));
app.use(serve(__dirname + '/fe'));


app.listen(3000);
console.log('项目开始启动中...')