const dbApi = require('../database');

// 处理二维码详情，如果有密码，那么仅返回部分字段
function dealQrcodeDetail(detail) {
  if(detail.secret){
    return {
      id: detail._id,
      needPassword: true, // 该二维码需要密码
      name: detail.name
    }
  }
  return detail
}
const init = function(router){
  // 获取二维码列表
  router.post('/api/qrcode/list', async (ctx, next)=> {
    const data = ctx.request.body
    const { page, pageSize } = data
    await dbApi.getQrCodeList({
      page: page || 1,
      pageSize: pageSize || 3
    }).then(res => {
      // console.log('本地的二维码列表是', res)
      ctx.body = {code: 0, data: res.doc, total: res.count, msg: 'success'}
    })
  })
  // 获取二维码详情
  router.post('/api/qrcode/detail', async (ctx, next) => {
    const data = ctx.request.body
    const { id } = data
    await dbApi.getQrCodeDetail({
      _id: id
    }).then(doc => {
      // console.log('二维码详情是', doc)
      // const newData = dealQrcodeDetail(doc)
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
  router.post('/apih5/qrcode/detail', async (ctx, next) => {
    const data = ctx.request.body
    const { id } = data
    console.log('开始获取详情, H5下的二维码')
    await dbApi.getQrCodeDetail({
      _id: id
    }).then(doc => {
      console.log('二维码详情是', doc)
      const newData = dealQrcodeDetail(doc)
      ctx.body = {code: 0, data: newData, msg: 'success'}
    })
  })
  // h5接口，获取二维码详情
  router.post('/apih5/qrcode/detailBySrc', async (ctx, next) => {
    const data = ctx.request.body
    const { id, secret } = data
    await dbApi.getQrCodeDetail({
      _id: id
    }).then(doc => {
      console.log('二维码详情是', doc)
      if(doc.secret === secret) {
        // const newData = dealQrcodeDetail(doc)
        delete doc.secret
        ctx.body = {code: 0, data: doc, msg: 'success'}
      } else {
        ctx.body = {code: 10020, msg: 'wrong secret'}
      }
    })
  })
}
module.exports = init