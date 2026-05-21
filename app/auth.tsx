import { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TextInput, View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { TeamConfig } from "../src/config/general.config";
import { useTeamConfig } from "../src/hooks/useTeamConfig";
import { useRouter } from 'expo-router';
import { signIn } from "../src/api/auth";

export default function Auth() {
    const config = useTeamConfig()
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const styles = makeStyles(config.theme)
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)

    async function handleSignIn() {
        setError(null)
        setLoading(true)
        try {
            await signIn(login, password)
        } catch (e: any) {
            if (e.code === 'auth/invalid-email') {
                setError("Adresse email invalide.")
            } else if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
                setError("Email ou mot de passe incorrect.")
            } else if (e.code === 'auth/user-not-found') {
                setError("Aucun compte associé à cet email.")
            } else if (e.code === 'auth/too-many-requests') {
                setError("Trop de tentatives. Réessayez plus tard.")
            } else {
                setError("Une erreur est survenue. Veuillez réessayer.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={login}
                    onChangeText={setLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    returnKeyType="next"
                    placeholder="exemple@mail.com"
                    placeholderTextColor="#aaa"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.passwordWrapper}>
                    <TextInput
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        textContentType="password"
                        autoComplete="password"
                        returnKeyType="done"
                        onSubmitEditing={handleSignIn}
                        placeholder="••••••••"
                        placeholderTextColor="#aaa"
                    />
                    <Pressable onPress={() => setShowPassword(v => !v)} style={styles.eyeButton}>
                        <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={16} color="#888" />
                    </Pressable>
                </View>
            </View>

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            <Pressable
                onPress={handleSignIn}
                disabled={loading}
                style={({ pressed }) => [
                    styles.loginButton,
                    {
                        backgroundColor: config.theme.btnColor,
                        opacity: pressed || loading ? 0.8 : 1,
                        transform: [{ scale: pressed ? 0.96 : 1 }],
                    },
                ]}
            >
                {loading
                    ? <ActivityIndicator size="small" color="#fff" style={{ marginRight: 6 }} />
                    : <FontAwesome name="sign-in" size={13} color="#fff" style={{ marginRight: 6 }} />
                }
                <Text style={styles.loginText}>Se connecter</Text>
            </Pressable>

            <Pressable onPress={() => console.log('mdp perdu')}>
                <Text style={styles.text}>Mot de passe perdu</Text>
            </Pressable>

            <Pressable onPress={() => {
                router.dismissAll()
                router.push('/register')
            }
            }>
                <Text style={styles.text}>S'inscrire</Text>
            </Pressable>
        </View>
    )
}

function makeStyles(theme: TeamConfig['theme']) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundColor,
            padding: 15,
        },
        inputContainer: {
            marginTop: 50,
        },
        label: {
            color: theme.textColor,
            marginBottom: 10,
            marginHorizontal: 'auto',
            marginTop: 5,
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
            paddingHorizontal: 10,
        },
        errorText: {
            color: '#e74c3c',
            textAlign: 'center',
            marginTop: 16,
            fontSize: 13,
        },
        loginButton: {
            marginTop: 20,
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
        loginText: {
            color: '#fff',
            fontSize: 13,
            fontWeight: '600',
            letterSpacing: 0.3,
        },
        passwordWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 45,
            borderRadius: 5,
            width: '90%',
            marginHorizontal: 'auto',
        },
        passwordInput: {
            flex: 1,
            height: '100%',
            paddingHorizontal: 10,
        },
        eyeButton: {
            paddingHorizontal: 12,
            height: '100%',
            justifyContent: 'center',
        },
    })
}