import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const { width, height } = Dimensions.get('screen');

const Register = () => {

    const navigation = useNavigation();
    const handleFogotPasswordPress = () => {
        navigation.navigate('Login')
    }

    return (
        <View>
            <View style={{ width: width, height: height * 10 / 100, backgroundColor: '#F35120', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Register</Text>
            </View>



            <Text> Register page</Text>
            <TouchableOpacity style={styles.touchForget}>
                <Text
                    style={styles.btnForgot}
                    onPress={handleFogotPasswordPress}
                >
                    Forgot Password?
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Register

const styles = StyleSheet.create({

})