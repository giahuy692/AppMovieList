import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from 'react-native';
const PlaceholderImage = require("./assets/images/background-image.png");
import ImageViewer from './compenents/ImageView';
import ListMovie from "./Pages/ListMovie";

export default function App() {
  return (
    <View style={styles.container}>
        <ListMovie></ListMovie>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
