import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


//==================================================================================
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Datepicker = () => {

    const [selectedTime, setSeletedTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const handleTimeChange = (event, selected) => {
        const currentDate = selected;
        setShow(false);
        setSeletedTime(currentDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <SafeAreaView>
            <Button
                onPress={showDatepicker}
                title="Show date picker!"
            ></Button>

            <Text>
                {/* vi-VN để chuyển thành kiểu dữ liệu DD/MM/YYYY */}
                Selected: {selectedTime.toLocaleDateString('vi-VN')} 
            </Text>

            {show && (
                <RNDateTimePicker
                    testID="datePicker"
                    value={selectedTime}
                    mode={mode}
                    display='calendar'
                    is24Hour={true}
                    // minimumDate={new Date(2023, 10, 20)} thời gian hiển thị nhỏ nhất trên lịch
                    // maximumDate={}  
                    onChange={handleTimeChange}
                >

                </RNDateTimePicker>
            )}

        </SafeAreaView>
    )
};


export default Datepicker;