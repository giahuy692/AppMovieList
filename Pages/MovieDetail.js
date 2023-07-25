import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect,useState} from 'react'
import axios from 'axios';



const { width, height } = Dimensions.get('screen');

const MovieDetail = ({route}) => {
  const {imdbID} = route.params
  const [data, setData] = useState([]);

  const getDataAPI = async () => {
      let res = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=9a4fc8c1`);
      setData(res.data);
      
  }
  useEffect(() => { getDataAPI() }, [])

  const navigate = useNavigation();

  return (
    <>
    {
    <View>
      <View style={{ width: width, height: height * 10 / 100, backgroundColor: '#F35120', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Movie Detail</Text>
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 48, left: 10 }} onPress={() => navigate.goBack()}>
        <AntDesign name="left" size={24} color="white" />
        <Text style={{ fontSize: 15, color: 'white' }}>Back</Text>
      </TouchableOpacity>

      <View style={styles.main}>
        <View style={styles.imgView}>
          <Image
            source={{uri: data.Poster}}
            style={styles.img}
          />
          <View style={styles.scoreView}>
            <Text style={{fontSize: 18}}>{data.Metascore}</Text>
            <Text style={{fontSize: 18}}>{data.imdbRating}</Text>
          </View>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{data.Title}</Text>
          <Text style={styles.detail}>{data.Genre}</Text>
          <Text style={styles.detail}>{data.Released}</Text>
          <Text style={styles.detail}>{data.Plot}</Text>
          <Text style={styles.detail}>{data.Director}</Text>
          <Text style={styles.detail}>{data.Writer }</Text>
          <Text style={styles.detail}>{data.Actors}</Text>
        </View>
      </View>
    </View>
    }
    </>
  )
}

export default MovieDetail

const styles = StyleSheet.create({
  imgView: {
    width: width * 30 / 100,
    height: height * 90 / 100,
    alignItems: 'center',
  },
  img: {
    width: width * 25 / 100,
    height: height * 16 / 100,
  },
  titleView: {
    width: width * 70 / 100,
    height: height * 90 / 100,
    paddingRight: width *2.5/100,
  },
  main: {
    height: height * 90 / 100,
    flexDirection: 'row',
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
  },
  scoreView: {
    alignItems: 'flex-start',
    width: width * 25 / 100,
    alignItems: 'flex-start',
  },
  detail: {
    paddingVertical: 5,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
});