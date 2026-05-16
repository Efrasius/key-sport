import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';


export default function TabLayout() {
    const config = useTeamConfig()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: config.theme.tabIconSelectedColor,
                tabBarInactiveTintColor: config.theme.tabIconDefaultColor,
                tabBarStyle: {
                    backgroundColor: config.theme.headerBackgroundColor,
                    borderTopColor: 'rgba(255, 255, 255, 0.2)',
                    borderTopWidth: 1,
                },
                headerStyle: {
                    backgroundColor: config.theme.headerBackgroundColor,
                },
                headerTintColor: config.theme.textColor,
                headerLeft: () => <Image source={config.theme.logoSquare} style={{width: 30, height: 30, marginHorizontal: 15}} />
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />

            <Tabs.Screen
                name="matchs"
                options={{
                    title: 'Matchs',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="list-alt" color={color} />,
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Leaderboard',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="trophy" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}
