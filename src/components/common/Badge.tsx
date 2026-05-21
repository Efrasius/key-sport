import { View, Text, StyleSheet } from "react-native";

export default function Puce({ color, text }: { color: string, text: string }) {

    return (
        <View style={styles.puce}>
            <Text style={{color: color}}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    puce: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'flex-start',
    },
})