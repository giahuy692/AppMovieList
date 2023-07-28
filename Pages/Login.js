import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardType,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from '../MockData/User';


const { width, height } = Dimensions.get('screen');

// let arr = [
//     { email: 'w@w.com', password: '123' },
//     { email: 'w123@w.com', password: '123' },
//     { email: 'w251@w.com', password: '123' },
//     { email: 'w112@w.com', password: '123' },
// ]



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

    const navigation = useNavigation();

//================================Xử lý input=============================
    const handleLoginPress = () => {
        if (!email) {
            setIsEmailValid(true); // Ẩn thông báo lỗi khi không nhập gì trong input email
            setIsEmailEmpty(true);
            return;
        }
        if (!validateEmail(email)) {
            setIsEmailValid(false); // Hiển thị thông báo lỗi khi nhập không đúng định dạng email
            setIsEmailEmpty(false);
            return;
        }
        if (!password) {
            setIsPasswordEmpty(true);
            setIsPasswordCorrect(true);
            return;
        }


        Login(email, password);
    };

    const validateEmail = (email) => {
        // Hàm kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (email) => {
        setEmail(email);
        setIsEmailValid(true); // Ẩn thông báo lỗi khi người dùng thay đổi giá trị input email
        setIsEmailEmpty(false);
    };
    const handlePasswordChange = (password) => {
        setPassword(password);
        setIsPasswordEmpty(false);
        setIsPasswordCorrect(true);
    };

    const handleFogotPasswordPress = () => {
        navigation.navigate('Register')
    }

    const handleRegisterPress = () => {
        navigation.navigate('Register')
    }

//=========================Logic đăng nhập==============================
    const Login = (email, password) => {
        for (let i = 0; i < User.length; i++) {
            const element = User[i];
            if (email == element.email && password == element.password) {
                setIsPasswordEmpty(false);
                setIsPasswordCorrect(true);
                navigation.navigate('Movie Explorer')
                console.log("Login success")
            }
            else {
                setIsPasswordCorrect(false);
            }
            break;
        }
    }
    return (

        <View style={styles.container}>


            <View style={styles.constainerForm}>

                <Image
                    style={styles.logo}
                    source={require('../assets/images/Logo.png')}
                />
                <Text style={styles.textLogo}>
                    Movie Login
                </Text>

                <View style={styles.inputView}>
                    <Text style={styles.textTitleInput}>Email</Text>
                    <TextInput
                        keyboardType="email-address"
                        style={styles.textInput}
                        // placeholder="Email.."
                        // placeholderTextColor="#003f5c"
                        onChangeText={handleEmailChange}
                    />
                </View>
                <View>
                    {!isEmailValid && <Text style={styles.textError}>You entered not an email</Text>}
                    {isEmailEmpty && <Text style={styles.textError}>Email cannot be left blank</Text>}
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.textTitleInput}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        // placeholder="Password.."
                        // placeholderTextColor="#003f5c"
                        onChangeText={handlePasswordChange}
                        secureTextEntry
                    />

                </View>
                <View>
                    {isPasswordEmpty && <Text style={styles.textError}>Password cannot be left blank</Text>}
                    {!isPasswordCorrect && <Text style={styles.textError}>Password not correct</Text>}
                </View>

            </View>



            <TouchableOpacity style={styles.touchForget}>
                <Text
                    style={styles.btnForgot}
                    onPress={handleFogotPasswordPress}
                >
                    Forgot Password?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleLoginPress}
            >
                <Text style={styles.textLogin}>
                    LOGIN
                </Text>
            </TouchableOpacity>


            <View style={styles.containerRegister}>
                <Text stye={styles.titleRegister}>Don't have an account?</Text>
                <TouchableOpacity
                    style={styles.btnRegister}
                    onPress={handleRegisterPress}
                >
                    <Text style={styles.textRegister}>
                        Create One.
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        display: 'flex',
        justifyContent: 'flex-start'
    },

    logo: {
        height: 120,
        width: 120,
        marginBottom: 20
    },
    textLogo: {
        color: 'rgb(131, 134, 145)',
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 50,
    },

    constainerForm: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        marginTop: 150


    },
    inputView: {

        width: "80%",
        height: 60,
        marginTop: 10

    },
    textInput: {
        height: 0,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
        backgroundColor: 'rgb(247, 246, 248)'

    },
    textTitleInput: {
        color: 'rgb(144, 144, 144)',
        fontSize: 16,
        marginLeft: 15
    },
    textError: {
        // backgroundColor: 'red',
        // marginBottom: 10,
        color: 'red'
    },

    touchForget: {
        width: '20%',
        marginTop: 15,
        // backgroundColor: 'red'
    },
    btnForgot: {
        width: width,
        height: 30,
        paddingLeft: 50,
        // marginLeft: 50,
        fontWeight: '700',
        color: 'rgb(243, 80, 34)',

    },
    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 50,
        backgroundColor: "rgb(246, 144, 115)",

    },
    textLogin: {
        fontWeight: '800'
    },

    containerRegister: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(250, 250, 250)',
        marginTop: 40,
        width: '80%',
        gap: 5,
        height: 50,
        marginLeft: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleRegister: {

    },
    btnRegister: {

    },
    textRegister: {
        color: 'rgb(243, 80, 34)',
    },

})