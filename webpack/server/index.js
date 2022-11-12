const { createNewGame } = require('./createNewGame')
const { makeGuess } = require('./makeGuess')
const { getGameById } = require('./getGameById')
const { createRequestHandler } = require('./utils')

module.exports = {
  createNewGame: createRequestHandler(createNewGame),
  makeGuess: createRequestHandler(makeGuess),
  getGameById: createRequestHandler(getGameById)
}
