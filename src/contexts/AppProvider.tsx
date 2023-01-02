import React, { FC, useState } from 'react'
import { AppContext } from './AppContext'

interface Props {
  children?: React.ReactNode
}

export const AppProvider: FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<string>('')
  const [fingerprint, setFingerprint] = useState<string>('')
  const [settings, setSettings] = useState({ wordLength: 0, maxRounds: 0 })

  const context = {
    language,
    fingerprint,
    settings,
    setLanguage,
    setFingerprint,
    setSettings
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
