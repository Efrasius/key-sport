import { ImageSourcePropType } from 'react-native'

type Sponsor = {
    logo: ImageSourcePropType
    name: string
}

type Media = {
    platform: ('youtube' | 'twitch')
    link: string
}

type SocialMedia = {
    platform: ('twitter' | 'instagram' | 'tiktok' | 'discord')
    link: string
}

export interface TeamConfig {
    id: string
    name: string
    abbreviation: string
    slug: string          // pour Firestore et Liquipedia
    games: string[]
    languages: ('fr' | 'en')[]
    theme: {
        backgroundColor: string
        textColor: string
        logo: ImageSourcePropType
        logoSquare: ImageSourcePropType
        backgroundImage?: ImageSourcePropType
        btnColor?: string
        headerBackgroundColor: string
        iconColor: string
        tabIconDefaultColor: string
        tabIconSelectedColor: string
    }
    sponsors: Sponsor[]

    features: {
        previsions: boolean
        leaderboard: boolean
        realtime: boolean
        //ajouter les futures features
    }

    content: {
        medias: Media[]
        socialMedias?: SocialMedia[]
    }
}