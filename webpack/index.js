const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const dev = require('./dev')
const build = require('./build')

module.exports = (env) => {
  const { mode = 'development' } = env

  return merge(mode === 'development' ? dev : build, {
    plugins: [
      new Dotenv({
        path: `./.env.${mode}`
      })
    ]
  })
}
