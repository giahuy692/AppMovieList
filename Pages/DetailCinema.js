import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


const { width, height } = Dimensions.get('screen');


// const DetailCinema = () => {

//     const navigation = useNavigation();


//     const route = useRoute();
//     const selectedCinemaInfo = route.params.selectedCinemaInfo; // Nhận thông tin từ tham số navigation

//     // Hiển thị thông tin tên rạp và giờ đã chọn
//     return (
//         <View style={styles.container}>
//             <Text>Tên rạp: {selectedCinemaInfo.nameTheater}</Text>
//             <Text>Giờ chiếu: {selectedCinemaInfo.time}</Text>

//             <TouchableOpacity
//                 onPress={navigation.navigate('Showtimes')}
//             >
//                 <Text>
//                     Back page
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

const DetailCinema = ({ route }) => {
    const{date, time, cinema } = route.params.cinemaInfo
    const navigate = useNavigation();

    // useEffect(() => {
    //         console.log(route.params)
    //     }, []);

    // Hiển thị thông tin và dữ liệu
    return (
        <View style={styles.container}>
            {/* Hiển thị dữ liệu */}
            <Text>
                Ngày: {date}
                Thời gian: {time}
                Rạp: {cinema}
            </Text>

            

        </View>

        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default DetailCinema