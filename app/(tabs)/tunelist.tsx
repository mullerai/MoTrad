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
        <ScrollView>
        {
            tunelistJSON.map((tune: any, key) => (
                <Text key={key}>{tune.name}</Text>
            ))
        }
        </ScrollView>
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
    }
});