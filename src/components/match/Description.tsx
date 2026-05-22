import { View, Text, StyleSheet, Image } from "react-native"
import { TeamConfig } from "../../config/general.config";
import { useTeamConfig } from '../../hooks/useTeamConfig'
import { useTranslation } from "../../hooks/useTranslation";
import { Match } from "../../types/match";
import { getTimeUntil } from "../../utils/getTimeUntil";
import { getColor } from "../../utils/getColor";
import Badge from "../common/Badge"

export default function Description({match}: {match : Match}) {
    const config = useTeamConfig()
    const t = useTranslation()
    const styles = makeStyles(config.theme)


    let firstBadge = ''
    if (match?.status === 'upcoming') {
        firstBadge = getTimeUntil(match?.date, t.match?.timeUntil)
    } else if (match?.status) {
        firstBadge = match?.status
    }


    return (
        <View style={styles.container}>
            <View style={styles.badgeContainer}>
                <Badge
                    color={getColor(match?.status, config.theme)}
                    text={firstBadge}
                />
                <Badge
                    color={config.theme.textColor}
                    text={match?.game || ''}
                />
            </View>
            <Text style={styles.tournament}>
                {match?.tournament}
            </Text>
            <View style={styles.teamsContainer}>
                <View style={styles.teamContainer}>
                    <Image source={config.theme.logoSquare} style={styles.logo} />
                    <Text style={styles.teamName}>{match?.teams[0]}</Text>
                </View>
                <Text style={styles.vs}>VS</Text>
                <View style={styles.teamContainer}>
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>
                            {match?.teams[1]?.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.teamName}>{match?.teams[1]}</Text>
                </View>
            </View>
            <Text style={styles.date}>
                {match?.date.toDate().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}{' '}
                {match?.date.toDate().toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </View>
    )
}

function makeStyles(theme: TeamConfig['theme']) {
    return StyleSheet.create({
        container: {
            width: '95%',
            padding: 15,
            borderRadius: 15,
            marginTop: 10,
            marginHorizontal: 'auto',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)'
        },
        badgeContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 30,
        },
        tournament: {
            marginHorizontal: 'auto',
            color: 'rgba(255, 255, 255, 0.5)',
            marginVertical: 10,
        },
        teamsContainer: {
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        teamContainer: {
            alignItems: 'center',
            width: '40%',
        },
        vs: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 20,
        },
        logo: {
            width: 30,
            height: 30,
            marginBottom: 5,
        },
        teamName: {
            color: theme.textColor,
        },
        imagePlaceholder: {
            width: 30,
            height: 30,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'white',
            borderWidth: 1,
            marginBottom: 5,
        },
        imagePlaceholderText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 28,
            textAlign: 'center',
        },
        date: {
            color: 'rgba(255, 255, 255, 0.5)',
            marginTop: 15,
        },
    })
}