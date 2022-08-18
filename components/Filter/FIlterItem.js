import React from "react";
import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
   FlatList,
   Animated,
   Easing,
   SafeAreaView,
   LayoutAnimation,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { toggleAnimation } from "../../constants/animation";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const FilterItem = (props) => {
   const [showInfo, setShowInfo] = useState(false);

   const el = props.el;
   return (
      <View
         key={el.id + Math.random()}
         style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
         }}
      >
         <FontAwesome
            name={el.selected ? "check-square-o" : "square-o"}
            size={24}
            color={Colors.primaryColor}
            onPress={() => {
               props.selectProductOption(el.id);
            }}
         />

         <View style={{ padding: 5 }} key={el.id}>
            <Text style={{}}>{el.name}</Text>
         </View>
         <FontAwesome
            name="info-circle"
            size={20}
            color="black"
            onPress={() => {
               setShowInfo(!showInfo);
            }}
         />
         {showInfo && el.info && (
            <View style={styles.infoBlock}>
               <Text style={styles.infoBlockText}>{el.info}</Text>
            </View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   infoBlock: {
      position: "absolute",
      // height: 50,
      width: 130,
      backgroundColor: "white",
      top: 23,
      right: 23,
      zIndex: 5,
      padding: 5,
      borderWidth: 1,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
   },
   infoBlockText: {
      fontSize: 10,
   },
});

export default FilterItem;
