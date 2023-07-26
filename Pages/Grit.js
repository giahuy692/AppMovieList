import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const { width, height } = Dimensions.get('screen');

const Grit = () => {
    return (
        <View>
            <View style={{ width: width, height: height * 10 / 100, backgroundColor: '#F35120', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Grit</Text>
            </View>

            <View style={styles.disCol}>
                <Text style={styles.textMenu}>Promotion</Text>
                <Text style={styles.textMenu}>Phim</Text>
                <Text style={styles.textMenu}>Đối tác</Text>
                <Text style={styles.textMenu}>Rạp</Text>
            </View>

            <View style={styles.containerBox}>
                <View style={styles.containerGrit}>
                    <View style={styles.imageGrip}>
                        <Text></Text>
                    </View>
                    <Text style={styles.titleGrit}>Noi dung dadsad dasdasd dasdsadsa dsadasd dasdsad sadsadas dsadsa dadadsa dsdasdsa dsdasd dasdasd adasd sa </Text>
                    <View>
                        <Text style={styles.dateEvent}>25/07/2023 - 30/09/2023</Text>
                    </View>
                </View>
            </View>



        </View>
    )
}


export default Grit

const styles = StyleSheet.create({
    disCol: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        borderBottomWidth: 1
    },

    textMenu: {
        padding: 10,

    },

    containerBox:{
        width: width,
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 15,
    },

    containerGrit: {
        borderWidth: 1,
        borderRadius: 25,
        height: 300,
    },
    imageGrip:{
        backgroundColor: 'red',
        height: 200,
        width: '100%'
    },
    titleGrit:{
        backgroundColor: 'green',
        height: 60,
        overflow: 'hidden',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        
        
    },
    dateEvent:{
        // backgroundColor: 'gray',
        height: 40,
        paddingHorizontal: 10
    },

})
