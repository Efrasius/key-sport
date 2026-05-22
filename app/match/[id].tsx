import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { TeamConfig } from '../../src/config/general.config';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { Match } from '../../src/types/match'
import { getMatch } from '../../src/api/matches';
import Description from '../../src/components/match/Description';
import Prediction from '../../src/components/match/Prediction';

export default function Tab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const config = useTeamConfig()
  const styles = makeStyles(config.theme)

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['match', id],
    queryFn: () => getMatch(id)
  })


  return (
    <View>
      <Stack.Screen
        options={{
          title: "Informations du match",
          headerTintColor: config.theme.textColor,
        }}
      />
      {isPending && <View style={styles.errorContainer}><ActivityIndicator /></View>}
      {isError &&
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Match introuvable</Text>
          <Text style={styles.errorMessage}>
            Impossible de retrouver le match demandé.
          </Text>
        </View>
      }
      {(!isPending && !isError && data) &&
        <ScrollView style={styles.container}>
          <Description match={data} />
          <Prediction match={data} />
        </ScrollView>
      }
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
