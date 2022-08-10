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
import FilterDropDownItem from "../../../components/FilterDropDownItem";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const DrawerFilter = (props) => {
   const filterOptions = useSelector((state) => state.filter);
   const [selectedBrands, setSelectedBrands] = useState(
      filterOptions.brands.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
      }))
   );

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
            <View style={{}}>
               <FilterDropDownItem
                  title={"Бренд:"}
                  query={selectedBrands}
                  setOptions={setSelectedBrands}
               />
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
