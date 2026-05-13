import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'
import { STORAGE_KEY_LANG } from '@/lib/storage'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: (() => { try { return localStorage.getItem(STORAGE_KEY_LANG) ?? 'en' } catch { return 'en' } })(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', (lng) => {
  try { localStorage.setItem(STORAGE_KEY_LANG, lng) } catch { /* storage unavailable */ }
})

export default i18n
