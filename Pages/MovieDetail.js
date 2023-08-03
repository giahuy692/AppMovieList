import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const { width, height } = Dimensions.get("screen");

const MovieDetail = ({ route }) => {
  const { imdbID } = route.params;
  const [data, setData] = useState([]);
  const [isLoadingMore, setisLoadingMore] = useState(false);

  const getDataAPI = async () => {
    let res = await axios.get(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=23613bd5`
    );
    setData(res.data);
    setisLoadingMore(false);
  };
  useEffect(() => {
    setisLoadingMore(true);
    getDataAPI();
  }, []);

  const arrActor = [
    { name: "Adam West", img: require("../assets/images/adamWest.jpg") },
    {
      name: "Michael Keaton",
      img: require("../assets/images/michaelkeaton.jpg"),
    },
    { name: "Val Kilmer", img: require("../assets/images/valkilmer.jpg") },
    { name: "Kevin Conroy", img: require("../assets/images/kevinconroy.jpg") },
    {
      name: "Neil Patrick Harris",
      img: require("../assets/images/NeilPatrickHarris.jpg"),
    },
  ];

  const navigate = useNavigation();

  return (
    <>
      {
        <View>
          {isLoadingMore && (
            <ActivityIndicator
              size="large"
              style={styles.loading}
              color={["red"]}
            />
          )}
          <View style={{ position: "relative" }}>
            <View style={{ alignItems:"center" }}>
              <View
                style={{
                  flexDirection: "row",
                  width: width,
                  height: 80,
                  backgroundColor: "#F35120",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigate.goBack()}
                >
                  <AntDesign name="left" size={24} color="white" />
                  <Text style={{ fontSize: 15, color: "white" }}>Back</Text>
                </TouchableOpacity>
                <View style={{}}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    Movie Detail
                  </Text>
                </View>
                <View>
                  <Text>           </Text>
                </View>
              </View>
            </View>

            <ScrollView style={{height:height - 154}}>
              <View style={styles.main}>
                <View style={styles.imgView}>
                  <Image source={{ uri: data.Poster }} style={styles.img} />
                  <View style={styles.scoreView}>
                    <Text style={{ fontSize: 18 }}>{data.Metascore}</Text>
                    <Text style={{ fontSize: 18 }}>{data.imdbRating}</Text>
                  </View>
                </View>
                <View style={styles.titleView}>
                  <Text style={styles.title}>{data.Title}</Text>
                  <Text style={styles.detail}>{data.Genre}</Text>
                  <Text style={styles.detail}>{data.Released}</Text>
                  <Text style={styles.detail}>{data.Plot}</Text>
                  <Text style={styles.detail}>{data.Director}</Text>
                  <Text style={styles.detail}>{data.Writer}</Text>
                  <Text style={styles.detail}>{data.Actors}</Text>
                </View>
              </View>
                <Text style={{marginTop:10,paddingTop:10,paddingHorizontal:10, fontSize:16, fontWeight:'700', color:"gray",borderTopWidth:0.5}}>Actor</Text>
              <View style={[styles.ActorContainer,{flexWrap:"wrap", }]}>
                {arrActor.map((actor, index) => {
                  return (
                    <View key={index} style={{flexWrap:"wrap", marginVertical:10}}>
                      <Image style={styles.imgActor} source={actor.img} />
                      <Text style={{textAlign:"center",paddingHorizontal:5,flexWrap:"wrap"}} numberOfLines={2}>{actor.name}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.BtnOrder}
              // onPress={() => navigate.navigate("Showtimes", {
              //   imdbID: data['imdbID'],
              // })}
              onPress={()=>navigate.navigate("Showtimes")}
            >
              <Text style={styles.textBtnOrdet}>Get Reservation</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  imgView: {
    width: (width * 30) / 100,
    // height: (height * 90) / 100,
    alignItems: "center",
  },
  img: {
    width: (width * 25) / 100,
    height: (height * 16) / 100,
  },
  titleView: {
    width: (width * 70) / 100,
    // height: (height * 90) / 100,
    paddingRight: (width * 2.5) / 100,
  
  },
  main: {
    flexDirection: "row",
    paddingTop: 50,
    // height: height - 50 - 310,
  },

  title: {
    fontSize: 30,
  },
  scoreView: {
    alignContent: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    columnGap: 10,
    marginTop: 10,
  },
  detail: {
    paddingVertical: 5,
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  BtnOrder: {
    width: "100%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#867979",
  },
  textBtnOrdet: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 99999,
  },
  ActorContainer: {
    width: width,
    flexDirection: "row",
    marginVertical: 10,
    justifyContent:"center",
  },
  imgActor: {
    width: (width - 10*10) / 3,
    height: 150,
    backgroundColor: "red",
    marginHorizontal:10,
  },
});
