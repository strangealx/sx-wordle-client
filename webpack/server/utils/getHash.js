const crypto = require('crypto')

const getHash = (word, salt) =>
  crypto.createHash('sha512').update(`${word}-${salt}`).digest('hex')

module.exports = {
  getHash
}
