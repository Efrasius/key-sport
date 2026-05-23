import { ScrollView, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { TeamConfig } from '../../src/config/general.config';
import { Match } from '../../src/types/match';
import { getMatches } from '../../src/api/matches';
import MatchList from '../../src/components/home/MatchList';
import { useAuthStore } from '../../src/stores/authStore';
import { useEffect } from 'react';
import MyRank from '../../src/components/leaderboard/MyRank';


export default function Tab() {
  const config = useTeamConfig()
  const styles = makeStyles(config.theme)
  const authStore = useAuthStore()


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
            matchList={data.filter((match) => match.status === 'live')}
            sectionTitle={'EN COURS'}
          />
          <MatchList
            sectionTitle={'PROCHAIN MATCH'}
            nbr={1}
            matchList={data.filter((match) => match.status === 'upcoming')}
          />
          {authStore.isAuthenticated &&
            <View>
              <View style={styles.sectionHeader}>
                <View style={[styles.accent, { backgroundColor: config.theme.btnColor }]} />
                <Text style={styles.sectionTitle}>MON CLASSEMENT</Text>

              </View>
              <MyRank />

              <View style={styles.sectionHeader}>
                <View style={[styles.accent, { backgroundColor: config.theme.btnColor }]} />
                <Text style={styles.sectionTitle}>RÉSEAUX SOCIAUX</Text>

              </View>
            </View>
          }
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
      padding: 15,
    },
    errorContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
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
  });
}
