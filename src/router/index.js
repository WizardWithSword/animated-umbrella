const Router = require('koa-router');
const dbApi = require('../database');
const router = new Router();
var jwt = require('jsonwebtoken');
const config = require('../config/index')

// 用户模块
const userRouter = require('./user.js')
userRouter(router)

// 二维码模块
const qrCode = require('./qrcode')
qrCode(router)

router.post('/manage/login', async (ctx, next) => {
  const data = ctx.request.body
  console.log('登录开始', data)
  await dbApi.getUser({
    name: data.name,
    pwd:data.pwd
  }).then(doc => {
    console.log('查询到的用户结果', doc)
    if(doc.length) {
      var token = jwt.sign({
        data:{
          name: data.name,
        },
        exp: Math.floor(Date.now() / 1000) + config.jwtExp,
      }, config.jwtSec);
    
      ctx.body = {
          name:data.name,
          code:0,
          token
      }
      console.log('登录成功')
    } else {
      ctx.body = {code: 1, msg: '账号密码错误，请重试'}
      console.log('登录失败')
    }
  })
  next()
})

module.exports = router