import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { TeamConfig } from '../../src/config/general.config';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { useQuery } from '@tanstack/react-query';
import { getLeaderBoard } from '../../src/api/users';
import { useAuthStore } from '../../src/stores/authStore';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const config = useTeamConfig();
  const styles = makeStyles(config.theme);
  const authStore = useAuthStore();

  const { isPending, isError, data } = useQuery({
    queryKey: ['leaderBoard'],
    queryFn: getLeaderBoard,
  });

  const userRank = data?.findIndex((u) => u.id === authStore.id) ?? -1;

  return (
    <ScrollView style={styles.container}>
      {isPending && (
        <View style={styles.centerContainer}>
          <ActivityIndicator color={config.theme.textColor} size="large" />
        </View>
      )}

      {isError && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Impossible de charger le leaderboard</Text>
          <Text style={styles.errorMessage}>Vérifie ta connexion et réessaie.</Text>
        </View>
      )}

      {!isPending && !isError && data && (
        <>
          <Text style={styles.title}>🏆 Top 10</Text>

          <View style={styles.board}>
            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={[styles.headerText, { flex: 0.5 }]}>#</Text>
              <Text style={[styles.headerText, { flex: 3 }]}>Joueur</Text>
              <Text style={[styles.headerText, styles.headerPoints]}>Points</Text>
            </View>

            {/* Rows */}
            {data.map((user, index) => {
              const isEven = index % 2 === 0;
              const isTop3 = index < 3;
              const isCurrentUser = user.id === authStore.id;

              return (
                <View
                  key={index}
                  style={[
                    styles.userRow,
                    isEven ? styles.rowEven : styles.rowOdd,
                    isTop3 && styles.rowTop3,
                    isCurrentUser && styles.rowCurrentUser,
                  ]}
                >
                  {isCurrentUser && <View style={styles.currentUserAccent} />}
                  <Text style={[styles.rankText, { flex: 0.5 }, isCurrentUser && styles.currentUserRank]}>
                    {isTop3 ? MEDALS[index] : `${index + 1}`}
                  </Text>
                  <Text
                    style={[styles.userName, { flex: 3 }, isCurrentUser && styles.currentUserName]}
                    numberOfLines={1}
                  >
                    {user.userName}
                    {isCurrentUser && ' 👤'}
                  </Text>
                  <Text style={[styles.userPoints, isCurrentUser && styles.currentUserPoints]}>
                    {user.totalPoints}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* My score card */}
          <View style={styles.myScoreCard}>
            <View style={styles.myScoreLeft}>
              <Text style={styles.myScoreLabel}>Votre classement</Text>
              <Text style={styles.myScoreRank}>
                {userRank >= 0
                  ? userRank < 3
                    ? MEDALS[userRank]
                    : `#${userRank + 1}`
                  : '—'}
              </Text>
            </View>
            <View style={styles.myScoreDivider} />
            <View style={styles.myScoreRight}>
              <Text style={styles.myScoreLabel}>Vos points</Text>
              <Text style={styles.myScorePoints}>{authStore.totalPoints ?? '—'}</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

function makeStyles(theme: TeamConfig['theme']) {
  const rowOddBg = 'rgba(255, 255, 255, 0.04)';
  const rowEvenBg = 'rgba(255, 255, 255, 0.10)';
  const top3Accent = 'rgba(255, 215, 0, 0.08)';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: 16,
    },
    centerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    errorIcon: {
      fontSize: 48,
    },
    errorTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.textColor,
      textAlign: 'center',
    },
    errorMessage: {
      fontSize: 14,
      color: theme.textColor,
      opacity: 0.5,
      textAlign: 'center',
    },
    title: {
      color: theme.textColor,
      fontSize: 22,
      fontWeight: '800',
      marginVertical: 20,
      letterSpacing: 0.5,
    },
    board: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 14,
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    },
    headerText: {
      color: theme.textColor,
      opacity: 0.5,
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    headerPoints: {
      flex: 1,
      textAlign: 'right',
    },
    userRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 13,
      paddingHorizontal: 14,
    },
    rowOdd: {
      backgroundColor: rowOddBg,
    },
    rowEven: {
      backgroundColor: rowEvenBg,
    },
    rowTop3: {
      backgroundColor: top3Accent,
    },
    // Current user row
    rowCurrentUser: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderLeftWidth: 3,
      borderLeftColor: theme.textColor,
      paddingLeft: 11, // 14 - 3 to compensate border
    },
    currentUserAccent: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      backgroundColor: theme.textColor,
      opacity: 0.8,
    },
    rankText: {
      fontSize: 14,
      color: theme.textColor,
      opacity: 0.6,
      fontWeight: '600',
    },
    currentUserRank: {
      opacity: 1,
      fontWeight: '800',
    },
    userName: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.textColor,
    },
    currentUserName: {
      fontWeight: '800',
      opacity: 1,
    },
    userPoints: {
      flex: 1,
      fontSize: 15,
      fontWeight: '700',
      color: theme.textColor,
      textAlign: 'right',
      opacity: 0.9,
    },
    currentUserPoints: {
      fontWeight: '800',
      opacity: 1,
    },
    // My score card
    myScoreCard: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      overflow: 'hidden',
    },
    myScoreLeft: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 18,
      gap: 6,
    },
    myScoreDivider: {
      width: 1,
      marginVertical: 14,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    myScoreRight: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 18,
      gap: 6,
    },
    myScoreLabel: {
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: theme.textColor,
      opacity: 0.45,
    },
    myScoreRank: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.textColor,
    },
    myScorePoints: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.textColor,
    },
  });
}