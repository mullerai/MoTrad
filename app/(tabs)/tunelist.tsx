import React from 'react';
import { StyleSheet, View } from 'react-native';

const app = () => {
  return (
    <View style={styles.container}>

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