// import { WechatyBuilder } from 'wechaty'
const { WechatyBuilder } = require('wechaty')
const moment = require('moment')
const Qrcode = require('qrcode-terminal')


let interval;
let button = true;
const wechaty = WechatyBuilder.build() // get a Wechaty instance
wechaty
  .on('scan', (qrcode, status) =>
    // console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`)
    Qrcode.generate(qrcode, { small: true })
  )
  .on('login', user => {
    console.log(`User ${user} logged in`);
    // messageRoom();
  })
  .on('message', message => {
    // console.log(`Message: ${message}`)
    // console.log(JSON.stringify(message, null, 2))
    if (message?.payload?.text === '@喝水') {
      button = true;
      messageRoom();
      if (!interval) {
        interval = setInterval(messageRoom, 60 * 60 * 1000)
      }
    } else if (message?.payload?.text === '@睡觉') {
      button = false;
    }
  })
wechaty.start()


async function messageRoom() {

  if (!button) {
    return;
  }
  if (moment().hour() > 21) {
    clearInterval(interval);
    interval = null;
  }
  const roomConnection = await wechaty.Room.find('何禾子的健康生活')
  // console.log(JSON.stringify(res, null, 2))
  roomConnection.say('喝水时间到了!')
}


