import { Stack } from 'expo-router';
import { useTeamConfig } from '../src/hooks/useTeamConfig';

export default function Layout() {
  const config = useTeamConfig()

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
