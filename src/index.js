const Koa = require('koa');
const app = new Koa();
const BodyParser = require('koa-bodyparser');
const bodyparser= new BodyParser();
const router = require('./router/index')
const static = require('koa-static');
const mount = require('koa-mount');
const jwt = require('koa-jwt');
var mosca = require('mosca')
const fs = require('fs')

const config = require('./config/index')
// Unprotected middleware
app.use(function(ctx, next){
  // console.log('本次链接的url', ctx.req)
  if (ctx.url.match(/^\/login/)) {
    console.log('-------->>> some other route access, maybe a hacker there')
    ctx.body = 'please input your username and password'
  } else {
    return next().catch((err) => {
      console.log('一个异常的请求: ', err)
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = {code: 401, msg: 'need login'};
      } else {
        ctx.status = 200;
        ctx.body = {code: -1, msg: err}
      }
    });
  }
});

app.use(jwt({ secret: config.jwtSec}).unless({ path: [/^\/h5/,/^\/apih5/, /^\/manage/, /^\/favicon/, /^\/api\/manage\/login/] }));

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
h5.use(static(__dirname + '/fe', {
  index: 'index.html'
}));
h5.use(async function (ctx, next){
  if(ctx.response.status === 404) {
    const html = fs.readFileSync(__dirname + '/fe/index.html', "binary");
    ctx.body = html;
  }
  next()
})
manage.use(static(__dirname + '/manage', {
  index: 'index.html'
}));
manage.use(async function (ctx, next){
  if(ctx.response.status === 404) {
    const html = fs.readFileSync(__dirname + '/manage/index.html', "binary");
    ctx.body = html;
  }
  next()
})

app.use(mount('/h5', h5));
app.use(mount('/manage', manage));

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  maxInflightMessages: 10240,
  http: {
    port: 1884,
    bundle: true,
    static: './' 
  },
  // backend: ascoltatore
};

const AllClient = {}

var MQTTserver = new mosca.Server(settings);
MQTTserver.on('clientConnected', function(client) {
  console.log('client connected', client.id);
  AllClient[client.id] = client
  // console.log('All client', AllClient)
});

// fired when a message is received
MQTTserver.on('published', function(packet) {
  const topic = packet.topic
  const msg = packet.payload
  console.log('Published', packet.topic, packet.payload);
});

MQTTserver.on('ready', mqttReady);

// fired when the mqtt server is ready
function mqttReady() {
  console.log('Mosca server is up and running');
}
// MQTTserver.attachHttpServer(app)

app.listen(3100);
console.log('网页项目开始启动中...')
