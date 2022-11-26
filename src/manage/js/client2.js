let client = mqtt.connect('mqtt://127.0.0.1', {
  clientId: 'userB',
  port: 1884
})

console.log('client2.js 客户端链接mqtt', client)

client.on('connect', function () {
  client.subscribe('userB', function (err) {
    if (!err) {
      client.publish('userB', 'Hello mqtt')
    }
  })

  client.subscribe('wheather', function (err) {
    if (!err) {
      console.log('B监听weather 消息成功')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('userB 收到消息:', topic, message.toString())
  // client.end()
})


function sendmsg() {
  client.publish('wheather', 'Bsaid: how is the weather')
}