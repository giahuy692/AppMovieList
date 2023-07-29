import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

let Showtimesdb = [
    {
        imdbID: 'tt0372784', nameTheater: 'Cao Thắng', date: '28/7/2023',
        lich: [{
            category: '2D PHỤ ĐỀ / SUB', time: ['17:20', '20:20', '22:20', '23:30']
        },
        {
            category: '2D LỒNG TIẾNG / DUB', time: ['19:20']
        }
        ]

    },
    {
        imdbID: 'tt2975590', nameTheater: 'CCV HCM', date: '28/7/2023',
        lich: [{
            category: '2D PHỤ ĐỀ / SUB', time: ['17:20', '20:20', '22:20', '23:30']
        },
        {
            category: '2D LỒNG TIẾNG / DUB', time: ['19:20']
        }
        ]

    },
]

const { width, height } = Dimensions.get('screen');

//============================ UI list showtimes =================================

const ShowtimeItem = ({ nameTheater, date, lich, selectedTimes, handleSelectTime }) => {
    const selectedTimeItem = selectedTimes;

    return (
        <View style={styles.showtimeItem}>
            <Text style={styles.nameTheater}>{nameTheater}</Text>
            <Text style={styles.date}>{date}</Text>
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
                                            handleSelectTime(nameTheater, date, null);
                                        } else {
                                            // Ngược lại, chọn time
                                            handleSelectTime(nameTheater, date, time);
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


const Showtimes = () => {
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedTheater, setSelectedTheater] = useState('');
    const [selectedTimes, setSelectedTimes] = useState({});
    const [selectedCinemaInfo, setSelectedCinemaInfo] = useState({});

    const navigation = useNavigation();

    const handleSelectTime = (theater, date, time) => {
        // console.log(theater, time)
        setSelectedTimes((prevSelectedTimes) => {
            // console.log('button ' , prevSelectedTimes)
            // Tạo một bản sao mới của selectedTimes để tránh thay đổi trực tiếp vào state
            const newSelectedTimes = { ...prevSelectedTimes };
            // Nếu time là null (được trả về khi bỏ chọn time), ta xóa giá trị tương ứng trong state
            if (time === null) {
                delete newSelectedTimes['cinema'];
                // console.log('if ', newSelectedTimes)
            } else {
                // Ngược lại, set giá trị mới
                newSelectedTimes['cinema'] = theater;
                newSelectedTimes['time'] = time;
                newSelectedTimes['date'] = date;

                
                // console.log('else ', newSelectedTimes)
            }
            return newSelectedTimes;
        });
    };

    const handleSelectButton = () => {
        if (Object.keys(selectedTimes).length > 0) {
            // setSelectedCinemaInfo(selectedTimes);
            // console.log('Select ',  selectedTimes)
            navigation.navigate('DetailCinema', {
                cinemaInfo: selectedTimes,
             
                
            });
        } else {
            alert('Vui lòng chọn thời gian.')
        }
    };

    return (
        <View style={styles.constainer}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Select Date and Cinema</Text>
                <Text style={styles.textHeader1}>(*)Select showtime to book tickets online</Text>
            </View>

            <View style={styles.navigateShowtimes}>
                <TouchableOpacity>
                    <AntDesign name="left" size={32} color="white" backgroundColor="rgb(131, 134, 145)" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.calander}>24/07/2023</Text>
                </View>
                <TouchableOpacity>
                    <AntDesign name="right" size={32} color="white" backgroundColor="rgb(131, 134, 145)" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerListCinema}>
                {/* Hiển thị thông tin lịch chiếu */}
                {Showtimesdb.map((item, index) => (
                    <ShowtimeItem
                        key={index}
                        nameTheater={item.nameTheater}
                        date={item.date}
                        lich={item.lich}
                        selectedTimes={selectedTimes}
                        handleSelectTime={handleSelectTime}
                    />
                ))}

            </View>

            <View style={styles.menuFooter}>
                <TouchableOpacity style={styles.btnCancel}>
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
        marginTop: 60,
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
        flexDirection: 'row',
        width: width,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
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
    },
    containerListCinema: {
        // backgroundColor: 'gray',
        width: width,
        marginLeft: 10,
    },
    //========================Style list clander========================

    showtimeItem: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
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
