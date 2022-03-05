const Koa = require('koa');
const app = new Koa();
const BodyParser = require('koa-bodyparser');
const bodyparser= new BodyParser();
const router = require('./router/index')
const serve = require('koa-static');

app.use(bodyparser);
app.use(router.routes())
  .use(router.allowedMethods());
app.use(serve(__dirname + '/manage'));
app.use(serve(__dirname + '/fe'));

app.listen(3000);
console.log('项目启动中...')