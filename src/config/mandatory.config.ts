import { TeamConfig } from './general.config'
import Logo from '../../assets/teams/mandatory/Logo_Full.png'
import LogoSquare from '../../assets/teams/mandatory/Mandatory.png'


export const mdrConfig = <TeamConfig>{
    id: '1',
    name: 'Mandatory',
    abbreviation: 'MDR',
    slug: 'test1',
    games: ['valorant', 'wow'],
    languages: ['fr'],
    theme: {
        textColor: '#FDFFFC',
        backgroundColor: '#23252C',
        btnColor: '#e0474',
        headerBackgroundColor: '#23252C',
        iconColor: '#9BA1A6',
        tabIconDefaultColor: '#FDFFFC',
        tabIconSelectedColor: '#E71D36',
        logo: Logo,
        logoSquare: LogoSquare,
    },
    sponsors: [{ logo: Logo, name: 'Sponsor test' }],
    features: {
        previsions: true,
        leaderboard: true,
        realtime: false
    },
    content: {
        medias: [{platform: 'twitch', link: 'https://www.twitch.tv/zerator'}],
        socialMedias: [{platform: 'twitter', link: 'https://x.com/MandatoryGG'}]
    }
}