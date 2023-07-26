import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { SearchMovie } from "../apis/api";
const { width, height } = Dimensions.get("screen");

const ItemComp = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshControl, setRefreshControl] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (keywork, page) => {
    try {
      let res = await axios.get(
        `https://www.omdbapi.com/?s=${keywork}&pagesize=${page}&apikey=23613bd5`
      );
      const newData = res.data["Search"];
      setData(data.concat(newData));
      setIsLoadingMore(false)
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm xử lý khi kéo xuống để refresh
  const onRefresh = async () => {
    setRefreshControl(true)
    setPage(1);
    let res = await axios.get(
      `https://www.omdbapi.com/?s=batman&pagesize=${page}&apikey=23613bd5`
    );
    setData(res.data["Search"])
    setIsRefreshing(false);
    setRefreshControl(false);
  };

  // Hàm xử lý khi kéo xuống cuối cùng để load thêm dữ liệu
  const onLoadMore = async () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setIsLoadingMore(true)
    fetchData("batman", page);
  }, [page]);

  renderFooter = () => {
    return (
      isLoadingMore ? 
      <View styles={styles.loader}>
        <ActivityIndicator size="large" />
      </View> : null
    );
  };

  return (
      <View>
        {isLoadingMore && <ActivityIndicator size="large" style={styles.loader} color={['red']}/>}
        <FlatList
          data={data}
          horizontal={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("Movie Detail", {
                  imdbID: item.imdbID,
                })
              }
            >
              <View style={styles.img}>
                <Image
                  source={{ uri: item["Poster"] }}
                  style={{
                    width: (width * 22) / 100,
                    height: (height * 16) / 100,
                  }}
                />
              </View>
              <View style={styles.title}>
                <Text>{item["Title"]}</Text>
                <View style={styles.subTitle}>
                  <Text style={styles.sub}>Year: <Text style={styles.subColor}>{item["Year"]}</Text></Text>
                  <Text style={styles.sub}>Type: <Text style={styles.subColor}>{item["Type"]}</Text></Text>
                </View>
              </View>
              <View style={styles.icon}>
                <AntDesign name="right" size={20} color="black" />
              </View>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshControl} onRefresh={onRefresh} color={['red']}
            />
          }
          keyExtractor={(item, index) => item['imdbID'] + index}
          ListFooterComponent={renderFooter}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0}
        />
      </View>
  );
};

export default ItemComp;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: (height * 18) / 100,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    elevation: 5,
    backgroundColor: "white",
    marginBottom: 10,
  },
  img: {
    width: (width * 25) / 100,
    height: (height * 18) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: (width * 65) / 100,
    height: (height * 18) / 100,
    paddingLeft: 10,
    paddingVertical: 20,
  },
  icon: {
    width: (width * 10) / 100,
    height: (height * 18) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    zIndex:99999,    
    color:'red',

  },
  containerFlat:{
  },
  subTitle:{
    marginTop:10,
    flexDirection: "row",
    columnGap:10,
    paddingVertical: 20,
  },
  sub:{
    color: 'gray',
  },
  subColor:{
    fontWeight: "bold",
  }
});
