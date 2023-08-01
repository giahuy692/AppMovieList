import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import ItemComp from './ItemComp'

const { width, height } = Dimensions.get('screen');

const MovieDisplay = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headers}>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          Movie Explorer
        </Text>
      </View>
        <View style={styles.flatList}>
          <ItemComp />
        </View>
    </SafeAreaView>
  )
}

export default MovieDisplay

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"lightgray"
  },
  flatList:{
    flex:1,
  },
  headers: {
    width: width,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F35120",
    flexDirection: "row",
  },
});