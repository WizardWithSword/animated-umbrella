const dbApi = require('../database');
const init = function(router){
  // 获取二维码列表
  router.post('/api/qrcode/list', async (ctx, next)=> {
    const data = ctx.request.body
    const { page, pageIndex } = data
    await dbApi.getQrCodeList({
      page: page || 1,
      pageIndex: pageIndex || 3
    }).then(doc => {
      console.log('本地的二维码列表是', doc)
      ctx.body = {code: 0, data: doc, msg: 'success'}
    })
  })
  // 获取二维码详情
  router.post('/api/qrcode/detail', async (ctx, next) => {
    const data = ctx.request.body
    const { id } = data
    await dbApi.getQrCodeDetail({
      _id: id
    }).then(doc => {
      console.log('二维码详情是', doc)
      ctx.body = {code: 0, data: doc, msg: 'success'}
    })
  })
  // 编辑二维码
  router.post('/api/qrcode/update', async (ctx, next) => {
    const data = ctx.request.body
    const { id } = data
    await dbApi.updateQrCode(id, {
      ...data
    }).then(res => {
      ctx.body = {code: 0, msg: 'success'}
    })
  })
  // 新增二维码
  router.post('/api/qrcode/add', async (ctx, next) => {
    const data = ctx.request.body
    // 先查询name不能重名
    await dbApi.addQrCode(data).then(res => {
      ctx.body = {code: 0, msg: 'success'}
    }).catch(err => {
      ctx.body = {code: 10010, msg: 'db insert error'}
    })
  })
  // 删除二维码
  router.post('/api/qrcode/delete', async (ctx, next)=> {
    const data = ctx.request.body
    const { id } = data
    await dbApi.updateQrCode(id, {
      delete: 1
    }).then(res => {
      ctx.body = {code: 0, msg: 'success'}
    })
  })

  // h5接口，获取二维码详情
  router.get('/apih5/qrcode/detail', async (ctx, next) => {
    const data = ctx.request.body
    const { id } = data
  })
}
module.exports = init