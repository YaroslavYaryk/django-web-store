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
// import { HOST, PORT } from "../constants/server";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const RatingItem = (props) => {
   const [stars, setStars] = useState([]);

   useEffect(() => {
      const startRating = [0, 0, 0, 0, 0];
      for (var i = 0; i < props.stars; i++) {
         if (i < props.stars) {
            startRating[i] = 1;
         }
      }
      setStars(startRating);
   }, []);

   return (
      <View style={styles.product}>
         {stars.map((elem) => (
            <AntDesign
               key={Math.random()}
               name={elem ? "star" : "staro"}
               size={18}
               color="orange"
            />
         ))}
         <Text style={{ marginLeft: props.nonSpace ? 0 : 5 }}>
            {props.reviews}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   product: {
      shadowColor: "black",
      flexDirection: "row",
   },
});

export default RatingItem;
