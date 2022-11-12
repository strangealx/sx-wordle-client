import { Configuration, WordleApi } from './generated'
import { API_HOSTNAME, API_PATH, API_PORT, API_PROTOCOL } from '../constants'

const api = new WordleApi(
  new Configuration({
    basePath: `${API_PROTOCOL}://${API_HOSTNAME}${
      API_PORT ? `:${API_PORT}` : ''
    }${API_PATH}`
  })
)

export { api }
