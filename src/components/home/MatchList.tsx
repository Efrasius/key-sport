import { Text, View, StyleSheet } from 'react-native'
import { TeamConfig } from '../../config/general.config'
import { useTeamConfig } from '../../hooks/useTeamConfig'
import { Match } from '../../types/match'
import MatchCard from '../common/MatchCard'


export default function MatchList({ matchList, status }: { matchList: Match[], status: 'live' | 'upcoming' | 'past' }) {
    const config = useTeamConfig()
    const styles = makeStyles(config.theme)

    const sectionTitle = {
        live: 'EN COURS',
        upcoming: 'PROCHAINS MATCHS',
        past: 'RÉSULTATS RÉCENTS',
    }[status]


    return (
        <View style={styles.container}>
            <Text style={{ color: config.theme.textColor }}>
                {sectionTitle}
            </Text>

            <View style={styles.matchList}>
                {matchList.map((match) =>
                    <MatchCard
                        key={match.id}
                        match={match}
                    />
                )}
            </View>
        </View>
    )
}

function makeStyles(theme: TeamConfig['theme']) {
    return StyleSheet.create({
        container: {
            margin: 15,
        },
        matchList: {
        }
    })
}