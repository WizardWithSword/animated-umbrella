
let client = mqtt.connect('mqtt://127.0.0.1', {
  clientId: 'userA',
  port: 1884
})

console.log('client1.js 客户端链接mqtt', client)

client.on('connect', function () {
  client.subscribe('userA', function (err) {
    if (!err) {
      client.publish('userA', 'userA: Hello mqtt')
    }
  })
  client.subscribe('wheather', function (err) {
    if (!err) {
      console.log('A监听weather 消息成功')
    }
  })
})


client.on('message', function (topic, message) {
  // message is Buffer
  console.log('userA 收到消息:', topic, message.toString())
  // client.end()
})


function sendmsg() {
  client.publish('wheather', 'Asaid: how is the weather')
}

function sendfile() {
  var a = new ArrayBuffer(8)
  var view = new Int8Array(a)
  view.set([1,2,3],3)
  console.log('a', a, a.toString())
  client.publish('wheather', a)
}