import React, { FC, useContext, useEffect, useState } from 'react'
import * as Fingerprint from '@fingerprintjs/fingerprintjs-pro'
import { Game } from '../Game'
import { useApi, useLocalStorage } from '../../hooks'
import { AppContext, IAppConfig } from '../../contexts'
import { FINGERPRINT_API_KEY } from '../../constants'
import { EAppState } from '../../types'
import { Styled } from './styled'

const defaultApp: IAppConfig = {
  fingerprint: '',
  language: '',
  settings: { wordLength: 0, maxRounds: 0 }
}

export const App: FC = () => {
  const [app, setApp] = useLocalStorage<IAppConfig>('app', defaultApp)
  const { getSettings } = useApi()
  const {
    setFingerprint,
    setLanguage,
    setSettings,
    settings: { wordLength, maxRounds }
  } = useContext(AppContext)
  const [status, setStatus] = useState(EAppState.LOADING)
  const { fingerprint, language } = app

  useEffect(() => {
    if (fingerprint) {
      setFingerprint(fingerprint)
      return
    }

    Fingerprint.load({ apiKey: FINGERPRINT_API_KEY! })
      .then(async (fp) => await fp.get())
      .then(({ visitorId: fingerprint }) => {
        setFingerprint(fingerprint)
        setApp((app) => ({ ...app, fingerprint }))
      })
      .catch(console.error)
  }, [fingerprint])

  useEffect(() => {
    getSettings()
      .then(({ data: { defaultLanguage, ...settings } }) => {
        setLanguage(language || defaultLanguage)
        setSettings(settings)

        if (!language) {
          setApp((app) => ({ ...app, language: defaultLanguage }))
        }
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (fingerprint && language && wordLength && maxRounds) {
      setStatus(EAppState.READY)
    }
  }, [fingerprint, language, wordLength, maxRounds])

  return (
    <Styled.Container>
      {
        {
          [EAppState.LOADING]: 'loading...',
          [EAppState.ERROR]: 'error!',
          [EAppState.READY]: <Game rounds={maxRounds} wordLength={wordLength} />
        }[status]
      }
    </Styled.Container>
  )
}
