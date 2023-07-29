import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
const { width, height } = Dimensions.get("screen");

const TicketBookingScreen = ({ route }) => {
  const { imdbID } = route.params;
  const navigate = useNavigation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [priceTicket, setPriceTicket] = useState("Price Ticket");
  const [MovieDetail, setMovieDetail] = useState(new Date());
  const [isLoadingMore, setisLoadingMore] = useState(false);
  //#region component
  const SeatItem = ({ seat, isSelected, onPress, price }) => {
    const seatStyle = isSelected ? styles.selectedSeat : styles.seat;
    const seatTextStyle = isSelected ? styles.textWhite : styles.textBlack;

    return (
      <TouchableOpacity style={seatStyle} onPress={() => onPress(seat, price)}>
        <Text style={seatTextStyle}>{seat}</Text>
      </TouchableOpacity>
    );
  };

  const SeatSelection = ({ selectedSeats, onSeatPress }) => {
    const seats = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    const seatPrices = {
      A1: 10,
      A2: 15,
      A3: 12,
      B1: 11,
      B2: 13,
      B3: 16,
      C1: 14,
      C2: 10,
      C3: 9,
    };

    const handleSeatPress = (seat) => {
      setSelectedSeats((prevSeats) => {
        if (prevSeats.includes(seat)) {
          // Nếu ghế đã được chọn trước đó, bỏ chọn nó và trừ giá tiền của ghế đó khỏi tổng tiền
          let totalPrice = 0;
          prevSeats.forEach((selectedSeat) => {
            if (selectedSeat !== seat) {
              totalPrice += seatPrices[selectedSeat];
            }
          });
          setPriceTicket(`${totalPrice}.000 VND`);
          return prevSeats.filter((s) => s !== seat);
        } else {
          // Nếu ghế chưa được chọn trước đó, thêm nó vào danh sách ghế đã chọn và cộng giá tiền của ghế đó vào tổng tiền
          let totalPrice = 0;
          prevSeats.forEach((selectedSeat) => {
            totalPrice += seatPrices[selectedSeat];
          });
          totalPrice += seatPrices[seat];
          setPriceTicket(`${totalPrice}.000 VND`);
          return [...prevSeats, seat];
        }
      });
    };

    return (
      <View style={styles.seatSelection}>
        {seats.map((seat) => (
          <SeatItem
            key={seat}
            seat={seat}
            isSelected={selectedSeats.includes(seat)}
            onPress={handleSeatPress}
            price={seatPrices[seat]}
          />
        ))}
      </View>
    );
  };
  //#endregion

  const handleSeatPress = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const getDataAPI = async () => {
    let res = await axios.get(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=23613bd5`
    );
    setMovieDetail(res.data);
    setisLoadingMore(false);
  };
  useEffect(() => {
    setisLoadingMore(true);
    getDataAPI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headers}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigate.goBack()}
        >
          <AntDesign name="left" size={24} color="white" />
          <Text style={{ fontSize: 15, color: "white" }}>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          Ticket Booking
        </Text>
        <View style={{ width: 50, overflow: "hidden" }}>
          <Text></Text>
        </View>
      </View>
      <ScrollView style={{ width:width,height: height - 230, position: "relative" }}>
        {isLoadingMore && (
          <ActivityIndicator
            size="large"
            style={styles.loading}
            color={["red"]}
          />
        )}
        <View style={styles.main}>
          <View
            style={{
              overflow: "hidden",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginVertical: 10,
            }}
          >
            <Image
              source={{ uri: MovieDetail["Poster"] }}
              style={styles.imgMovie}
            />
            <View style={{ margin:10 }}>
              <Text style={styles.title}>{MovieDetail['Title']}</Text>
              <Text style={styles.detail}>{MovieDetail.Genre}</Text>
              <Text style={styles.detail}>{MovieDetail.Released}</Text>
              <Text style={styles.detail}>{MovieDetail.Plot}</Text>
              <Text style={styles.detail}>{MovieDetail.Director}</Text>
              <Text style={styles.detail}>{MovieDetail.Writer}</Text>
              <Text style={styles.detail}>{MovieDetail.Actors}</Text>
            </View>
          </View>
          <View>
            <Text style={{margin:10, fontSize:16, fontWeight:700, color:"gray"}}>Select Seats</Text>
            <SeatSelection
              selectedSeats={selectedSeats}
              onSeatPress={handleSeatPress}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity style={styles.cancel}  onPress={() => navigate.goBack()}>
          <Text style={styles.priceText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.price}>
          {/* <Text style={styles.priceText}>Go Cart</Text> */}
          <Text style={styles.priceText}>{priceTicket}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  seatSelection: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  selectedSeat: {
    width: 50,
    height: 50,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
  price: {
    width: width / 2,
    height: 60,
    backgroundColor: "#F35120",
    justifyContent: "center",
    textAlign: "center",
  },
  priceText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  headers: {
    width: width,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F35120",
    flexDirection: "row",
  },
  cancel: {
    backgroundColor: "gray",
    width: width / 2,
    height: 60,
    justifyContent: "center",
    textAlign: "center",
  },
  imgMovie: {
    width: width,
    height: 300,
    resizeMode: "contain",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 99999,
  },
  shadowContainer: {
    elevation: 5,
  },
  title: {
    fontSize: 30,
  },
  detail: {
    paddingVertical: 5,
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
});

export default TicketBookingScreen;
