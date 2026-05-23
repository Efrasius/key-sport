import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useTeamConfig } from "../../hooks/useTeamConfig"
import { TeamConfig } from "../../config/general.config";
import { getPosition } from "../../api/users";
import { useAuthStore } from "../../stores/authStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";


const MEDALS = ['🥇', '🥈', '🥉'];

export default function MyRank() {
    const config = useTeamConfig()
    const styles = makeStyles(config.theme);
    const authStore = useAuthStore()


    const { isPending, isError, data } = useQuery({
        queryKey: ['leaderBoard', authStore.totalPoints],
        queryFn: () => getPosition(authStore.totalPoints),
        enabled: authStore.isAuthenticated,
    });

    return (
        <>
            {isPending && (
                <View style={styles.centerContainer}>
                    <ActivityIndicator color={config.theme.textColor} size="large" />
                </View>
            )}

            {
                isError && (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorIcon}>⚠️</Text>
                        <Text style={styles.errorTitle}>Impossible de charger le rang</Text>
                        <Text style={styles.errorMessage}>Vérifie ta connexion et réessaie.</Text>
                    </View>
                )
            }
            <View style={styles.myScoreCard}>
                <View style={styles.myScoreLeft}>
                    <Text style={styles.myScoreLabel}>Votre classement</Text>
                    <Text style={styles.myScoreRank}>
                        {data ?
                            data >= 0
                                ? data < 3
                                    ? MEDALS[data]
                                    : `#${data + 1}`
                                : '—'
                            : ''
                        }
                    </Text>
                </View>
                <View style={styles.myScoreDivider} />
                <View style={styles.myScoreRight}>
                    <Text style={styles.myScoreLabel}>Vos points</Text>
                    <Text style={styles.myScorePoints}>{authStore.totalPoints ?? '—'}</Text>
                </View>
            </View>
        </>
    )
}

function makeStyles(theme: TeamConfig['theme']) {
    return StyleSheet.create({
        centerContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
        },
        errorIcon: {
            fontSize: 48,
        },
        errorTitle: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.textColor,
            textAlign: 'center',
        },
        errorMessage: {
            fontSize: 14,
            color: theme.textColor,
            opacity: 0.5,
            textAlign: 'center',
        },
        myScoreCard: {
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 32,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            overflow: 'hidden',
        },
        myScoreLeft: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: 18,
            gap: 6,
        },
        myScoreDivider: {
            width: 1,
            marginVertical: 14,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },
        myScoreRight: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: 18,
            gap: 6,
        },
        myScoreLabel: {
            fontSize: 11,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: theme.textColor,
            opacity: 0.45,
        },
        myScoreRank: {
            fontSize: 28,
            fontWeight: '800',
            color: theme.textColor,
        },
        myScorePoints: {
            fontSize: 28,
            fontWeight: '800',
            color: theme.textColor,
        },
    })
}