const WebSocket = require('ws')
const {v4: uuidv4} = require('uuid')

let leightIsOn = 'off'
const PORT = process.env.PORT || 8000

const wss = new WebSocket.Server({port: PORT})
const clients = {}

wss.on('connection', (ws) => {
  console.log(Object.keys(clients).length)
  console.log(`Port open on: ${PORT}`)
  const id = uuidv4()
  clients[id] = ws
  ws.send(leightIsOn)

  ws.on('message', (message) => {
    const data = message.toString()
    console.log('Получено сообщение: %s', message)
    leightIsOn = data
    message = leightIsOn

    for (const id in clients) {
      clients[id].send(message)
    }
  })
})
