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
import { Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

const DrawerFilter = (props) => {
   const filterOptions = useSelector((state) => state.filter);
   const [selectedBrands, setSelectedBrands] = useState(
      filterOptions.brands.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "brand",
         info: elem.info,
      }))
   );
   const [selectedProcessors, setSelectedProcessors] = useState(
      filterOptions.processors.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "processor",
         info: elem.info,
      }))
   );
   const [selectedRams, setSelectedRams] = useState(
      filterOptions.rams.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "ram",
         info: elem.info,
      }))
   );

   const [selectedHardDrive, setSelectedHardDrive] = useState(
      filterOptions.handDrives.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "hardDrive",
         info: elem.info,
      }))
   );
   const [selectedMemortTypes, setSelectedMemoryTypes] = useState(
      filterOptions.memoryTypes.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "memoryType",
         info: elem.info,
      }))
   );

   const [selectedMemortSlots, setSelectedMemorySlots] = useState(
      filterOptions.memorySlots.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "memorySlots",
         info: elem.info,
      }))
   );

   const [selectedOperSystem, setSelectedOperSystem] = useState(
      filterOptions.operatSystems.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "operatSystems",
         info: elem.info,
      }))
   );

   const [selectedScreenDiagonal, setSelectedScreenDiagonal] = useState(
      filterOptions.screenDiagonals.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "screenDiagonals",
         info: elem.info,
      }))
   );

   const [selectedScreenTypes, setSelectedScreenTypes] = useState(
      filterOptions.screenTypes.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "screenTypes",
         info: elem.info,
      }))
   );

   const [selectedVideoCards, setSelectedVideoCards] = useState(
      filterOptions.videoCards.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "videoCards",
         info: elem.info,
      }))
   );

   const [selectedVideoMemories, setSelectedVideoMemories] = useState(
      filterOptions.videoMemories.map((elem) => ({
         id: elem.id,
         name: elem.name,
         selected: 0,
         type: "videoMemories",
         info: elem.info,
      }))
   );

   const minValue = 2700;
   const maxValue = 99999;

   const [selectedOptions, setSelectedOptions] = useState([]);
   const [price, setPrice] = useState([minValue, maxValue]);

   const optionDict = [
      { type: "brand", value: selectedBrands, set: setSelectedBrands },
      {
         type: "processor",
         value: selectedProcessors,
         set: setSelectedProcessors,
      },
      { type: "ram", value: selectedRams, set: setSelectedRams },
      {
         type: "hardDrive",
         value: selectedHardDrive,
         set: setSelectedHardDrive,
      },
      {
         type: "memoryType",
         value: selectedMemortTypes,
         set: setSelectedMemoryTypes,
      },
      {
         type: "memorySlots",
         value: selectedMemortSlots,
         set: setSelectedMemorySlots,
      },
      {
         type: "operatSystems",
         value: selectedOperSystem,
         set: setSelectedOperSystem,
      },
      {
         type: "screenDiagonals",
         value: selectedScreenDiagonal,
         set: setSelectedScreenDiagonal,
      },
      {
         type: "screenTypes",
         value: selectedScreenTypes,
         set: setSelectedScreenTypes,
      },
      {
         type: "videoCards",
         value: selectedVideoCards,
         set: setSelectedVideoCards,
      },
      {
         type: "videoMemories",
         value: selectedVideoMemories,
         set: setSelectedVideoMemories,
      },
   ];

   useEffect(() => {
      // console.log(selectedOptions);
      return () => {};
   }, [selectedBrands, selectedOptions, selectFilterOption]);

   const selectFilterOption = (elements) => {
      setSelectedOptions([...elements]);
   };

   const setBrandsOptions = (elements) => {
      setSelectedBrands([...elements]);
   };

   const setProcessorsOptions = (elements) => {
      setSelectedProcessors([...elements]);
   };

   const setRamOptions = (elements) => {
      setSelectedRams([...elements]);
   };

   const setHardDriveOptions = (elements) => {
      setSelectedHardDrive([...elements]);
   };

   const setMemoryTypeOptions = (elements) => {
      setSelectedMemoryTypes([...elements]);
   };

   const setMemorySlotsOptions = (elements) => {
      setSelectedMemorySlots([...elements]);
   };

   const setOperSystemOptions = (elements) => {
      setSelectedOperSystem([...elements]);
   };

   const setScreenDiagonalOptions = (elements) => {
      setSelectedScreenDiagonal([...elements]);
   };

   const setScreenTypesOptions = (elements) => {
      setSelectedScreenTypes([...elements]);
   };

   const setVideoCardsOptions = (elements) => {
      setSelectedVideoCards([...elements]);
   };
   const setVideoMemoryOptions = (elements) => {
      setSelectedVideoMemories([...elements]);
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

   const cancelFilterOption = (id, type, superNode = false) => {
      if (!superNode) {
         const newSelectedOptions = selectedOptions.filter(
            (el) => el.type == type && el.id != id
         );
         setSelectedOptions([...newSelectedOptions]);
      }

      if (type == "priceBlock") {
         setDefaultPrice();
      } else {
         unSelectOption(id, type);
      }
   };

   const cancelAllOptions = () => {
      for (let index = 0; index < selectedOptions.length; index++) {
         cancelFilterOption(
            selectedOptions[index].id,
            selectedOptions[index].type,
            true
         );
         setSelectedOptions([]);
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
         <View style={{ width: 250 }}>
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
               <View style={{ marginLeft: 10 }}>
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
            <ScrollView>
               <View
                  style={
                     {
                        // height: Dimensions.get("window").height * 4,
                     }
                  }
               >
                  <FilterDropDownItem
                     title={"Бренд:"}
                     query={selectedBrands}
                     setOptions={setBrandsOptions}
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
                  <FilterDropDownItem
                     title={"Процесор:"}
                     query={selectedProcessors}
                     setOptions={setProcessorsOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Оперативна пам'ять:"}
                     query={selectedRams}
                     setOptions={setRamOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Кількість слотів оперативної пам'яті:"}
                     query={selectedMemortSlots}
                     setOptions={setMemorySlotsOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Постійна пам'ять:"}
                     query={selectedHardDrive}
                     setOptions={setHardDriveOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Тип пам'яті:"}
                     query={selectedMemortTypes}
                     setOptions={setMemoryTypeOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Операційна система:"}
                     query={selectedOperSystem}
                     setOptions={setOperSystemOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Діагональ екрану:"}
                     query={selectedScreenDiagonal}
                     setOptions={setScreenDiagonalOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Тип екрану:"}
                     query={selectedScreenTypes}
                     setOptions={setScreenTypesOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Відео карта:"}
                     query={selectedVideoCards}
                     setOptions={setVideoCardsOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Відео пам'ять:"}
                     query={selectedVideoMemories}
                     setOptions={setVideoMemoryOptions}
                     selectedOptions={selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <View style={{ height: 40 }}></View>
                  {/* <FilterDropDownItem query={{}} /> */}
               </View>
            </ScrollView>
         </View>
         {/* <View
            style={[
               {
                  zIndex: 100,
                  width: 280,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 0.5,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#F0F0F0",
               },
               styles.positionInBottom,
            ]}
         >
            <View style={styles.bottomButtonBlock}>
               <TouchableOpacity
                  onPress={() => {
                     cancelAllOptions();
                  }}
               >
                  <Text style={styles.bottomButtonText}>Скинути</Text>
               </TouchableOpacity>
            </View>
            <Text>|</Text>
            <View style={styles.bottomButtonBlock}>
               <TouchableOpacity>
                  <Text style={styles.bottomButtonText}>Застосувати</Text>
               </TouchableOpacity>
            </View>
         </View> */}
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
   positionInBottom: {
      position: "absolute",
      // width: 50,
      // left: -15,
      height: 50,
      bottom: 0,
      zIndex: 100,
   },
   bottomButtonBlock: {},
   bottomButtonText: {
      color: Colors.primaryColor,
      fontSize: 16,
      fontWeight: "600",
   },
});

export default DrawerFilter;
