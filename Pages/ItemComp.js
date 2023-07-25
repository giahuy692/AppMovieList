import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');

const ItemComp = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    const getDataAPI = async () => {
        let res = await axios.get('https://www.omdbapi.com/?s=batman&apikey=9a4fc8c1');
        setData(res.data.Search);
    }
    useEffect(() => { getDataAPI() }, [])

    return (
      
        <View>
            {
                data.length ?
                data.map((item,index) =>
        <TouchableOpacity style={styles.container}
        key={index}
        onPress={() => navigation.navigate('Movie Detail',{
            imdbID: item.imdbID,            
        })}
        >
           
            <View style={styles.img}>
                <Image
                    source={{uri: item.Poster}}
                    style={{ width: width * 22 / 100, height: height * 16 / 100 }}
                />
            </View>
            <View style={styles.title}> 
                <Text>{item.Title}</Text>
            </View>
            <View style={styles.icon}>
                <AntDesign name="right" size={20} color="black" />
            </View>
        </TouchableOpacity>):null
            }
        </View>
    )
}

export default ItemComp

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height * 18 / 100,
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    img: {
        width: width * 25 / 100,
        height: height * 18 / 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        width: width * 65 / 100,
        height: height * 18 / 100,
        paddingLeft: 10,
        paddingVertical: 20,
    },
    icon: {
        width: width * 10 / 100,
        height: height * 18 / 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight:'bold',
    },
});