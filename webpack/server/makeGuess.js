const { WORD } = require('./constants')
const { getGameById } = require('./getGameById')

const makeGuess = ({ id }, { guess }) => {
  const guessLower = guess.toLowerCase().split('')
  const wordLower = WORD.toLowerCase().split('')
  const count = {}

  const result = guessLower.map((character, i) => {
    const isEqual = character === wordLower[i]

    if (!isEqual) {
      count[wordLower[i]] = (count[wordLower[i]] || 0) + 1
    }

    return {
      character: character.toUpperCase(),
      position: isEqual,
      exists: isEqual
    }
  })

  for (let i = 0; i < result.length; i++) {
    const character = guessLower[i]

    if (!result[i].position && count[character]) {
      count[character] -= 1
      result[i].exists = true
    }
  }

  return {
    ...getGameById(id),
    guess: [{ id: 1, result }]
  }
}

module.exports = {
  makeGuess
}
