console.log('静态文件引用')

fetch('/api/manage/qrcode/list', {
  headers:{
    'auth':  `${window.localStorage.getItem('token')}`,
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
}).then(res => {
  if(res.status === 200) {
    return res.json()
  } else if(res.status === 401){
    window.location.replace('/manage/login.html')
    return {code: -1, msg: 'need login'}
  }
  return res
}).then(res => {
  console.log('获取到的列表是', res)
}).catch(err => {
  console.log('失败', err.status)
})

function adduser() {
  fetch('/api/manage/user/add', {
    method: 'POST',
    headers:{
      'auth':  `${window.localStorage.getItem('token')}`,
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '我的老家3',
      pwd: '123】【；6',
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log('添加用户结果', JSON.parse(res.body))
  })
}