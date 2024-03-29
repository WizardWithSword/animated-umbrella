const Datastore = require('nedb')
const db = {}
const path = require('path')

db.user = new Datastore({ filename: path.resolve(__dirname, '../../data/user.db'), autoload: true });
db.qrcode = new Datastore({ filename: path.resolve(__dirname, '../../data/qrcode.db'), autoload: true });

const dbApi = {}
dbApi.getUser = (query) => {
  return new Promise(function(resolve, reject) {
    db.user.find(query, (err, doc) => {
      if(err) {
        reject(err)
      } else{
        resolve(doc)
      }
    })
  })
}
dbApi.addUser = (params) => {
  console.log('添加的内容', params)
  return new Promise(function(resolve, reject) {
    db.user.insert(params, function (err, doc){
      if(err) {
        reject(err)
      } else{
        resolve(doc)
      }
    })
  })
}
dbApi.editUser = (params) => {
  console.log('编辑的内容', params)
  return new Promise(function(resolve, reject) {
    db.user.update({_id: params._id}, {
      $set: { 
        name: params.name,
        pwd: params.pwd
      }
    }, {}, function (err, doc){
      if(err) {
        reject(err)
      } else{
        resolve(doc)
      }
    })
  })
}
dbApi.removeUser = (params) => {
  return new Promise(function(resolve, reject) {
    db.user.remove({_id: params._id}, {}, function (err, doc){
      if(err) {
        reject(err)
      } else{
        resolve(doc)
      }
    })
  })
}

dbApi.getQrCodeList = (params) => {
  console.log('查询参数', params)
  const {page, pageSize} = params
  const skip = (page - 1) * pageSize
  const data = JSON.parse(JSON.stringify(params))
  delete data.page
  delete data.pageSize
  data.delete = {
    $ne: 1
  }
  return new Promise(function(resolve, reject) {
    db.qrcode.find(data).sort({ createTime: -1 }).skip(skip).limit(pageSize).exec(function (err, doc) {
      if(err) {
        reject(err)
      } else{
        db.qrcode.count(data, function (err, count) {
          resolve({doc, count})
        });
      }
    });
  })
}
dbApi.getQrCodeDetail = (params) => {
  console.log('查询数据库参数', params)
  params.delete = {
    $ne: 1
  }
  return new Promise(function(resolve, reject) {
    db.qrcode.findOne(params, (err, doc) => {
      if(err) {
        reject(err)
      } else{
        resolve(doc)
      }
    })
  })
}
dbApi.addQrCode = (params) => {
  params.createTime = new Date()
  return new Promise(function(resolve, reject) {
    db.qrcode.insert(params, (err, doc) => {
      if(err) {
        reject(err)
      } else{
        resolve(doc)
      }
    })
  })
}
dbApi.updateQrCode = (id, params) => {
  const data = JSON.parse(JSON.stringify(params))
  delete data._id
  delete data.id
  data.updateTime = new Date()
  return new Promise(function(resolve, reject) {
    db.qrcode.update({_id: id},{ 
      $set: {
        ...data
      }
    },{}, (err, doc) => {
      if(err) {
        reject(err)
      } else{
        resolve(doc)
      }
    })
  })
}

module.exports = dbApi