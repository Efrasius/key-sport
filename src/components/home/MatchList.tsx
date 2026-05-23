import { Text, View, StyleSheet } from 'react-native'
import { TeamConfig } from '../../config/general.config'
import { useTeamConfig } from '../../hooks/useTeamConfig'
import { Match } from '../../types/match'
import MatchCard from '../common/MatchCard'

export default function MatchList({ matchList, sectionTitle, nbr }: {
  matchList: Match[]
  sectionTitle: string
  nbr?: number
}) {
  const config = useTeamConfig()
  const styles = makeStyles(config.theme)

  if (matchList.length === 0) return null // ne pas afficher les sections vides

  const displayed = nbr ? matchList.slice(0, nbr) : matchList

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={[styles.accent, { backgroundColor: config.theme.btnColor }]} />
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        <Text style={styles.count}>{matchList.length}</Text>
      </View>
      <View style={styles.matchList}>
        {displayed.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </View>
    </View>
  )
}

function makeStyles(theme: TeamConfig['theme']) {
  return StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10,
    },
    accent: {
      width: 3,
      height: 14,
      borderRadius: 2,
    },
    sectionTitle: {
      flex: 1,
      color: theme.textColor,
      fontWeight: '700',
      fontSize: 12,
      letterSpacing: 1.2,
      opacity: 0.9,
    },
    count: {
      color: theme.iconColor,
      fontSize: 12,
      fontWeight: '600',
    },
    matchList: {
      gap: 8,
    },
  })
}