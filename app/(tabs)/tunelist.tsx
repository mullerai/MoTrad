import Tune from "@/components/Tune";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const app = () => {
    var [tunelistJSON, setTunelistJSON] = useState<any[]>([]);
    const retrieveTuneLists = async () => {
        try {
            const value = await AsyncStorage.getItem('tunelist'); // check if username is already stored
            if (value !== null) {
                setTunelistJSON(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
      }
      useEffect(() => {
        retrieveTuneLists();
      }, []);
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>
                Tunelist
            </Text>
        </View>
        <View style={styles.scrollViewStyle}>
        <ScrollView style={{width: "80%"}}>
        {
            tunelistJSON.map((tune: any, key) => (
                //<Text key={key}>{tune.name}</Text>
                <Tune key={key} title={tune.name} id={tune.id} type={tune.type} instrument="banjo"></Tune>
            ))
        }
        </ScrollView>
        </View>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
    header: {
        height: "30%",
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#72523A",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    headerText: {
        color: "white",
        textAlign: "center",
        fontSize: 42,
        fontWeight: "bold",
    },
    scrollViewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
    }
});