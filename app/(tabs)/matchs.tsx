import { ScrollView, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { TeamConfig } from '../../src/config/general.config';
import { getMatches } from '../../src/api/matches';
import MatchList from '../../src/components/home/MatchList';

export default function Matchs() {
  const config = useTeamConfig();
  const styles = makeStyles(config.theme);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const { isPending, isError, data } = useQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
  });

  const games = config.games; // string[] from TeamConfig
  const filtered = data
    ? selectedGame
      ? data.filter((m) => m.game === selectedGame)
      : data
    : [];

  return (
    <ScrollView style={styles.container}>
      {/* Game filter pills */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.pill, selectedGame === null && styles.pillActive]}
          onPress={() => setSelectedGame(null)}
        >
          <Text style={[styles.pillText, selectedGame === null && styles.pillTextActive]}>Tous</Text>
        </TouchableOpacity>
        {games.map((game) => (
          <TouchableOpacity
            key={game}
            style={[styles.pill, selectedGame === game && styles.pillActive]}
            onPress={() => setSelectedGame(game === selectedGame ? null : game)}
          >
            <Text style={[styles.pillText, selectedGame === game && styles.pillTextActive]}>
              {game.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isPending && (
        <View style={styles.stateContainer}>
          <ActivityIndicator color={config.theme.btnColor} />
        </View>
      )}
      {isError && (
        <View style={styles.stateContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Impossible de charger les matchs</Text>
        </View>
      )}
      {!isPending && !isError && data && (
        <>
          <MatchList
            sectionTitle="EN COURS"
            matchList={filtered.filter((m) => m.status === 'live')}
          />
          <MatchList
            sectionTitle="PROCHAINS MATCHS"
            matchList={filtered.filter((m) => m.status === 'upcoming')}
          />
          <MatchList
            sectionTitle="PASSÉS"
            matchList={filtered.filter((m) => m.status === 'won' || m.status === 'lost')}
          />
        </>
      )}
    </ScrollView>
  );
}

function makeStyles(theme: TeamConfig['theme']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    filterRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
    },
    pill: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.iconColor,
    },
    pillActive: {
      backgroundColor: theme.btnColor,
      borderColor: theme.btnColor,
    },
    pillText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.iconColor,
      letterSpacing: 0.5,
    },
    pillTextActive: {
      color: '#FFFFFF',
    },
    stateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 80,
      gap: 10,
    },
    errorIcon: {
      fontSize: 40,
    },
    errorTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.textColor,
    },
  });
}