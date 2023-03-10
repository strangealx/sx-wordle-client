/* tslint:disable */
/* eslint-disable */
/**
 * sx-wordle
 * Simple wordle like game
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from './configuration'
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios'
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction
} from './common'
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base'

/**
 *
 * @export
 * @interface Character
 */
export interface Character {
  /**
   *
   * @type {string}
   * @memberof Character
   */
  character: string
  /**
   *
   * @type {boolean}
   * @memberof Character
   */
  position: boolean
  /**
   *
   * @type {boolean}
   * @memberof Character
   */
  exists: boolean
}
/**
 *
 * @export
 * @interface Game
 */
export interface Game {
  /**
   *
   * @type {number}
   * @memberof Game
   */
  id: number
  /**
   * sha-512 hash of the word
   * @type {string}
   * @memberof Game
   */
  hash: string
  /**
   * salt used for hash, presented when complete is \"true\"
   * @type {string}
   * @memberof Game
   */
  secret?: string
  /**
   *
   * @type {boolean}
   * @memberof Game
   */
  isCompleted: boolean
  /**
   *
   * @type {Array<GuessResponse>}
   * @memberof Game
   */
  guess: Array<GuessResponse>
  /**
   * presented when complete is \"true\"
   * @type {string}
   * @memberof Game
   */
  status?: GameStatusEnum
  /**
   * the word, presented when complete is \"true\"
   * @type {string}
   * @memberof Game
   */
  word?: string
}

export const GameStatusEnum = {
  Success: 'SUCCESS',
  Fail: 'FAIL',
  InProgress: 'IN_PROGRESS'
} as const

export type GameStatusEnum = typeof GameStatusEnum[keyof typeof GameStatusEnum]

/**
 *
 * @export
 * @interface Guess
 */
export interface Guess {
  /**
   *
   * @type {string}
   * @memberof Guess
   */
  guess: string
}
/**
 *
 * @export
 * @interface GuessResponse
 */
export interface GuessResponse {
  /**
   *
   * @type {number}
   * @memberof GuessResponse
   */
  id: number
  /**
   *
   * @type {Array<Character>}
   * @memberof GuessResponse
   */
  result: Array<Character>
}
/**
 *
 * @export
 * @interface Language
 */
export interface Language {
  /**
   *
   * @type {number}
   * @memberof Language
   */
  id: number
  /**
   *
   * @type {string}
   * @memberof Language
   */
  code: string
}
/**
 *
 * @export
 * @interface Settings
 */
export interface Settings {
  /**
   *
   * @type {number}
   * @memberof Settings
   */
  wordLength: number
  /**
   *
   * @type {number}
   * @memberof Settings
   */
  maxRounds: number
  /**
   *
   * @type {string}
   * @memberof Settings
   */
  defaultLanguage: string
}

/**
 * WordleApi - axios parameter creator
 * @export
 */
