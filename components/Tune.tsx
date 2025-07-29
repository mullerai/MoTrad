import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface Props {
    title: string;
    id: string;
    type: string;
    instrument?: string;
}

const Tune: React.FC<Props> = ({title, id, type, instrument=''}) => {
    return (
        <TouchableOpacity style={styles.TuneContainer}>
            <View style={styles.infoContainerLeft}>
            <Text style={styles.text}>{title}</Text>
            </View>
            <View style={styles.infoContainerMiddle}>
            <Text style={styles.instrument}>{instrument}</Text>
            </View>
            <View style={styles.infoContainerRight}>
            <Text style={styles.type}>{type}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    TuneContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        marginTop: "2%"
    },
    text: {
        color: "white",
    },
    type: {
        color: "#829a84"
    },
    instrument: {
        color: "#bfa3a3"
    },
    infoContainerLeft: {
        display: "flex",
        width: "50%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "1%"
    },
    infoContainerMiddle: {
        display: "flex",
        width: "25%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    infoContainerRight: {
        display: "flex",
        width: "25%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "1%"
    }
});

export default Tune;