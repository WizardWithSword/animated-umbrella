const Datastore = require('nedb')
const db = {}
const path = require('path')

console.log('___dirname', path)
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

module.exports = dbApi