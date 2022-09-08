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
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { TextInput } from "react-native-paper";

const a = [
   { name: 1 },
   { name: 2 },
   { name: 3 },
   { name: 4 },
   { name: 5 },
   { name: 6 },
   { name: 8 },
];

const FilterPriceBlock = (props) => {
   const [showContent, setShowContent] = useState(false);
   const animationController = useRef(new Animated.Value(0)).current;

   const minValue = 2700;
   const maxValue = 99999;

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

   const multiSliderValuesChange = (values) => {
      props.setPrice(values);
      addNewOption();
   };

   const addNewOption = (prices) => {
      var selectedOptions = props.selectedOptions;
      const existedElemIndex = selectedOptions.findIndex(
         (el) => el.id == "priceBlock"
      );
      if (existedElemIndex == -1) {
         selectedOptions.push({
            id: "priceBlock",
            name: `від ${prices[0]} до ${prices[1]}`,
            slug: `${prices[0] - 1}-${prices[1] + 1}`,
            type: "priceBlock",
         });
      } else {
         var newElem = selectedOptions[existedElemIndex];
         newElem.name = `від ${prices[0]} до ${prices[1]}`;
         newElem.slug = `${prices[0] - 1}-${prices[1] + 1}`;
         selectedOptions[existedElemIndex] = newElem;
      }
      props.setPrice(prices);
      props.setSelectedOptions([...selectedOptions]);
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
                  <View style={{ height: 100 }}>
                     <View
                        style={{
                           marginTop: 5,
                           flexDirection: "row",
                           justifyContent: "space-between",
                           marginHorizontal: 5,
                        }}
                     >
                        {/* <TextInput
                           keyboardType="numeric"
                           defaultValue={fromValue.toString()}
                           style={[
                              styles.input,
                              {
                                 height: props.height,
                                 textAlignVertical: props.alignTop
                                    ? "top"
                                    : "center",
                              },
                           ]}
                           {...props}
                           value={fromValue}
                           onChangeText={(value) => setToValue(value)}
                           maxLength={5}
                        /> */}
                        <View style={{ width: 85 }}>
                           <TextInput
                              label={"Від"}
                              keyboardType="numeric"
                              style={{
                                 height: 40,
                                 fontSize: 15,
                              }}
                              defaultValue={String(props.price[0])}
                              mode="outlined"
                              value={String(props.price[0])}
                              onChangeText={(value) => {
                                 try {
                                    if (parseInt(value)) {
                                       var prices = [];
                                       if (parseInt(value) > props.price[1]) {
                                          if (parseInt(value) > maxValue) {
                                             props.setPrice([
                                                props.price[1],
                                                maxValue,
                                             ]);
                                             prices = [
                                                props.price[1],
                                                maxValue,
                                             ];
                                          } else {
                                             props.setPrice([
                                                props.price[1],
                                                parseInt(value),
                                             ]);
                                             prices = [
                                                props.price[1],
                                                parseInt(value),
                                             ];
                                          }
                                       } else {
                                          props.setPrice([
                                             parseInt(value),
                                             props.price[1],
                                          ]);
                                          prices = [
                                             parseInt(value),
                                             props.price[1],
                                          ];
                                       }
                                    } else {
                                       props.setPrice([0, props.price[1]]);
                                       prices = [0, props.price[1]];
                                    }
                                    addNewOption(prices);
                                 } catch (er) {
                                    console.log(er);
                                 }
                              }}
                              // label={"Search"}
                              // underlineColor="#F2F2F2"
                              activeOutlineColor="green"
                              // color="red"
                              // activeUnderlineColor="#F3F5F6"
                              selectionColor="black"
                              maxLength={5}
                           />
                           <View style={styles.hryvniaSymbolBlock}>
                              <Text style={{ fontSize: 16 }}> ₴ </Text>
                           </View>
                        </View>
                        <View style={{ width: 85 }}>
                           <TextInput
                              label={"До"}
                              keyboardType="numeric"
                              style={{ height: 40, fontSize: 15 }}
                              defaultValue={String(props.price[1])}
                              mode="outlined"
                              value={String(props.price[1])}
                              onChangeText={(value) => {
                                 try {
                                    var prices = [];
                                    if (parseInt(value)) {
                                       props.setPrice([
                                          props.price[0],
                                          parseInt(value),
                                       ]);
                                       prices = [
                                          props.price[0],
                                          parseInt(value),
                                       ];
                                    } else {
                                       props.setPrice([props.price[0], 0]);
                                       prices = [props.price[0], 0];
                                    }
                                    addNewOption(prices);
                                 } catch (error) {
                                    console.log(error);
                                 }
                              }}
                              // label={"Search"}
                              // underlineColor="#F2F2F2"
                              activeOutlineColor="green"
                              // color="red"
                              // activeUnderlineColor="#F3F5F6"
                              selectionColor="black"
                              maxLength={5}
                           />
                           <View style={styles.hryvniaSymbolBlock}>
                              <Text style={{ fontSize: 16 }}> ₴ </Text>
                           </View>
                        </View>
                     </View>
                     <View style={{ marginTop: 0, marginLeft: 20 }}>
                        <MultiSlider
                           values={props.price}
                           sliderLength={150}
                           onValuesChange={multiSliderValuesChange}
                           min={minValue}
                           max={maxValue}
                           step={1}
                        />
                     </View>
                  </View>
               </View>
            )}
         </Animated.View>
      </View>
   );
};

const styles = StyleSheet.create({
   formControl: {
      width: "100%",
      height: 75,
   },
   label: {
      fontFamily: "Roboto",
      marginVertical: 8,
   },
   input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderColor: "#ccc",
      paddingHorizontal: 10,
      borderWidth: 2,
      borderRadius: 10,
      position: "relative",
      height: 50,
      marginHorizontal: 10,
   },
   inputPasswordSee: {
      position: "absolute",
      top: 13,
      right: 10,
   },
   errorContainer: {
      marginVertical: 5,
      marginHorizontal: 10,
      marginTop: 10,
   },
   errorContainerLine: {
      borderWidth: 1,
      borderColor: "red",
   },
   errorText: {
      fontFamily: "Roboto",
      color: "red",
      fontSize: 13,
      marginTop: -5,
   },
   hryvniaSymbolBlock: {
      position: "absolute",
      top: 15,
      right: 5,
   },
});

export default FilterPriceBlock;
