const Router = require('koa-router');
const router = new Router();

router.get('/login', (ctx, next) => {
  // ctx.router available
  ctx.body = 'my router is effective'
})
router.get('/h5/index', (ctx, next) => {
  // ctx.router available
  ctx.body = JSON.stringify({code:0, data:'这是一个h5请求'})
})
router.get('/manage/qrcode/list', (ctx, next) => {
  console.log('请求列表')
  ctx.body = {code: 0, data: [{id:2, name: '一个'}]}
})


module.exports = router