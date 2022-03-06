console.log('静态文件引用')

fetch('/manage/qrcode/list').then(res => {
  console.log('获取到的列表是', res)
}).catch(err => {
  console.log('失败', err)
})

function adduser() {
  fetch('/manage/user/add', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      cookie: 'alksdjflka',
    },
    body: JSON.stringify({
      name: '我的老家3',
      pwd: '123】【；6',
    })
  }).then(res => {
    console.log('添加用户结果', res)
  })
}