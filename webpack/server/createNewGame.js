const { getGameById } = require('./getGameById')

const createNewGame = () => getGameById(1)

module.exports = {
  createNewGame
}
