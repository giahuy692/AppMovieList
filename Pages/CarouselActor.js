import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { TouchableWithoutFeedback } from "react-native";
const { width, height } = Dimensions.get("screen");

export default function CarouselActor({data}) { 
  return (
      <View className="mb-8">
        <Text className="text-black text-xl mx-4 mb-5">Actor</Text>
        <Carousel 
          data={data}
          renderItem={({item}) => <MovieActor item={item} />}
          firstItem={1}
          inactiveSlideOpacity={0.60}
          sliderWidth={width}
          itemWidth={width*0.62}
          slideStyle={{display:'flex', alignItems:'center'}}
        />
      </View>
  );
};

const MovieActor = ({item}) => {
  return (
    <TouchableWithoutFeedback>
      <Image source={item.img} style={{width:width*0.6,height:height*0.4}} className="rounded-3xl"></Image>
    </TouchableWithoutFeedback>
  )
}