// hooks/useTranslation.ts
import { locales, Locale, Translations } from '../locales'
import { useTeamConfig } from './useTeamConfig'


// À terme : récupérer depuis un contexte, AsyncStorage, etc.
export function useTranslation(): Translations {
    const config = useTeamConfig()

    const locale: Locale = config.languages[0]
    return locales[locale]
}