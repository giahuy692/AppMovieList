import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList } from 'react-native'
import React from 'react'
import ItemComp from './ItemComp'

const { width, height } = Dimensions.get('screen');

const MovieDisplay = () => {
  return (
    <View>
      <View>
        <View style={{width: width, height: height *10/100, backgroundColor: '#F35120', justifyContent: 'flex-end', alignItems:'center', padding: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Movie Explorer</Text>
        </View>
      </View>
      <ScrollView>
        <ItemComp />
      </ScrollView>
    </View>
  )
}

export default MovieDisplay

const styles = StyleSheet.create({});