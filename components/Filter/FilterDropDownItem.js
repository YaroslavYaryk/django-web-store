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
import FilterItem from "./FIlterItem";

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

   const [itemChange, setItemChange] = useState();
   const [change, setChange] = useState(null);

   useEffect(() => {
      var queryToChange = props.query;
      const findIndex = queryToChange.findIndex((el) => el.id === itemChange);
      var elemToChange = queryToChange[findIndex];
      if (elemToChange) {
         elemToChange.selected = elemToChange.selected ? 0 : 1;

         queryToChange[findIndex] = elemToChange;
         props.setOptions(queryToChange);

         var newSelected;
         if (elemToChange.selected == 1) {
            newSelected = props.selectedOptions;
            newSelected.push(elemToChange);
         } else {
            newSelected = props.selectedOptions.filter(
               (elem) => elem.id !== elemToChange.id
            );
         }

         props.setSelectedOptions(newSelected);
      }
   }, [itemChange, change]);

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
      setItemChange(id);
      setChange(Math.random());
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
         </TouchableOpacity>
         <Animated.View
            style={{
               transform: [{ translateY: animationController }],
            }}
         >
            {showContent && (
               <View style={{ overflow: "hidden" }}>
                  {props.query &&
                     props.query.map((el) => (
                        <FilterItem
                           key={el.id + Math.random()}
                           el={el}
                           selectProductOption={selectProductOption}
                        />
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
      </View>
   );
};

export default FilterDropDownItem;
