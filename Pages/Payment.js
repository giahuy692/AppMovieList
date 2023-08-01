import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
const { width, height } = Dimensions.get("screen");
import * as SMS from "expo-sms";

export default function Payment({ route }) {
  const data = route.params;
  const navigate = useNavigation();
  const isAvailable = SMS.isAvailableAsync();
  const [isOnSite, setOnSite] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = () => {
    // Perform payment processing here using a payment gateway.
    // For this example, let's just show an alert.
    Alert.alert(
      "Payment Successful!",
      "Your movie ticket has been booked successfully."
    );
    console.log();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headers}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigate.goBack()}
        >
          <AntDesign name="left" size={24} color="white" />
          <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          Payment information
        </Text>
        <View style={{ width: 50, overflow: "hidden" }}>
          {/* You can add any other component here if needed */}
        </View>
      </View>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titleText}>Film information</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.movieName}>{data.movieName}</Text>
          <View style={{ flexDirection: "row", columnGap: 20 }}>
            <View style={styles.dateAndTime}>
              <Text style={styles.dateAndTimeTitle}>Date and time</Text>
              <Text style={styles.time}>
                <Ionicons name="time-outline" size={20} color="black" />{" "}
                {data.time}
              </Text>
              <Text style={styles.date}>
                <Ionicons name="calendar-outline" size={20} color="black" />{" "}
                {data.date}
              </Text>
            </View>
            <View style={styles.seatsContainer}>
              <Text style={styles.seatsTitle}>Seats</Text>
              <View style={{flexWrap:"wrap", flexDirection:"row", columnGap:10,  }}>
                {data.seats.map((v) => (
                  <Text style={styles.seats}>{v}</Text>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.cinemaWrapper}>
            <View style={styles.cinema}>
              <Text style={styles.cinemaTitle}>Cinema</Text>
              <Text style={styles.cinemaName}>BHD Star Le Van Viet</Text>
            </View>
            <View style={styles.room}>
              <Text style={styles.roomTitle}>Movie Theater</Text>
              <Text style={styles.roomText}>Screen 4</Text>
            </View>
          </View>
          <View style={styles.cinemaWrapper}>
            <View style={styles.cinema}>
              <Text style={styles.cinemaTitle}>Format</Text>
              <Text style={styles.cinemaName}>2D Phụ đề</Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Fullname: </Text>
          <TextInput
            style={styles.input}
            value={fullname}
            onChangeText={setFullname}
            keyboardType="default"
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="84+ _____ _____ _____"
          />

          <View style={{ marginTop: 10 }}>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={isOnSite}
                onValueChange={setOnSite}
                color={isOnSite ? "#F35120" : undefined}
              />
              <Text style={styles.paragraph}>On-site Payment</Text>
            </View>
            <View style={styles.section}>
              <Checkbox style={styles.checkbox} disabled />
              <Text style={styles.paragraph}>Credit Card Payment</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headers: {
    width: width,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F35120",
    flexDirection: "row",
    paddingHorizontal: 20,
    
  },
  title: {
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color:"gray"
  },
  main: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  movieName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateAndTime: {
    width: width / 1.8,
    marginBottom: 15,
  },
  dateAndTimeTitle: {
    color: "gray",
    fontSize: 16,
    marginBottom: 5,
    flex:1
  },
  time: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seatsContainer: {
    width: width / 2,
    marginBottom: 15,
    flex:1
  },
  seatsTitle: {
    color: "gray",
    fontSize: 16,
    marginBottom: 5,
  },
  seats: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cinemaWrapper: {
    borderTopWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    columnGap: 20,
  },
  cinema: {
    paddingVertical: 10,
    width: width / 2,
  },
  cinemaTitle: {
    color: "gray",
    marginBottom: 5,
  },
  cinemaName: {
    fontWeight: 700,
  },
  room: {
    paddingVertical: 10,
    width: width / 2,
  },
  roomTitle: {
    color: "gray",
    marginBottom: 5,
  },
  roomText: {
    fontWeight: 700,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F35120",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});