export const WordleApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Create new game instance
     * @param {string} xFingerprint
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createNewGame: async (
      xFingerprint: string,
      acceptLanguage?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'xFingerprint' is not null or undefined
      assertParamExists('createNewGame', 'xFingerprint', xFingerprint)
      const localVarPath = `/game`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      if (xFingerprint != null) {
        localVarHeaderParameter['X-Fingerprint'] = String(xFingerprint)
      }

      if (acceptLanguage != null) {
        localVarHeaderParameter['Accept-Language'] = String(acceptLanguage)
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers }

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Find game by id
     * @param {number} id
     * @param {string} xFingerprint
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getGameById: async (
      id: number,
      xFingerprint: string,
      acceptLanguage?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('getGameById', 'id', id)
      // verify required parameter 'xFingerprint' is not null or undefined
      assertParamExists('getGameById', 'xFingerprint', xFingerprint)
      const localVarPath = `/game/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(id)))
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      if (xFingerprint != null) {
        localVarHeaderParameter['X-Fingerprint'] = String(xFingerprint)
      }

      if (acceptLanguage != null) {
        localVarHeaderParameter['Accept-Language'] = String(acceptLanguage)
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers }

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Get available languages
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getLanguageList: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/language/list`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers }

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Get game settings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSettings: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/settings`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers }

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Add new guess
     * @param {number} id
     * @param {string} xFingerprint
     * @param {Guess} guess
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    makeGuess: async (
      id: number,
      xFingerprint: string,
      guess: Guess,
      acceptLanguage?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('makeGuess', 'id', id)
      // verify required parameter 'xFingerprint' is not null or undefined
      assertParamExists('makeGuess', 'xFingerprint', xFingerprint)
      // verify required parameter 'guess' is not null or undefined
      assertParamExists('makeGuess', 'guess', guess)
      const localVarPath = `/game/{id}/guess`.replace(`{${'id'}}`, encodeURIComponent(String(id)))
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      if (xFingerprint != null) {
        localVarHeaderParameter['X-Fingerprint'] = String(xFingerprint)
      }

      if (acceptLanguage != null) {
        localVarHeaderParameter['Accept-Language'] = String(acceptLanguage)
      }

      localVarHeaderParameter['Content-Type'] = 'application/json'

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers }
      localVarRequestOptions.data = serializeDataIfNeeded(guess, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    }
  }
}

/**
 * WordleApi - functional programming interface
 * @export
 */
export const WordleApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = WordleApiAxiosParamCreator(configuration)
  return {
    /**
     *
     * @summary Create new game instance
     * @param {string} xFingerprint
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createNewGame(
      xFingerprint: string,
      acceptLanguage?: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Game>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createNewGame(xFingerprint, acceptLanguage, options)
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)
    },
    /**
     *
     * @summary Find game by id
     * @param {number} id
     * @param {string} xFingerprint
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getGameById(
      id: number,
      xFingerprint: string,
      acceptLanguage?: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Game>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getGameById(id, xFingerprint, acceptLanguage, options)
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)
    },
    /**
     *
     * @summary Get available languages
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getLanguageList(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Language>>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getLanguageList(options)
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)
    },
    /**
     *
     * @summary Get game settings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getSettings(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Settings>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getSettings(options)
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)
    },
    /**
     *
     * @summary Add new guess
     * @param {number} id
     * @param {string} xFingerprint
     * @param {Guess} guess
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async makeGuess(
      id: number,
      xFingerprint: string,
      guess: Guess,
      acceptLanguage?: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Game>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.makeGuess(
        id,
        xFingerprint,
        guess,
        acceptLanguage,
        options
      )
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)
    }
  }
}

/**
 * WordleApi - factory interface
 * @export
 */
export const WordleApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = WordleApiFp(configuration)
  return {
    /**
     *
     * @summary Create new game instance
     * @param {string} xFingerprint
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createNewGame(xFingerprint: string, acceptLanguage?: string, options?: any): AxiosPromise<Game> {
      return localVarFp.createNewGame(xFingerprint, acceptLanguage, options).then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Find game by id
     * @param {number} id
     * @param {string} xFingerprint
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getGameById(id: number, xFingerprint: string, acceptLanguage?: string, options?: any): AxiosPromise<Game> {
      return localVarFp
        .getGameById(id, xFingerprint, acceptLanguage, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Get available languages
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getLanguageList(options?: any): AxiosPromise<Array<Language>> {
      return localVarFp.getLanguageList(options).then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Get game settings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSettings(options?: any): AxiosPromise<Settings> {
      return localVarFp.getSettings(options).then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Add new guess
     * @param {number} id
     * @param {string} xFingerprint
     * @param {Guess} guess
     * @param {string} [acceptLanguage]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    makeGuess(
      id: number,
      xFingerprint: string,
      guess: Guess,
      acceptLanguage?: string,
      options?: any
    ): AxiosPromise<Game> {
      return localVarFp
        .makeGuess(id, xFingerprint, guess, acceptLanguage, options)
        .then((request) => request(axios, basePath))
    }
  }
}

/**
 * WordleApi - object-oriented interface
 * @export
 * @class WordleApi
 * @extends {BaseAPI}
 */
export class WordleApi extends BaseAPI {
  /**
   *
   * @summary Create new game instance
   * @param {string} xFingerprint
   * @param {string} [acceptLanguage]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WordleApi
   */
  public createNewGame(xFingerprint: string, acceptLanguage?: string, options?: AxiosRequestConfig) {
    return WordleApiFp(this.configuration)
      .createNewGame(xFingerprint, acceptLanguage, options)
      .then((request) => request(this.axios, this.basePath))
  }

  /**
   *
   * @summary Find game by id
   * @param {number} id
   * @param {string} xFingerprint
   * @param {string} [acceptLanguage]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WordleApi
   */
  public getGameById(id: number, xFingerprint: string, acceptLanguage?: string, options?: AxiosRequestConfig) {
    return WordleApiFp(this.configuration)
      .getGameById(id, xFingerprint, acceptLanguage, options)
      .then((request) => request(this.axios, this.basePath))
  }

  /**
   *
   * @summary Get available languages
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WordleApi
   */
  public getLanguageList(options?: AxiosRequestConfig) {
    return WordleApiFp(this.configuration)
      .getLanguageList(options)
      .then((request) => request(this.axios, this.basePath))
  }

  /**
   *
   * @summary Get game settings
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WordleApi
   */
  public getSettings(options?: AxiosRequestConfig) {
    return WordleApiFp(this.configuration)
      .getSettings(options)
      .then((request) => request(this.axios, this.basePath))
  }

  /**
   *
   * @summary Add new guess
   * @param {number} id
   * @param {string} xFingerprint
   * @param {Guess} guess
   * @param {string} [acceptLanguage]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WordleApi
   */
  public makeGuess(
    id: number,
    xFingerprint: string,
    guess: Guess,
    acceptLanguage?: string,
    options?: AxiosRequestConfig
  ) {
    return WordleApiFp(this.configuration)
      .makeGuess(id, xFingerprint, guess, acceptLanguage, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
