import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Showtimesdb from '../MockData/Showtimesdb';


const { width, height } = Dimensions.get('screen');

//============================ UI list showtimes =================================

const ShowtimeItem = ({ imdbID, nameTheater, date, lich, selectedTimes, handleSelectTime, room, category }) => {
    const selectedTimeItem = selectedTimes;
    // console.log(selectedTimes)
    return (
        <View style={styles.showtimeItem}>
            <Text style={styles.nameTheater}>{nameTheater}</Text>
            <Text style={styles.date}>{date}</Text>
            {/* <Text style={styles.date}>{imdbID}</Text> */}
            {lich.map((item, index) => (
                <View key={index}>
                    <Text style={styles.category}>{item.category}</Text>
                    <View style={styles.timeList}>
                        {item.time.map((time, idx) => {
                            const isSelected = selectedTimeItem.time === time && selectedTimeItem.cinema === nameTheater;
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.time,
                                        {
                                            backgroundColor: isSelected ? 'rgb(64, 159, 64)' : 'rgb(246, 144, 115)',
                                        },
                                    ]}
                                    onPress={() => {
                                        if (isSelected) {
                                            // Nếu click lần nữa vào time đã chọn thì bỏ chọn nó
                                            handleSelectTime(imdbID, nameTheater, date, null, room, item.category);
                                        } else {
                                            // Ngược lại, chọn time
                                            handleSelectTime(imdbID, nameTheater, date, time, room, item.category);
                                        }
                                    }}
                                >
                                    <Text style={{ color: isSelected ? 'white' : 'black' }}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            ))}
        </View>
    );
};

//============================ End  UI list showtimes =================================


// useEffect(() => {

// }, []);

const Showtimes = () => {
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedTheater, setSelectedTheater] = useState('');
    const [selectedTimes, setSelectedTimes] = useState({});
    const [selectedCinemaInfo, setSelectedCinemaInfo] = useState({});
    const [selectedDate, setSeletedDate] = useState(new Date());// khai báo cho lịch
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const route = useRoute();
    const { imdbID } = route.params;
    
    const navigation = useNavigation();

    const handleSelectTime = (imdbID, theater, date, time, room, category) => {
        setSelectedTimes((prevSelectedTimes) => {
            const newSelectedTimes = { ...prevSelectedTimes };

            // Nếu time là null (được trả về khi bỏ chọn time), ta xóa giá trị tương ứng trong state
            if (time === null) {
                delete newSelectedTimes['cinema'];
                delete newSelectedTimes['time'];
                delete newSelectedTimes['date'];
                delete newSelectedTimes['imdbID'];
                delete newSelectedTimes['room'];
                delete newSelectedTimes['category'];
            } else {
                // Ngược lại, set giá trị mới
                newSelectedTimes['cinema'] = theater;
                newSelectedTimes['time'] = time;
                newSelectedTimes['date'] = date;
                newSelectedTimes['imdbID'] = imdbID;
                newSelectedTimes['room'] = room;
                newSelectedTimes['category'] = category;
                // console.log(route.params)
                // console.log(newSelectedTimes)
            }
            return newSelectedTimes;
        });
    };

    const handleSelectButton = () => {
        if (Object.keys(selectedTimes).length > 0) {
            const selectedShowtimes = Showtimesdb.filter((item) => item.date === selectedDate.toLocaleDateString('vi-VN') && item.imdbID === imdbID.toString());
            navigation.navigate('TicketBooking', {
                cinemaInfo: selectedTimes,
                showtimes: selectedShowtimes
            });
        } else {
            alert('Vui lòng chọn thời gian.');
        }
    };

    // Xử lý chọn lịch
    const handleTimeChange = (event, selected) => {
        const currentDate = selected;
        setShow(false);
        setSeletedDate(currentDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const showtimesForSelectedDate = Showtimesdb.filter((item) => item.imdbID === route.params.imdbID.toString() && item.date === selectedDate.toLocaleDateString('vi-VN'));

    return (
        <View style={styles.constainer}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Select Date and Cinema</Text>
                <Text style={styles.textHeader1}>(*)Select showtime to book tickets online</Text>
            </View>

            <ScrollView style={{ height: height - 155 }}>
                <View style={styles.navigateShowtimes}>
                    <View style={styles.containerDate}>
                        <Text style={styles.calander}>
                            {selectedDate.toLocaleDateString('vi-VN')}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.btnDatePicker} onPress={showDatepicker}>
                        <Text style={styles.textBtnDatePicker}>Choose date for film</Text>
                    </TouchableOpacity>
                    {show && (
                        <RNDateTimePicker
                            testID="datePicker"
                            value={selectedDate}
                            mode={mode}
                            display="calendar"
                            is24Hour={true}
                            onChange={handleTimeChange}
                        />
                    )}
                </View>

                <View style={styles.containerListCinema}>
                    {showtimesForSelectedDate.length > 0 ? (
                        showtimesForSelectedDate.map((item, index) => (
                            <ShowtimeItem
                                key={index}
                                nameTheater={item.nameTheater}
                                date={item.date}
                                imdbID={item.imdbID}
                                room={item.room}
                                category={item.category}
                                lich={item.lich}
                                selectedTimes={selectedTimes}
                                handleSelectTime={handleSelectTime}
                            />
                        ))
                    ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/images/Logo.png')}
                            />
                            <Text style={{ textAlign: "center", color: "gray" }}>Oops! Looks like there are no showtimes scheduled for the selected date.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.menuFooter}>
                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textBtnCancel}>
                        Cancel
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnBuy}
                    onPress={handleSelectButton}
                >
                    <Text style={styles.textBtnBuy}>
                        Select
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}




const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        width: width,
        backgroundColor: 'rgb(243, 243, 243)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        width: width,
        // backgroundColor: 'lightgray',
        marginLeft: 20,
        marginVertical: 60,
        // marginHorizontal: 10,
    },
    textHeader: {
        color: 'rgb(243, 80, 34)',
        fontWeight: '800',
        fontSize: 28
    },
    textHeader1: {
        color: 'rgb(243, 80, 34)',
        fontWeight: '800',
        fontSize: 20
    },
    navigateShowtimes: {
        display: 'flex',
        width: width,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    containerDate: {
        backgroundColor: 'rgb(246, 144, 115)',
        width: '80%',
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calander: {
        backgroundColor: 'rgb(246, 144, 115)',
        color: 'rgb(90, 90, 90)',
        width: 300,
        height: 32,
        lineHeight: 32,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: 15,
    },
    btnDatePicker: {
        backgroundColor: "rgb(128, 128, 128)",
        borderRadius: 15,
        height: 32,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtnDatePicker: {
        fontWeight: '800',
        color: '#fff'
    },
    containerListCinema: {
        // backgroundColor: 'gray',
        marginHorizontal: 30,
        marginVertical: 30,

    },
    //========================Style list clander========================

    showtimeItem: {
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 1,



    },
    nameTheater: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    date: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    category: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(243, 80, 34)',
        marginBottom: 10,
    },
    timeList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    time: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgb(246, 144, 115)',
        color: 'white',
        fontSize: 16,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },

    noShowtimesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },

    logo: {
        height: 120,
        width: 120,
        marginBottom: 20
    },

    //========================End style list clander========================
    menuFooter: {
        backgroundColor: 'rgb(246, 144, 115)',
        width: width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnCancel: {
        backgroundColor: "rgb(128, 128, 128)",
        height: 60,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',


    },
    btnBuy: {
        backgroundColor: "rgb(243, 79, 33)",
        height: 60,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBtnCancel: {
        fontSize: 18,
        color: '#fff'
    },
    textBtnBuy: {
        fontSize: 18,
        color: '#fff'
    },
    

})

export default Showtimes