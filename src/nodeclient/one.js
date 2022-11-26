const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost:1883')
const fs = require('fs')
const path = require('path')


client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      // client.publish('presence', 'Hello mqtt')
      const filePath = path.resolve(__dirname, 'dp100.prs')
      // const filePath = path.resolve(__dirname, 'mm.json')
      fs.readFile(filePath, {} ,(error, data) => {
        if(error) {
          console.log('读取失败', error)
        } else {
          // console.log('读取成功',data.length, data)
          process.stdout.write(`<Buffer`)
          for(let i = 0; i < data.length; i++) {
            var bf = ('000'+parseInt(data[i]).toString(16)).substr(-2)
            // console.log()
            process.stdout.write(` ${bf}`)
          }
          process.stdout.write(`>`)
          client.publish('presence', data)
        }
      });
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  // console.log('收到消息', typeof message)
  // console.log(message.toString())
  client.end()
})