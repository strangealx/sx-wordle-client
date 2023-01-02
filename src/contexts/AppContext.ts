import { createContext, Dispatch, SetStateAction } from 'react'

export interface IAppSettings {
  wordLength: number
  maxRounds: number
}

export interface IAppConfig {
  language: string
  fingerprint: string
  settings: IAppSettings
}

export interface IAppContext extends IAppConfig {
  setLanguage: Dispatch<SetStateAction<string>>
  setFingerprint: Dispatch<SetStateAction<string>>
  setSettings: Dispatch<SetStateAction<IAppSettings>>
}

export const AppContext = createContext<IAppContext>({
  language: '',
  fingerprint: '',
  settings: {
    wordLength: 0,
    maxRounds: 0
  },
  setLanguage: () => undefined,
  setFingerprint: () => undefined,
  setSettings: () => undefined
})
