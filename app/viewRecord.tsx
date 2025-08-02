import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const app = () => {
  const { filename, name, location, type } = useLocalSearchParams();
  const sound = new Audio.Sound();

  const loadSound = async () => {
    if (FileSystem.documentDirectory!=null) {
        await sound.loadAsync({
            uri: FileSystem.documentDirectory+filename,
        });
    }
  }

  const playSound = async () => {
    await sound.replayAsync();
  }

  useEffect(() => {
    loadSound();
  }, []);

  return (
    <View style={styles.container}>
            <View style={styles.header}>
                              <Text style={styles.headerText}>
                                  {name}{"\n"}
                              </Text>
                              <Text style={styles.subHeaderText1}>
                                  {type}
                              </Text>
                              <Text style={styles.subHeaderText2}>
                                  {location}
                              </Text>
            </View>
            <Button
                title="play"
                onPress={() => {
                    playSound();
                }}
                color="#c9a66b"
            />
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
      fontSize: 30,
      fontWeight: "bold",
  },
  subHeaderText1: {
    color: "#bfa3a3",
    textAlign: "center",
    fontSize: 20,
  },
  subHeaderText2: {
    color: "#829a84",
    textAlign: "center",
    fontSize: 18,
  },
});