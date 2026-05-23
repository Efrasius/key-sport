import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { TeamConfig } from '../../src/config/general.config';
import { useState } from 'react';
import { useAuthStore } from '../../src/stores/authStore';
import { disconnect } from '../../src/api/auth';
import Auth from '../auth';
import { router } from 'expo-router';

export default function Profile() {
  const config = useTeamConfig()
  const styles = makeStyles(config.theme)
  const authStore = useAuthStore()
  const [error, setError] = useState<string>('')


  async function handleDisconnect() {
    try {
      await disconnect()
      authStore.signOut()
    } catch (error) {
      setError('Erreur lors de la déconnection, réessayez')
    }
  }

  return (
    <View style={styles.container}>
      {!authStore.isAuthenticated && <Auth />}
      {authStore.isAuthenticated && <>
        <Text style={styles.hi}>
          Bonjour {authStore.userName}
        </Text>
        <Pressable
          onPress={() => router.replace('/predictions')}
        >
          <Text
            style={styles.links}
          >
            Mes prédictions
          </Text>
        </Pressable>
        <Pressable
          onPress={() => console.log('infos')}
        >
          <Text
            style={styles.links}
          >
            Mes infos
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>  console.log('réinitialiser mdp')}
        >
          <Text
            style={styles.links}
          >
            Réinitialiser mon mot de passe
          </Text>
        </Pressable>
        <Pressable
          onPress={handleDisconnect}
          style={({ pressed }) => [
            styles.disconnect,
            {
              backgroundColor: config.theme.btnColor,
              transform: [{ scale: pressed ? 0.96 : 1 }],
            },
          ]}
        >
          <Text>Se déconnecter</Text>
        </Pressable>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </>}
    </View>
  );
}

function makeStyles(theme: TeamConfig['theme']) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      padding: 15,
      height: '100%',
      // alignItems: 'center',
    },
    hi: {
      fontSize: 20,
      textAlign: 'center',
      color: theme.textColor,
      marginBottom: 50,
    },
    links: {
      color: theme.textColor,
      marginTop: 25,
      marginHorizontal: 'auto',
      // textDecorationLine: 'underline',
    },
    disconnect: {
      marginTop: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 3,
      width: '90%',
      marginHorizontal: 'auto',
    },
    errorText: {
      color: '#e74c3c',
      textAlign: 'center',
      marginTop: 16,
      fontSize: 13,
    },
  })
}