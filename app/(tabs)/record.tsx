import Tune from '@/components/Tune';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const app = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const [audioURI, setAudioURI] = useState('');
  const [saveDisplay, setSaveDisplay] = useState(false);

  const [potentialSetName, setPotentialSetName] = useState('');
  const [location, setLocation] = useState('');
  const [tuneType, setTuneType] = useState('');
  const [recordings, setRecordings] = useState<any[]>([]);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
    if (audioRecorder.uri != null) setAudioURI(audioRecorder.uri);
    setSaveDisplay(true);
  };

  const viewRecording = (name: any, setName: any, location: any, tuneType: any) => {
          router.push({
            pathname: '/viewRecord',
            params: {
              filename: name,
              name: setName,
              location: location,
              type: tuneType
            },
          });
      }

  const saveAudio = async () => {
    const filename = Date.now()+'.m4a';
    // code to move file from cache to permanent
    await FileSystem.moveAsync({
      from: audioURI,
      to: FileSystem.documentDirectory+filename
    });

    // save metadata here
    const data = {
      filename: filename,
      name: potentialSetName,
      location: location,
      type: tuneType,
    };

    try {
      var value: any = await AsyncStorage.getItem('recordings');
      if (value != null) {
        value = JSON.parse(value);
        value.push(data);
      } else {
        value = [data];
      }
      setRecordings(value);
      value = JSON.stringify(value);
      await AsyncStorage.setItem('recordings', value);
      setSaveDisplay(false);
    } catch(error) {
      console.log(error);
    }
  }

  const retrieveRecordings = async () => {
    try {
        var value: any = await AsyncStorage.getItem('recordings');
        if (value !== null) {
            value = JSON.parse(value);
            setRecordings(value);
        }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        console.log("denied");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
    retrieveRecordings();
  }, []);

  if (!saveDisplay) {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>
                  Recordings
              </Text>
          </View>
          <Button
          title={recorderState.isRecording ? 'Stop Recording' : 'Start Recording'}
          onPress={recorderState.isRecording ? stopRecording : record}
          color="#c9a66b"
        />
        <View style={styles.scrollViewStyle}>
        <ScrollView style={{width: "80%", marginBottom: "5%"}}>
        {
            recordings.map((tune: any, key) => (
                //<Text key={key}>{tune.name}</Text>
                <Tune key={key} title={tune.name} id='0' type={tune.type} instrument={tune.location} onPress={()=>viewRecording(tune.filename, tune.name, tune.location, tune.type)}></Tune>
            ))
        }
        </ScrollView>
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
              <Text style={styles.headerText}>
                  Recording Metadata
              </Text>
          </View>
        <TextInput
                placeholder={"Tune Name(s)"}
                onChangeText={setName=>setPotentialSetName(setName)}
                placeholderTextColor="white"
                cursorColor="white"
                selectionColor="white"
                style={styles.textInput}
              />
        <TextInput
                placeholder={"Tune Type"}
                onChangeText={setName=>setTuneType(setName)}
                placeholderTextColor="white"
                cursorColor="white"
                selectionColor="white"
                style={styles.textInput}
              />
        <TextInput
                placeholder={"Location"}
                onChangeText={setName=>setLocation(setName)}
                placeholderTextColor="white"
                cursorColor="white"
                selectionColor="white"
                style={styles.textInput}
              />
        <Button
          title="Save"
          onPress={saveAudio}
          color="#c9a66b"
        />
        <Button
          title="Delete"
          //onPress={deleteAudio}
          color="#c9a66b"
        />
      </View>
    )
  }
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
    textInput: {
      color: "white",
    },
    scrollViewStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "center",
    },
});