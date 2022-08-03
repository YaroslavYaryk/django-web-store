import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   Dimensions,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Platform } from "react-native";
import Slider from "../../components/Slider";
import TitleSlider from "../../components/TitleSlider";
import RatingItem from "../../components/RatingItem";
import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState } from "react";

import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
   <Transition.Together>
      <Transition.In type="fade" durationMs={200} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={200} />
   </Transition.Together>
);

const DropDown = (props) => {
   return (
      <Transitioning.View
         ref={props.ref}
         transition={transition}
         style={{ ...styles.container, ...props.style }}
      >
         {props.children}
      </Transitioning.View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
      // height: 200,
   },
});

export default DropDown;
