import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SearchMovie } from '../apis/api';
export default function ListMovie() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const Item = ({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('MovieDetail')}>
        <Image style={styles.img} source={{ uri: item.img }} />
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>{item.title}</Text>
        <Text style={styles.navigate}>〉</Text>
        </TouchableOpacity>
    );
    useEffect(() => {
        handleSelectMovie()
    }, []);
    
    const handleSelectMovie = () => {
        setLoading(true);
        SearchMovie('batman',1).then(res => {
        if(res !== null || res !== undefined){
            setData(res["Search"]) 
            setLoading(false);
            console.log(res["Search"]);
        }
        }).catch(e => console.log(e))
    };
  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" style={styles.loading} />}
      <View aria-disabled={!loading}>
        <Text style={styles.header}>Movie Explorer</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={data}
          renderItem={(item) => Item(item)} 
          keyExtractor={item => item.imdbID}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
      },
      flatList:{
        flex:1,
      },
      item: {
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems: 'center',
        overflow:'hidden',
        columnGap: 15,
        justifyContent:'space-between'
      },
      title: {
        fontSize: 20,
        width:'100%',
        flex:1,
        color:'black'
      },
      navigate:{
        fontSize: 20,
        color:'black',
        fontWeight:'700'
      },
      img:{
        width:100,
        height:100
      },
      header: {
        backgroundColor: 'red',
        height:80,
        width:"100%",
        textAlign: 'center',
        color: '#fff',
        lineHeight:80,
        fontSize:20,
        fontWeight:'700'
      }, 
      loading:{
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        zIndex:99999
      },
});
