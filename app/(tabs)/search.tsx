import Tune from "@/components/Tune";
import { router } from "expo-router";
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const app = () => {
  const [tuneName, setTuneName] = useState("");
  var [results, setResults] = useState<any[]>([]);
  
  const viewTune = (id: any) => {
    router.push({
      pathname: '/viewTune',
      params: {
        id: id
      },
    });
  }

  const searchTune = async () => {
    const response = await fetch("https://thesession.org/tunes/search?q="+tuneName+"&format=json");
    const json = await response.json();
    const tunelist: { id: any; name: any; type: any; }[] = [];
    if(!json["error"]) {
      json["tunes"].forEach((d: any) => { // add each tune from users thesession.org profile to their tunelist
        const newJson = {
          id: d["id"],
          name: d["name"],
          type: d["type"],
        };
        tunelist.push(newJson);
      });
      setResults(tunelist);
    } else {
      console.log(json)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
                  <Text style={styles.headerText}>
                      Search
                  </Text>
                  {/*<Button title={buttonMessage}
                      onPress={buttonToggle}
                      color="#c9a66b"
                  />*/}
      </View>
      <View style={styles.searchContainer}>
        <TextInput
                placeholder={"Enter tune name"}
                onChangeText={newTuneName => setTuneName(newTuneName)}
                placeholderTextColor="white"
                cursorColor="white"
                selectionColor="white"
                style={styles.textInput}
              />
        <Button title="search"
                onPress={() => searchTune()}
                color="#c9a66b"
        />
      </View>
      <View style={styles.scrollViewStyle}>
      <ScrollView style={{width: "80%", marginBottom: "5%"}}>
        {
          results.map((tune: any, key) => (
                //<Text key={key}>{tune.name}</Text>
                <Tune key={key} title={tune.name} id={tune.id} type={tune.type} onPress={()=>viewTune(tune.id)}></Tune>
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
searchContainer: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
    width: "100%"
},
textInput: {
    color: "white",
},
scrollViewStyle: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: "center",
}
});