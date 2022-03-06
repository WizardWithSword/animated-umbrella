const Router = require('koa-router');
const dbApi = require('../database');
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
  next()
  console.log('请求列表结束')
})

router.post('/manage/user/add', async (ctx, next) => {
  console.log('请求的添加的用户信息', ctx.request.body)
  const data = ctx.request.body
  await dbApi.getUser({name: data.name}).then((doc)=> {
    console.log('查询的结果', doc)
    if(doc && doc.length > 0) {
      console.log('已有记录，不再添加')
      ctx.body = {cdoe: 100, msg: 'user exists!'}
    } else {
      dbApi.addUser({name: data.name, pwd: data.pwd}).then((doc2) => {
        console.log('添加的结果', doc2)
        if(doc2?._id) {
          ctx.body = {cdoe: 0, msg: 'user add success'}
        } else {
          ctx.body = {cdoe: 201, msg: 'user add fail! try again'}
        }
      })
    }
  }).catch(err => {
    console.log('查询失败')
    ctx.body = {cdoe: 200, msg: 'find user error'}
  })
})

module.exports = router