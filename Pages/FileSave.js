// Import thư viện và component cần thiết
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



const FileSave = () => {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const navigation = useNavigation();

    const handleClickPress = () => {
        navigation.navigate('FileGet')
    }

    const saveData = () =>{
        handleSaveData();
    }

    const handleSaveData = async () => {
        try {
            const dataToSave = {
                input1: inputValue1,
                input2: inputValue2,
            };
            const jsonData = JSON.stringify(dataToSave);
            await AsyncStorage.setItem('data_key', jsonData);
            console.log('Dữ liệu đã được lưu vào AsyncStorage:', jsonData);
            navigation.navigate('FileGet')
        } catch (error) {
            console.log('Lỗi khi lưu dữ liệu vào AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nhập giá trị thứ nhất:</Text>
            <TextInput
                style={styles.input}
                value={inputValue1}
                onChangeText={(text) => setInputValue1(text)}
            />
            <Text style={styles.label}>Nhập giá trị thứ hai:</Text>
            <TextInput
                style={styles.input}
                value={inputValue2}
                onChangeText={(text) => setInputValue2(text)}
            />
            <TouchableOpacity style={styles.button} onPress={saveData}>
                <Text style={styles.buttonText}>Lưu dữ liệu</Text>
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
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'rgb(246, 144, 115)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default FileSave;
