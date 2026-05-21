import { ScrollView, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { TeamConfig } from '../../src/config/general.config';
import { Match } from '../../src/types/match';
import { getMatches } from '../../src/api/matches';
import MatchList from '../../src/components/home/MatchList';


export default function Tab() {
  const config = useTeamConfig()
  const styles = makeStyles(config.theme)

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['matches'],
    queryFn: getMatches
  })



  return (
    <ScrollView style={styles.container}>
      {isPending && <View style={styles.errorContainer}><ActivityIndicator /></View>}
      {isError &&
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Impossible de charger les matchs</Text>
        </View>}
      {(!isPending && !isError && data) &&
        <>
          <MatchList
            status={'live'}
            matchList={data.filter((match) => match.status === 'live')}
          />
          <MatchList
            status={'upcoming'}
            matchList={data.filter((match) => match.status === 'upcoming')}
          />
          <MatchList
            status={'past'}
            matchList={data.filter((match) => match.status === 'won' || match.status === 'lost')}
          />
        </>
      }
    </ScrollView >
  );
}


function makeStyles(theme: TeamConfig['theme']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    errorContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      gap: 8,
    },
    errorIcon: {
      fontSize: 48,
    },
    errorTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.textColor,
    },
    errorMessage: {
      fontSize: 14,
      color: theme.textColor,
      opacity: 0.6,
      textAlign: 'center',
    },
  });
}
