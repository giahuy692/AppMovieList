import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const TicketBookingScreen = () => {
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [priceTicket, setPriceTicket] = React.useState("Price Ticket");

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

  const handleSeatPress = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SeatSelection
        selectedSeats={selectedSeats}
        onSeatPress={handleSeatPress}
      />
      <View style={styles.price}>
        <Text style={styles.priceText}>{priceTicket}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    width: 150,
    height: 60,
    backgroundColor: "#80df20",
    borderRadius: 12,
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
  },
  priceText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default TicketBookingScreen;
