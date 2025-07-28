import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const app = () => {
  const [userid, setUserID] = useState('');
  const [username, setUsername] = useState('User');
  const linkSession = async () => {
    fetch('https://thesession.org/members/'+userid+'/tunebook?format=json') // thesession.org json api request
        .then(response => response.json())
        .then(async json => {
            setUsername(json["member"]["name"]);
            await AsyncStorage.removeItem('username'); // delete the old username
            await AsyncStorage.setItem('username', json["member"]["name"]); // add the new one
        });
  }
  const retrieveUserName = async () => {
    try {
        const value = await AsyncStorage.getItem('username'); // check if username is already stored
        if (value !== null) {
          setUsername(value);
        }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    retrieveUserName();
  }, []);
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Tunelists - {username}</Text>
      </View>
      <TextInput
        placeholder={"Enter TheSession UserID"}
        onChangeText={newUserID=>setUserID(newUserID)}
        placeholderTextColor="white"
      />
      <Button title="Link TheSession.org"
      onPress={linkSession}
      color="#c9a66b"
      />
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
        fontSize: 25,
        fontWeight: "bold",
    },
    titleContainer: {
        height: "30%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
    }
})