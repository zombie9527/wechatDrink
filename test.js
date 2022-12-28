const moment = require('moment')
const Qrcode = require('qrcode-terminal')

const a = moment().hour();
console.log(a)
Qrcode.generate(a, { small: true })
