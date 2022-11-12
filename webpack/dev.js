const { merge } = require('webpack-merge')
const bodyParser = require('body-parser')
const common = require('./common')
const { createNewGame, getGameById, makeGuess } = require('./server')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    liveReload: true,
    setupMiddlewares: (middlewares, { app }) => {
      app.use(bodyParser.json())
      app.post('/api/game', createNewGame)
      app.get('/api/game/:id', getGameById)
      app.patch('/api/game/:id', makeGuess)

      return middlewares
    }
  }
})
