console.log('静态文件引用')

function adduser() {
  fetch('/api/user/add', {
    method: 'POST',
    headers:{
      // 'auth':  `${window.localStorage.getItem('token')}`,
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'admin',
      pwd: 'disaisi123456',
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log('添加用户结果', res)
  })
}

function edituser() {
  fetch('/api/user/edit', {
    method: 'POST',
    headers:{
      'auth':  `${window.localStorage.getItem('token')}`,
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      oldname: 'admin',
      oldpwd: 'disaisi123456',
      newname: 'newname',
      newpwd: 'newpassword'
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log('修改用户结果', res)
  })
}

function resetuser () {
  fetch('/api/user/resetAdmin', {
    method: 'POST',
    headers:{
      'auth':  `${window.localStorage.getItem('token')}`,
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'newname',
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log('重置用户结果', res)
  })
}

function deleteuser () {
  fetch('/api/user/delete', {
    method: 'POST',
    headers:{
      'auth':  `${window.localStorage.getItem('token')}`,
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'admin',
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log('删除用户结果', res)
  })
}

const Api = function (url, data) {
  return fetch(url, {
    method: 'POST',
    headers:{
      'auth':  `${window.localStorage.getItem('token')}`,
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(res => {
    return res.json()
  })
}

function getQrcodeList (){
  Api('/api/qrcode/list', {
    page: 1,
  }).then(res => {
    console.log('获得二维码列表结果', res)
  })
}
function addQrcode (){
  Api('/api/qrcode/add', {
    name: '二维码名字5',
    secret: 'this is mima',
    company: '所属公司5',
    meetingRooms: '所属会议室',
    config: [{type: 'btn', title: '按钮提示', name: '按钮名称'}]
  }).then(res => {
    console.log('新增二维码列表结果', res)
  })
}

function delQrcodeDetail (id){
  Api('/api/qrcode/delete', {
    id: id
  }).then(res => {
    console.log('删除二维码列表结果', res)
  })
}

function getQrcodeDetail (id){
  Api('/api/qrcode/detail', {
    id: id
  }).then(res => {
    console.log('获得二维码列表结果', res)
  })
}

function updateQrcode (id){
  Api('/api/qrcode/update', {
    id: id,
    name: '新的名字',
  }).then(res => {
    console.log('更新二维码列表结果', res)
  })
}
function getH5QrcodeDetail(id) {
  Api('/apih5/qrcode/detail', {
    id: id
  }).then(res => {
    console.log('获得二维码列表结果', res)
  })
}
function getH5QrcodeDetailBySec(id) {
  Api('/apih5/qrcode/detailBySrc', {
    id: id,
    secret: 'this is mima'
  }).then(res => {
    console.log('获得二维码列表结果', res)
  })
}