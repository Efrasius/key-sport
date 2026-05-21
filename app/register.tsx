import { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TextInput, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { TeamConfig } from "../src/config/general.config";
import { useTeamConfig } from "../src/hooks/useTeamConfig";
import { signUp } from "../src/api/auth";
import { useAuthStore } from "../src/stores/authStore";
import { router } from "expo-router";

export default function Register() {
    const config = useTeamConfig()
    const styles = makeStyles(config.theme)
    const authStore = useAuthStore((s) => s)
    const [error, setError] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    async function handleSignUp() {
        try {
            if (password !== confirmPassword) {
                setError(true)
                return;
            }
            const user = await signUp(email, password, username)

            authStore.signIn(user.user, username)
            setError(false)

            router.dismissAll()
            router.replace('/(tabs)')
        }
        catch (error) {
            setError(true)
        }


    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Nom d'utilisateur</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Adresse e-mail</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Confirmer le mot de passe</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>
            <Pressable
                onPress={() => handleSignUp()}
                style={({ pressed }) => [
                    styles.registerButton,
                    {
                        backgroundColor: config.theme.btnColor,
                        opacity: pressed ? 0.8 : 1,
                        transform: [{ scale: pressed ? 0.96 : 1 }],
                    },
                ]}
            >
                <FontAwesome name="user-plus" size={13} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.registerText}>Créer un compte</Text>
            </Pressable>

            {error && (
                <Text style={styles.errorText}>
                    Une erreur est survenue. Veuillez vérifier vos informations et réessayer.
                </Text>
            )}
        </ScrollView>
    )
}

function makeStyles(theme: TeamConfig['theme']) {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: theme.backgroundColor,
            padding: 15,
        },
        inputContainer: {
            marginTop: 50,
        },
        text: {
            color: theme.textColor,
            marginBottom: 10,
            marginHorizontal: 'auto',
            marginTop: 5,
        },
        input: {
            backgroundColor: 'white',
            height: 45,
            borderRadius: 5,
            width: '90%',
            marginHorizontal: 'auto',
        },
        registerButton: {
            marginTop: 20,
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
            width: '90%',
            marginHorizontal: 'auto',
        },
        registerText: {
            color: '#fff',
            fontSize: 13,
            fontWeight: '600',
            letterSpacing: 0.3,
        },
        errorText: {
            color: 'red',
            marginTop: 12,
            textAlign: 'center',
            fontSize: 13,
        },
    })
}