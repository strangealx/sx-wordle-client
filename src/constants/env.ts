export const API_PROTOCOL = process.env.API_PROTOCOL ?? 'http'
export const API_HOSTNAME = process.env.API_HOSTNAME?.replace(/\/$/, '') ?? 'localhost'
export const API_PORT = process.env.API_PORT ?? 3000
export const API_PATH = process.env.API_PATH?.replace(/\/$/, '') ?? '/api'
export const FINGERPRINT_API_KEY = process.env.FINGERPRINT_API_KEY
