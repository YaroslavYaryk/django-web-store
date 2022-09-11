import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   TouchableNativeFeedback,
   Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const RatingStars = (props) => {
   const [stars, setStars] = useState([
      { index: 0, value: 0 },
      { index: 1, value: 0 },
      { index: 2, value: 0 },
      { index: 3, value: 0 },
      { index: 4, value: 0 },
   ]);

   const handlePressStar = (index) => {
      var staticStars = [
         { index: 0, value: 0 },
         { index: 1, value: 0 },
         { index: 2, value: 0 },
         { index: 3, value: 0 },
         { index: 4, value: 0 },
      ];
      for (var i = 0; i <= index; i++) {
         staticStars[i].value = 1;
      }
      setStars(staticStars);
      props.setRatingStars(index + 1);
   };

   useState(() => {
      if (props.defaultStar) {
         handlePressStar(props.defaultStar - 1);
      }
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.product}>
            {stars.map((elem) => (
               <TouchableOpacity
                  key={elem.index}
                  onPress={() => {
                     handlePressStar(elem.index);
                  }}
               >
                  <AntDesign
                     key={Math.random()}
                     name={elem.value ? "star" : "staro"}
                     size={40}
                     color="orange"
                  />
               </TouchableOpacity>
            ))}
            <Text style={{ marginLeft: 5 }}>{props.reviews}</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
   },
   product: {
      shadowColor: "black",
      flexDirection: "row",
   },
});

export default RatingStars;
