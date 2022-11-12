const { WORD, SALT } = require('./constants')
const { getHash } = require('./utils')

const getGameById = ({ id }) => {
  const isSuccess = Number(id) === 2

  return {
    id: id || 1,
    hash: getHash(WORD, SALT),
    complete: isSuccess,
    guess: isSuccess
      ? [
          {
            id: 1,
            result: new Array(5).fill({
              character: 'A',
              position: true,
              exists: true
            })
          }
        ]
      : [],
    ...(isSuccess ? { salt: SALT, result: 'SUCCESS', word: WORD } : undefined)
  }
}

module.exports = {
  getGameById
}
