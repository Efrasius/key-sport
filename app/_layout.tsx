import { Stack } from 'expo-router';
import { useTeamConfig } from '../src/hooks/useTeamConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Layout() {
  const config = useTeamConfig()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: config.theme.headerBackgroundColor,
          }
        }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="register"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
