import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const app = () => {
  const { id } = useLocalSearchParams();
  const [tuneName, setTuneName] = useState("");
  const [tuneType, setTuneType] = useState("");
  const [tuneABC, setTuneABC] = useState("");
  const [tuneKey, setTuneKey] = useState("");
  const [duplicateDisplay, setDuplicateDisplay] = useState<boolean>(false);
  const [onLearnList, setLearnListState] = useState(false);
  const [onTuneList, setTuneListState] = useState(false);
  const [onCustomTuneList, setCustomTuneListState] = useState(false);

  const addToTuneList = async () => {
    setDuplicateDisplay(false);
    var value = await AsyncStorage.getItem('customTunelist');
    var value2 = await AsyncStorage.getItem('tunelist');

    if (value != null) {
      var temp = JSON.parse(value);
      var match = false;
      temp.forEach((tune: any) => {
        if (tune["id"]==id) {
          match = true;
        }
      })
      if (value2 != null) { // check that it is not in the tunelist from thesession
        var temp2 = JSON.parse(value2);
        temp2.forEach((tune: any) => {
          if (tune["id"]==id) {
            match = true;
          }
        })
      }
      if (!match) {
        temp.push({
          id: id,
          name: tuneName,
          type: tuneType,
        });
      } else {
        setDuplicateDisplay(true);
      }
      await AsyncStorage.setItem('customTunelist', JSON.stringify(temp));
      setTuneListState(true);
      setCustomTuneListState(true);
    } else {
      var temp: any = [{
        id: id,
        name: tuneName,
        type: tuneType,
      }]
      await AsyncStorage.setItem('customTunelist', JSON.stringify(temp));
      setTuneListState(true);
      setCustomTuneListState(true);
    }
  }

  const addToLearnList = async () => {
    setDuplicateDisplay(false);
    var value = await AsyncStorage.getItem('learnlist');
    if (value != null) {
      var temp = JSON.parse(value);
      var match = false;
      temp.forEach((tune: any) => {
        if (tune["id"]==id) {
          match = true;
        }
      })
      if (!match) {
        temp.push({
          id: id,
          name: tuneName,
          type: tuneType,
        });
      } else {
        setDuplicateDisplay(true);
      }
      await AsyncStorage.setItem('learnlist', JSON.stringify(temp));
      setLearnListState(true);
    } else {
      var temp: any = [{
        id: id,
        name: tuneName,
        type: tuneType,
      }]
      await AsyncStorage.setItem('learnlist', JSON.stringify(temp));
      setLearnListState(false);
    }
  }

  const removeFromLearnList = async () => {
    var value = await AsyncStorage.getItem('learnlist');
    if (value != null) {
      var temp = JSON.parse(value);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]["id"] == id) {
          temp.splice(i, 1);
        } 
      }
      await AsyncStorage.setItem('learnlist', JSON.stringify(temp));
      setLearnListState(false);
    }
  }

  const removeFromTuneList = async () => {
    var value = await AsyncStorage.getItem('customTunelist');
    if (value != null) {
      var temp = JSON.parse(value);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]["id"] == id) {
          temp.splice(i, 1);
        } 
      }
      await AsyncStorage.setItem('customTunelist', JSON.stringify(temp));
      setCustomTuneListState(false);
      setTuneListState(false);
    }
  }

  const getTuneInfo = async () => {
    const response = await fetch("https://thesession.org/tunes/"+id+"?format=json");
    const json = await response.json();
    if(!json["error"]) {
      setTuneName(json["name"]);
      setTuneType(json["type"]);
      //setTuneABC(json["settings"][0]["abc"]);
      setTuneKey(json["settings"][0]["key"]);
      setTuneABC(json["settings"][0]["abc"].replaceAll('!', "\n"));
    } else {
      console.log(json)
    }
  }

  const getListInfo = async () => {
    var value: any = await AsyncStorage.getItem('learnlist');
    if (value != null) {
      value = JSON.parse(value);
      value.forEach((tune: any) => {
        if (tune["id"]==id) {
          setLearnListState(true);
        }
      });
    }

    value = await AsyncStorage.getItem('tunelist');
    if (value != null) {
      value = JSON.parse(value);
      value.forEach((tune: any) => {
        if (tune["id"]==id) {
          setTuneListState(true);
        }
      });
    }

    value = await AsyncStorage.getItem('customTunelist');
    if (value != null) {
      value = JSON.parse(value);
      value.forEach((tune: any) => {
        if (tune["id"]==id) {
          setTuneListState(true);
          setCustomTuneListState(true);
        }
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTuneInfo();
      getListInfo();
    }, [])
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
                          <Text style={styles.headerText}>
                              {tuneName}{"\n"}
                          </Text>
                          <Text style={styles.subHeaderText1}>
                              {tuneType}
                          </Text>
                          <Text style={styles.subHeaderText2}>
                              {tuneKey}
                          </Text>
                          {/*<Button title={buttonMessage}
                              onPress={buttonToggle}
                              color="#c9a66b"
                          />*/}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.abcText}>
            {tuneABC}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          { onTuneList==false ? <Button title="Add to tunelist"
                          onPress={addToTuneList}
                          color="#c9a66b"
                      /> : ( onCustomTuneList ?
                      <Button title="Remove from tunelist"
                          onPress={removeFromTuneList}
                          color="#c9a66b"/> : <View></View>
                      )
          }
          { onLearnList==false ? <Button title="Add to learnlist"
                          onPress={addToLearnList}
                          color="#c9a66b"
                      /> : <Button title="Remove from learnlist"
                      onPress={removeFromLearnList}
                      color="#c9a66b"
                      />

          }
           <Text style={{color: "red", display: duplicateDisplay ? 'flex' : 'none'}}>
                {"\n\n"}Tune is already in list
                </Text>
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
  contentContainer: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "30%"
  },
  abcText: {
    color: "white",
    fontSize: 15
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:"center"   
  }
});