const dbApi = require('../database');
const init = function(router){
  // 创建用户名和密码
  router.post('/api/user/add', async (ctx, next) => {
    console.log('请求的添加的用户信息', ctx.request.body)
    const data = ctx.request.body
    await dbApi.getUser({name: data.name}).then(async (doc)=> {
      console.log('查询用户的结果', doc)
      if(doc && doc.length > 0) {
        console.log('已有记录，不再添加')
        ctx.body = {cdoe: 100, msg: 'user exists!'}
      } else {
        await dbApi.addUser({name: data.name, pwd: data.pwd}).then((doc2) => {
          console.log('添加新用户的结果', doc2)
          if(doc2?._id) {
            ctx.body = {cdoe: 0, msg: 'user add success'}
          } else {
            ctx.body = {cdoe: 201, msg: 'user add fail! try again'}
          }
        }).catch(err => {
          ctx.body = {cdoe: 202, msg: 'add user to db error'}
        })
      }
    }).catch(err => {
      console.log('查询用户信息失败')
      ctx.body = {cdoe: 200, msg: 'find user error'}
    })
  })
  // 修改用户名和密码。
  router.post('/api/user/edit', async (ctx, res) => {
    console.log('请求的编辑的用户信息', ctx.request.body)
    const data = ctx.request.body
    if(data.oldname && data.oldpwd && data.newname && data.newpwd) {
      await dbApi.getUser({name: data.oldname, pwd: data.oldpwd}).then(async doc => {
        if(doc?.length > 0) {
          await dbApi.editUser({
            _id: doc[0]._id,
            name: data.newname,
            pwd: data.newpwd
          }).then(doc => {
            console.log('编辑用户的结果是', doc)
            if(doc) {
              ctx.body = {code: 0, msg: '重置成功'}
            } else {
              ctx.body = {code: 10003, msg: 'update db error'}
            }
          })
        } else {
          ctx.body = {code: 10001, msg: 'user name and password error'}
        }
      })
    } else {
      ctx.body = {code: 10002, msg: '请完整输入内容'}
    }
  })
  // 初始化用户名和密码
  router.post('/api/user/resetAdmin', async (ctx, next)=> {
    console.log('请求的重置的用户信息', ctx.request.body)
    const data = ctx.request.body
    if(data.name) {
      await dbApi.getUser({name: data.name}).then(async doc => {
        if(doc?.length > 0) {
          await dbApi.editUser({
            _id: doc[0]._id,
            name: 'admin',
            pwd: 'disaisi123456'
          }).then(doc => {
            console.log('重置用户的结果是', doc)
            if(doc) {
              ctx.body = {code: 0, msg: '重置成功'}
            } else {
              ctx.body = {code: 10003, msg: 'update db error'}
            }
          })
        } else {
          ctx.body = {code: 10001, msg: 'user name and password error'}
        }
      })
    } else {
      ctx.body = {code: 10002, msg: '请完整输入内容'}
    }
  })

  // 删除用户名和密码
  router.post('/api/user/delete', async (ctx, next)=> {
    console.log('请求删除的用户信息', ctx.request.body)
    const data = ctx.request.body
    if(data.name) {
      await dbApi.getUser({name: data.name}).then(async doc => {
        if(doc?.length > 0) {
          await dbApi.removeUser({
            _id: doc[0]._id,
          }).then(doc => {
            console.log('删除用户的结果是', doc)
            if(doc) {
              ctx.body = {code: 0, msg: '删除成功'}
            } else {
              ctx.body = {code: 10003, msg: 'delete db error'}
            }
          })
        } else {
          ctx.body = {code: 10001, msg: 'user name and password error'}
        }
      })
    } else {
      ctx.body = {code: 10002, msg: '请完整输入内容'}
    }
  })
}
module.exports = init