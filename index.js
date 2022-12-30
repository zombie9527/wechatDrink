// import { WechatyBuilder } from 'wechaty'
const { WechatyBuilder } = require('wechaty')
const moment = require('moment')
const Qrcode = require('qrcode-terminal')
const http = require('http');


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
  })
  .on('message', message => {
    if (message?.payload?.text === '@喝水') {
      button = true;
      messageRoom();
      if (!interval) {
        interval = setInterval(messageRoom, 60 * 60 * 1000)
      }
    } else if (message?.payload?.text === '@睡觉') {
      button = false;
    } else if (message?.payload?.text === '@讲笑话') {
      getJoke();
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
  sendMessage('喝水时间到了!')
}

async function sendMessage(message) {
  const roomConnection = await wechaty.Room.find('何禾子的健康生活')
  roomConnection.say(message)
}


async function getJoke() {
  const options = {
    'method': 'GET',
    'hostname': '127.0.0.1',
    'port': 8090,
    'path': '/j?type=1',
  };

  const req = http.request(options, function (res) {
    let chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      // console.log(body.toString());
      // ress(body)
      sendMessage(body)
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  req.end();
}
