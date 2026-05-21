import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react"
import { useTeamConfig } from '../../hooks/useTeamConfig'
import { TeamConfig } from "../../config/general.config";
import { Match } from "../../types/match";

export default function Prediction({ match }: { match: Match }) {
    const config = useTeamConfig()
    const styles = makeStyles(config.theme)
    const [selected, setSelected] = useState<0 | 1 | null>(null)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TA PRÉDICTION</Text>
            <View style={styles.predictionContainer}>
                <TouchableOpacity
                    style={[styles.prediction, selected === 0 && { backgroundColor: config.theme.btnColor ?? config.theme.iconColor }]}
                    onPress={() => setSelected(0)}
                >
                    <Text style={styles.bold}>{match.teams[0]} gagne</Text>
                    <Text style={styles.percentage}>{78}% des fans</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.prediction, selected === 1 && { backgroundColor: config.theme.btnColor ?? config.theme.iconColor }]}
                    onPress={() => setSelected(1)}
                >
                    <Text style={styles.bold}>{match.teams[1]} gagne</Text>
                    <Text style={styles.percentage}>{22}% des fans</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${78}%` }]} />
            </View>
            <View style={styles.barLabels}>
                <Text style={styles.barLabelLeft}>{match.teams[0]} {78}%</Text>
                <Text style={styles.barLabelRight}>{match.teams[1]} {22}%</Text>
            </View>

            <TouchableOpacity
                style={[styles.confirmButton, selected === null && styles.confirmButtonDisabled]}
                onPress={() => { if (selected !== null) console.log('Prediction confirmed:', selected) }}
                disabled={selected === null}
            >
                <Text style={styles.confirmText}>Confirmer ma prédiction</Text>
            </TouchableOpacity>
        </View>
    )
}

function makeStyles(theme: TeamConfig['theme']) {
    return StyleSheet.create({
        container: {
            width: '95%',
            marginTop: 45,
        },
        title: {
            color: 'rgba(255, 255, 255, 0.5)',
        },
        predictionContainer: {
            flexDirection: 'row',
            gap: 10,
            marginTop: 20,
        },
        prediction: {
            flex: 1,
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 10,
            padding: 10,
        },
        bold: {
            fontWeight: 'bold',
            color: theme.textColor,
        },
        percentage: {
            color: 'rgba(255, 255, 255, 0.5)',
            marginTop: 4,
        },
        barBackground: {
            height: 12,
            borderRadius: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            overflow: 'hidden',
            marginTop: 20,
        },
        barFill: {
            height: '100%',
            borderRadius: 6,
            backgroundColor: theme.btnColor ?? theme.iconColor,
        },
        barLabels: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 6,
        },
        barLabelLeft: {
            color: theme.textColor,
            fontSize: 12,
        },
        barLabelRight: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 12,
        },
        confirmButton: {
            marginTop: 45,
            backgroundColor: theme.btnColor ?? theme.iconColor,
            borderRadius: 10,
            padding: 14,
            alignItems: 'center',
        },
        confirmButtonDisabled: {
            opacity: 0.3,
        },
        confirmText: {
            color: theme.textColor,
            fontWeight: 'bold',
            fontSize: 15,
        },
    })
}