import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { TeamConfig } from '../../src/config/general.config';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { mockMatches } from '../../src/mocks/matches';
import { Match } from '../../src/types/match'
import Description from '../../src/components/match/Description';
import Prediction from '../../src/components/match/Prediction';

export default function Tab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const config = useTeamConfig()
  const styles = makeStyles(config.theme)

  const match: Match | undefined = mockMatches.find((mock) => mock.id === id)


  return (
    <View>
      <Stack.Screen
        options={{
          title: "Informations du match",
          headerTintColor: config.theme.textColor,
        }}
      />
      {match ?
        <ScrollView style={styles.container}>
          <Description match={match} />
          <Prediction match={match} />
        </ScrollView>
        :
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Match introuvable</Text>
          <Text style={styles.errorMessage}>
            Impossible de retrouver le match demandé.
          </Text>
        </View>}
    </View>
  );
}

function makeStyles(theme: TeamConfig['theme']) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      padding: 15,
      height: '100%',
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
  })
}
