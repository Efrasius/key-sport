import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';


export default function Tab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Tab [Matchs]</Text>
      <Text onPress={() => router.push('/match/123')}>Go to match 123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
