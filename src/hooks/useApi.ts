import { AxiosRequestConfig } from 'axios'
import { useContext, useMemo } from 'react'
import { api } from '../api'
import { Guess } from '../api/generated'
import { AppContext } from '../contexts'

type TMethod = keyof typeof api

export const useApi = () => {
  const { fingerprint, language } = useContext(AppContext)
  const methods = useMemo(() => {
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(api)) as TMethod[]
    const methods = properties.reduce<Partial<typeof api>>((carry, name) => {
      if (typeof api[name] === 'function') {
        return {
          ...carry,
          [name]: api[name]
        }
      }

      return carry
    }, {})

    return methods
  }, [])

  const { createNewGame, makeGuess, getGameById, ...restMethods } = methods as Required<typeof methods>
  const noAuthMethods = Object.fromEntries(
    Object.entries(restMethods).map(([key, value]) => [key, value.bind(api)])
  ) as typeof restMethods

  return useMemo(
    () => ({
      ...noAuthMethods,
      createNewGame: async (options?: AxiosRequestConfig<any>) =>
        await createNewGame.call(api, fingerprint, language, options),
      getGameById: async (id: number, options?: AxiosRequestConfig<any>) =>
        await getGameById.call(api, id, fingerprint, language, options),
      makeGuess: async (id: number, guess: Guess, options?: AxiosRequestConfig<any>) =>
        await makeGuess.call(api, id, fingerprint, guess, language, options)
    }),
    [language, fingerprint]
  )
}
