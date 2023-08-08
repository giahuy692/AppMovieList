import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import FileSave from './FileSave';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Register from './Register';


const FileGet = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleGetData = () => {
        // Xử lý dữ liệu sau khi click nút "Get Data"
        // Ví dụ: In giá trị hai input ra console
        console.log('Input 1:', email);
        console.log('Input 2:', password);
    };
    const handleClickPress = () => {
        navigation.goBack();
    }

    useEffect(() => {
        getData();
        
    }, []);

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('data_key');
            if (jsonData !== null) {
                const data = JSON.parse(jsonData);
                setData(data)
                console.log('Dữ liệu từ AsyncStorage:', data);
                // Tiếp tục xử lý dữ liệu ở đây
            } else {
                console.log('Không tìm thấy dữ liệu trong AsyncStorage.');
            }
        } catch (error) {
            console.log('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
          {/* Input 1 */}
          <TextInput
            style={styles.input}
            placeholder="Nhập thông tin 1"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
    
          {/* Input 2 */}
          <TextInput
            style={styles.input}
            placeholder="Nhập thông tin 2"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
    
          {/* Nút "Get Data" */}
          <TouchableOpacity style={styles.button} onPress={handleGetData}>
            <Text style={styles.buttonText}>Get Data</Text>
          </TouchableOpacity>
        </View>
      );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

})

export default FileGet;
