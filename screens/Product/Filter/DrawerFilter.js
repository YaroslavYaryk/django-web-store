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
   SafeAreaView,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FilterDropDownItem from "../../../components/Filter/FilterDropDownItem";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getValue } from "../../../constants/dictMethods";
import FilterPriceBlock from "../../../components/Filter/FilterPriceBlock";

const DrawerFilter = (props) => {
   const filterOptions = useSelector((state) => state.filter);
   const [selectedBrands, setSelectedBrands] = useState(
      filterOptions.brands.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "brand",
      }))
   );

   const minValue = 2700;
   const maxValue = 99999;

   const [selectedOptions, setSelectedOptions] = useState([]);
   const [price, setPrice] = useState([minValue, maxValue]);

   const optionDict = [
      { type: "brand", value: selectedBrands, set: setSelectedBrands },
   ];

   useEffect(() => {
      // console.log(selectedOptions);
      return () => {};
   }, [selectedBrands, selectedOptions, selectFilterOption]);

   const selectFilterOption = (elements) => {
      setSelectedOptions([...elements]);
   };

   const setOptions = (elements) => {
      setSelectedBrands([...elements]);
   };

   const unSelectOption = (id, type) => {
      const selection = getValue(optionDict, type);
      const index = selection.value.findIndex((el) => el.id == id);
      var newItem = selection.value[index];
      newItem.selected = 0;
      selection[index] = newItem;
      selection.set([...selection.value]);
   };

   const setDefaultPrice = () => {
      setPrice([minValue, maxValue]);
   };

   const cancelFilterOption = (id, type) => {
      const newSelectedOptions = selectedOptions.filter(
         (el) => el.type == type && el.id != id
      );
      setSelectedOptions([...newSelectedOptions]);

      if (type == "priceBlock") {
         console.log("here");
         setDefaultPrice();
      } else {
         unSelectOption(id, type);
      }
   };

   return (
      <View
         style={{
            alignItems: "flex-end",
            padding: 15,
            width: props.width,
            flex: 1,
            backgroundColor: "#D9D9D9",
            overflow: "hidden",
         }}
      >
         <View style={{ width: 200 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
               <View>
                  <Ionicons
                     name="arrow-back-sharp"
                     size={24}
                     color="grey"
                     onPress={() => {
                        props.closeSideBar();
                     }}
                  />
               </View>
               <View style={{ marginLeft: 15 }}>
                  <View>
                     <Text style={styles.HeaderFilterText}>Фільтр</Text>
                     <Text style={styles.HeaderFilterTextSecond}>
                        Знайдено {props.resultCount} товарів
                     </Text>
                  </View>
               </View>
            </View>
            <View
               style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  marginTop: 5,
               }}
            >
               {selectedOptions.map((el) => (
                  <View
                     key={el.id}
                     style={{
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        marginVertical: 3,
                        padding: 3,
                        borderRadius: 10,
                        paddingHorizontal: 8,
                     }}
                  >
                     <Text>{el.name}</Text>
                     <View style={{ marginLeft: 5 }}>
                        <FontAwesome5
                           name="times-circle"
                           size={15}
                           color="black"
                           onPress={() => {
                              console.log(`delete ${el.name}`);
                              cancelFilterOption(el.id, el.type);
                           }}
                        />
                     </View>
                  </View>
               ))}
            </View>
            <View style={{ height: "100%" }}>
               <ScrollView>
                  <FilterDropDownItem
                     title={"Бренд:"}
                     query={selectedBrands}
                     setOptions={setOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterPriceBlock
                     title={"Ціна:"}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                     price={price}
                     setPrice={setPrice}
                  />
               </ScrollView>
               {/* <FilterDropDownItem query={{}} /> */}
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   HeaderFilterText: {
      fontSize: 16,
      fontWeight: "600",
   },
   HeaderFilterTextSecond: {
      fontSize: 12,
   },
});

export default DrawerFilter;
