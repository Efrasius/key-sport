import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { TeamConfig } from '../../config/general.config'
import { useTeamConfig } from '../../hooks/useTeamConfig'
import { useTranslation } from '../../hooks/useTranslation'
import { Match } from '../../types/match'
import { getTimeUntil } from '../../utils/getTimeUntil'
import { getColor } from '../../utils/getColor'
import Badge from './Badge'

export default function MatchCard({ match }: { match: Match }) {
    const router = useRouter()
    const config = useTeamConfig()
    const t = useTranslation()
    const styles = makeStyles(config.theme)

    return (
        <Pressable onPress={() => router.navigate(`/match/${match.id}`)} style={styles.container}>
            <View style={styles.puceContainer}>
                <Badge
                    color={getColor(match.status, config.theme)}
                    text={
                        match.status === 'upcoming'
                            ? getTimeUntil(match.date, t.match.timeUntil)
                            : t.match.status[match.status as keyof typeof t.match.status] ?? match.status
                    }
                />
                <Badge
                    color={config.theme.textColor}
                    text={match.game}
                />
            </View>
            <View style={styles.teamsContainer}>
                <Text style={styles.teamName}>{match.teams[0]}</Text>
                <Text style={styles.vs}>VS</Text>
                <Text style={styles.teamName}>{match.teams[1]}</Text>
            </View>
            <Text style={styles.description}>
                {match.tournament}
            </Text>
        </Pressable>
    )
}

function makeStyles(theme: TeamConfig['theme']) {

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