import { Text, View, StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { TeamConfig } from '../../config/general.config'
import { useTeamConfig } from '../../hooks/useTeamConfig'
import { useTranslation } from '../../hooks/useTranslation'
import { Match } from '../../types/match'

export default function MatchCard({ match }: { match: Match }) {
    const config = useTeamConfig()
    const t = useTranslation()
    const styles = makeStyles(config.theme, match.status)

    // useEffect(() => {
    //     console.log('match: ', match)
    //     console.log('date: ', match.date.toISOString())
    // }, [match])

    return (
        <View style={styles.container}>
            <View style={styles.puceContainer}>
                <View style={styles.puce}>
                    <Text style={styles.puceText}>
                        {match.status === 'upcoming'
                            ? getTimeUntil(match.date, t.match.timeUntil)
                            : t.match.status[match.status as keyof typeof t.match.status] ?? match.status}
                    </Text>
                </View>
                <View style={styles.puce}>
                    <Text style={styles.puceTextGame}>{match.game}</Text>
                </View>
            </View>
            <View style={styles.teamsContainer}>
                <Text style={styles.teamName}>{match.teams[0]}</Text>
                <Text style={styles.vs}>VS</Text>
                <Text style={styles.teamName}>{match.teams[1]}</Text>
            </View>
            <Text style={styles.description}>
                {match.tournament}
            </Text>
        </View>
    )
}

function getTimeUntil(
    date: Date,
    t: { soon: string; days: (n: number) => string; hours: (n: number) => string }
): string {
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return t.soon
    if (diffDays >= 1) return t.days(diffDays)
    return t.hours(diffHours)
}

function makeStyles(theme: TeamConfig['theme'], status: string) {
    const textColor = getColor(status, theme)

    return StyleSheet.create({
        container: {
            width: '95%',
            // backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 15,
            borderRadius: 15,
            marginTop: 10,
            marginHorizontal: 'auto',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)'
        },
        puceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        puce: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            alignSelf: 'flex-start',
        },
        puceText: {
            color: textColor,
        },
        puceTextGame: {
            color: theme.textColor,
        },
        teamsContainer: {
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        teamName: {
            color: theme.textColor,
            fontSize: 20,
            fontWeight: 'bold',
        },
        vs: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 20,
        },
        description: {
            color: 'rgba(255, 255, 255, 0.5)',
        },
    })
}

function getColor(status: string, theme: TeamConfig['theme']) {
    switch (status) {
        case 'live':
            return theme.tabIconSelectedColor
        case 'lost':
            return '#FF6B6B'
        case 'won':
            return '#4CAF82'
        case 'upcoming':
            return '#F0A500'
        default:
            return theme.textColor
    }
}