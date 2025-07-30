import Tune from "@/components/Tune";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

const app = () => {
    var [tunelistJSON, setTunelistJSON] = useState<any[]>([]);
    var [learnlistJSON, setLearnlistJSON] = useState<any[]>([]);
    var [whichDisplay, setDisplay] = useState<boolean>(true);
    const [buttonMessage, setButtonMessage] = useState<string>("View Learnlist");

    const viewTune = (id: any) => {
        router.push({
          pathname: '/viewTune',
          params: {
            id: id
          },
        });
    }

    const retrieveTuneLists = async () => {
        try {
            var value = await AsyncStorage.getItem('tunelist'); // check if username is already stored
            var tuneList = [];
            if (value !== null) {
                tuneList = JSON.parse(value);
                setTunelistJSON(tuneList);
            }

            var value = await AsyncStorage.getItem('customTunelist');
            if (value !== null) {
                var tempArray = [];
                tempArray = tuneList.concat(JSON.parse(value));
                setTunelistJSON(tempArray);
            }

            value = await AsyncStorage.getItem('learnlist');
            if (value !== null) {
                setLearnlistJSON(JSON.parse(value));
            }

        } catch (error) {
            console.log(error);
        }
      }
    useFocusEffect(
        useCallback(() => {
            retrieveTuneLists();
        }, [])
    );
    const buttonToggle = () => {
        if (whichDisplay == true) {
            setDisplay(false);
            setButtonMessage("View Tunelist");
        } else {
            setDisplay(true);
            setButtonMessage("View Learnlist");
        }
    }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>
                Tunelists
            </Text>
            <Button title={buttonMessage}
                onPress={buttonToggle}
                color="#c9a66b"
            />
        </View>
        <View style={styles.scrollViewStyle}>
        <ScrollView style={{width: "80%", marginBottom: "5%"}}>
        {
            whichDisplay ? tunelistJSON.map((tune: any, key) => (
                //<Text key={key}>{tune.name}</Text>
                <Tune key={key} title={tune.name} id={tune.id} type={tune.type} instrument="banjo" onPress={()=>viewTune(tune.id)}></Tune>
            )) : learnlistJSON.map((tune: any, key) => (
                //<Text key={key}>{tune.name}</Text>
                <Tune key={key} title={tune.name} id={tune.id} type={tune.type} instrument="banjo" onPress={()=>viewTune(tune.id)}></Tune>
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