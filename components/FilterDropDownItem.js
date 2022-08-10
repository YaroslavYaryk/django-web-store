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
import { toggleAnimation } from "../constants/animation";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const a = [
   { name: 1 },
   { name: 2 },
   { name: 3 },
   { name: 4 },
   { name: 5 },
   { name: 6 },
   { name: 8 },
];

const FilterDropDownItem = (props) => {
   const [showContent, setShowContent] = useState(true);
   const [selectedItems, setSelectedItems] = useState(
      props.query.map((el) => ({ id: el.id, selected: el.selected }))
   );

   console.log(selectedItems);

   const animationController = useRef(new Animated.Value(0)).current;

   const toggleListItem = () => {
      const config = {
         duration: 300,
         toValue: showContent ? 0 : 1,
         useNativeDriver: true,
      };
      Animated.timing(animationController, config).start();
      LayoutAnimation.configureNext(toggleAnimation);
      setShowContent(!showContent);
   };

   const arrowTransform = animationController.interpolate({
      inputRange: [0, 1],
      outputRange: ["360deg", "180deg"],
   });

   const selectProductOption = (id) => {
      var queryToChange = props.query;
      const findIndex = queryToChange.findIndex((el) => el.id === id);
      var elemToChange = queryToChange[findIndex];
      elemToChange.selected = elemToChange.selected ? 0 : 1;
      queryToChange[findIndex] = elemToChange;
      props.setOptions(queryToChange);
   };

   return (
      <View
         style={{
            marginTop: 10,
            padding: 5,
            borderWidth: 0.5,
            borderRadius: 10,
            overflow: "hidden",
         }}
      >
         <TouchableOpacity
            onPress={() => {
               toggleListItem();
            }}
         >
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 5,
               }}
            >
               <Text>{props.title}</Text>
               <Animated.View
                  style={{ transform: [{ rotate: arrowTransform }] }}
               >
                  <AntDesign name="down" size={24} color="black" />
               </Animated.View>
            </View>
            <Animated.View
               style={{
                  transform: [{ translateY: animationController }],
               }}
            >
               {showContent && (
                  <View style={{ overflow: "hidden" }}>
                     {props.query &&
                        props.query.map((el) => (
                           <View
                              style={{
                                 flexDirection: "row",
                                 marginVertical: 5,
                                 alignItems: "center",
                                 justifyContent: "space-between",
                                 paddingHorizontal: 10,
                              }}
                           >
                              <FontAwesome
                                 name={
                                    selectedItems[el.id - 1].selected
                                       ? "check-square-o"
                                       : "square-o"
                                 }
                                 size={24}
                                 color={Colors.primaryColor}
                                 onPress={() => {
                                    selectProductOption(el.id);
                                    var selectedTochange = selectedItems;
                                    var item = selectedTochange[el.id - 1];
                                    item.selected = item.selected ? 0 : 1;
                                    selectedTochange[el.id - 1] = item;
                                    setSelectedItems(selectedTochange);
                                    console.log(selectedItems, 2);
                                 }}
                              />

                              <View style={{ padding: 5 }} key={el.id}>
                                 <Text style={{}}>{el.name}</Text>
                              </View>
                              <FontAwesome
                                 name="info-circle"
                                 size={20}
                                 color="black"
                              />
                           </View>
                        ))}
                     {/* <ScrollView>
                        {a.map((el) => (
                           <View key={el.name}>
                              <Text>{el.name}</Text>
                           </View>
                        ))}
                     </ScrollView> */}
                  </View>
               )}
            </Animated.View>
         </TouchableOpacity>
      </View>
   );
};

export default FilterDropDownItem;
