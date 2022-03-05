console.log('静态文件引用')

fetch('/manage/qrcode/list').then(res => {
  console.log('获取到的列表是', res)
}).catch(err => {
  console.log('失败', err)
})