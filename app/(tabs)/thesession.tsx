import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const app = () => {
  const [userid, setUserID] = useState('');
  const [username, setUsername] = useState('User');
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorResponseDisplay, setErrorResponseDisplay] = useState(false);
  const [successDisplay, setSuccessDisplay] = useState(false);
  const [message, setMessage] = useState('No TheSession account linked.')
  const linkSession = async () => {
    var empty = false;
    var page = 0;
    const tunelist: { id: any; name: any; type: any; }[] = []; // tunelist array
    while (!empty) {
      const response = await fetch('https://thesession.org/members/'+userid+'/tunebook?format=json&page='+page); // thesession.org json api request
      const json = await response.json();
      if(!json["error"]) {
        if (json["tunes"].length>0) {
          setErrorDisplay(false);
          setUsername(json["member"]["name"]);
          await AsyncStorage.removeItem('username'); // delete the old username
          await AsyncStorage.setItem('username', json["member"]["name"]); // add the new one
          setMessage(json["member"]["name"]);

          await AsyncStorage.removeItem('userid');
          await AsyncStorage.setItem('userid', userid);

          json["tunes"].forEach((d: any) => { // add each tune from users thesession.org profile to their tunelist
            const newJson = {
              id: d["id"],
              name: d["name"],
              type: d["type"],
              instrument: "",
            };
            tunelist.push(newJson);
          });
        } else {
          empty = true;
        }
      } else {
        setErrorDisplay(true);
      }
        page += 1;
    }
    AsyncStorage.setItem('tunelist', JSON.stringify(tunelist)).catch(error => {
      console.log(error)
      setErrorResponseDisplay(true);
    });
    setSuccessDisplay(true);
  }
  const retrieveUserName = async () => {
    try {
        const value = await AsyncStorage.getItem('username'); // check if username is already stored
        if (value !== null) {
          setUsername(value);
          setMessage(value);
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
      <Text style={styles.titleText}>{message}</Text>
      </View>
      <TextInput
        placeholder={"Enter TheSession UserID"}
        onChangeText={newUserID=>setUserID(newUserID)}
        placeholderTextColor="white"
        cursorColor="white"
        selectionColor="white"
        style={styles.textInput}
      />
      <Button title="Link TheSession.org"
      onPress={linkSession}
      color="#c9a66b"
      />
      <Text style={{color: "red", display: errorDisplay ? 'flex' : 'none'}}>
      {"\n\n"}Please input a valid UserID
      </Text>
      <Text style={{color: "red", display: errorResponseDisplay ? 'flex' : 'none'}}>
      {"\n\n"}Something went wrong, please try again
      </Text>
      <Text style={{color: "green", display: successDisplay ? 'flex' : 'none'}}>
        {"\n\n"}You are now linked with your thesession.org account!
      </Text>
      <View style={styles.contentContainer}>
      <Text style={styles.contentText}>{"\n\n"}To link your TheSession.org account with our website, you will need your TheSession UserID. 
        This can be found in the url of your TheSession account page. It will be in the form https://www.thesession.org/members/[UserID].
      </Text>
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
        fontSize: 25,
        fontWeight: "bold",
    },
    titleContainer: {
        height: "30%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
    },
    contentText: {
        color: "white",
        fontSize: 15,
    },
    contentContainer: {
        width: "80%",
    },
    textInput: {
        color: "white",
    }
})