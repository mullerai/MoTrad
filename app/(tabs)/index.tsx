import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const app = () => {
  const [username, setUsername] = useState('User');
  const [greeting, setGreeting] = useState('');
  const getUserDetails = async () => {
    try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setUsername(value);
          setGreeting("Hey, "+value+"! \n\n");
        }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>MoTrad</Text>
    </View>
    <View style={styles.contentContainer}>
    <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>{greeting}MoTrad is your personal companion for exploring and cataloguing Irish Traditional Music. {"\n\n"}

Record your sessions, track the tunes you know (and want to learn), and keep notes on your journey through the tradition.{"\n\n"}

Whether you're just starting out or deep into the session scene, MoTrad is here to help make trad music more accessible, memorable, and meaningful.{"\n\n"}
        </Text>
        <Text style={styles.creditsText}>Developed by Aidan Muller.</Text>
    </View>
    </View>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#72523A",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    titleText: {
        color: "white",
        textAlign: "center",
        fontSize: 42,
        fontWeight: "bold",
    },
    titleContainer: {
        height: "40%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    aboutContainer: {
        display: "flex",
        height: "80%",
        width: "80%",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    aboutText: {
        color: "white",
        fontSize: 15,
    },
    creditsText: {
        color: "white",
        fontSize: 15,
        fontStyle: "italic",
    }
})