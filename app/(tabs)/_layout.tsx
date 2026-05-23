import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { Tabs } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../../src/stores/authStore';
import { getDoc, doc } from 'firebase/firestore';
import { UserData } from '../../src/types/userData';
import { db } from '../../src/config/firebase';


export default function TabLayout() {
    const config = useTeamConfig();
    const router = useRouter();
    const authStore = useAuthStore();
    const [initializing, setInitializing] = useState<boolean>(true)


    const handleAuthStateChanged = useCallback(async (user: User | null) => {
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid))
            const userData = { id: userDoc.id, ...userDoc.data() } as UserData

            authStore.signIn(user, userData)
        } else {
            authStore.signOut()
        }
        if (initializing) setInitializing(false)
    }, [initializing])

    useEffect(() => {
        const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
        return subscriber;
    }, []);


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
                headerLeft: () => (
                    <Image
                        source={config.theme.logoSquare}
                        style={{ width: 30, height: 30, marginHorizontal: 15 }}
                    />
                ),
                headerRight: () => (
                    <>
                        {!authStore.isAuthenticated ?
                            <Pressable
                                onPress={() => router.push('/auth')}
                                style={({ pressed }) => [
                                    styles.loginButton,
                                    {
                                        backgroundColor: config.theme.btnColor,
                                        opacity: pressed ? 0.8 : 1,
                                        transform: [{ scale: pressed ? 0.96 : 1 }],
                                    },
                                ]}
                            >

                                <FontAwesome name="sign-in" size={13} color="#fff" style={{ marginRight: 6 }} />
                                <Text style={styles.loginText}>Se connecter</Text>


                            </Pressable> :
                            <Text style={{ color: config.theme.textColor, marginRight: 15 }}>
                                {authStore.userName}
                            </Text>
                        }
                    </>
                ),
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
        </Tabs >
    );
}

const styles = StyleSheet.create({
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    loginText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});