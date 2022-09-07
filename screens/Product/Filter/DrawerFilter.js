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
import { useState, useEffect, useCallback } from "react";
import { getValue } from "../../../constants/dictMethods";
import FilterPriceBlock from "../../../components/Filter/FilterPriceBlock";
import { Dimensions } from "react-native";
import Colors from "../../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import * as filterActions from "../../../redux-folder/actions/filterActions";

const DrawerFilter = (props) => {
   const [error, setError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();
   const isFocused = useIsFocused;

   const loadActions = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(filterActions.fetchBrands());
         await dispatch(filterActions.fetchHardDrive());
         await dispatch(filterActions.fetchMemorySlots());
         await dispatch(filterActions.fetchMemoryType());
         await dispatch(filterActions.fetchRam());
         await dispatch(filterActions.fetchOperSystem());
         await dispatch(filterActions.fetchProcessors());
         await dispatch(filterActions.fetchScreenDiagonals());
         await dispatch(filterActions.fetchScreenTypes());
         await dispatch(filterActions.fetchVideoCard());
         await dispatch(filterActions.fetchVideoMemory());
      } catch (err) {
         console.log(error);
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading]);

   useEffect(() => {
      loadActions();
   }, [dispatch, loadActions, isFocused]);

   const filterOptions = useSelector((state) => state.filter);
   const [selectedBrands, setSelectedBrands] = useState(
      filterOptions.brands.map((elem) => ({
         id: elem.id,
         name: elem.name,
         slug: elem.slug,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "product__brand",
         info: elem.info,
      }))
   );

   console.log(props.selectedOptions);

   const [selectedProcessors, setSelectedProcessors] = useState(
      filterOptions.processors.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "processor_name",
         info: elem.info,
      }))
   );
   const [selectedRams, setSelectedRams] = useState(
      filterOptions.rams.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "memory_capacity",
         info: elem.info,
      }))
   );

   const [selectedHardDrive, setSelectedHardDrive] = useState(
      filterOptions.hardDrives.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "data_storage",
         info: elem.info,
      }))
   );
   const [selectedMemortTypes, setSelectedMemoryTypes] = useState(
      filterOptions.memoryTypes.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "memory_type",
         info: elem.info,
      }))
   );

   const [selectedMemortSlots, setSelectedMemorySlots] = useState(
      filterOptions.memorySlots.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "memory_slots",
         info: elem.info,
      }))
   );

   const [selectedOperSystem, setSelectedOperSystem] = useState(
      filterOptions.operatSystems.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "operation_system",
         info: elem.info,
      }))
   );

   const [selectedScreenDiagonal, setSelectedScreenDiagonal] = useState(
      filterOptions.screenDiagonals.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "diagonal_screen",
         info: elem.info,
      }))
   );

   const [selectedScreenTypes, setSelectedScreenTypes] = useState(
      filterOptions.screenTypes.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "screen_type",
         info: elem.info,
      }))
   );

   const [selectedVideoCards, setSelectedVideoCards] = useState(
      filterOptions.videoCards.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "video_card",
         info: elem.info,
      }))
   );

   const [selectedVideoMemories, setSelectedVideoMemories] = useState(
      filterOptions.videoMemories.map((elem) => ({
         id: elem.id,
         slug: elem.slug,
         name: elem.name,
         selected: props.selectedOptions.find((el) => el.slug == elem.slug)
            ? 1
            : 0,
         type: "video_card_memory",
         info: elem.info,
      }))
   );

   const minValue = 2700;
   const maxValue = 99999;

   const [price, setPrice] = useState([minValue, maxValue]);

   const optionDict = [
      { type: "product__brand", value: selectedBrands, set: setSelectedBrands },
      {
         type: "processor_name",
         value: selectedProcessors,
         set: setSelectedProcessors,
      },
      { type: "memory_capacity", value: selectedRams, set: setSelectedRams },
      {
         type: "data_storage",
         value: selectedHardDrive,
         set: setSelectedHardDrive,
      },
      {
         type: "memory_type",
         value: selectedMemortTypes,
         set: setSelectedMemoryTypes,
      },
      {
         type: "memory_slots",
         value: selectedMemortSlots,
         set: setSelectedMemorySlots,
      },
      {
         type: "operation_system",
         value: selectedOperSystem,
         set: setSelectedOperSystem,
      },
      {
         type: "diagonal_screen",
         value: selectedScreenDiagonal,
         set: setSelectedScreenDiagonal,
      },
      {
         type: "screen_type",
         value: selectedScreenTypes,
         set: setSelectedScreenTypes,
      },
      {
         type: "video_card",
         value: selectedVideoCards,
         set: setSelectedVideoCards,
      },
      {
         type: "video_card_memory",
         value: selectedVideoMemories,
         set: setSelectedVideoMemories,
      },
   ];

   useEffect(() => {
      // console.log(selectedOptions);
      return () => {};
   }, [selectedBrands, props.selectedOptions, selectFilterOption]);

   const selectFilterOption = (elements) => {
      props.setSelectedOptions([...elements]);
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
         const index = props.selectedOptions.findIndex(
            (el) => el.type == type && el.id == id
         );
         const newSelectedOptions = props.selectedOptions;
         newSelectedOptions.splice(index, 1);
         props.setSelectedOptions([...newSelectedOptions]);
      }

      if (type == "priceBlock") {
         setDefaultPrice();
      } else {
         unSelectOption(id, type);
      }
   };

   const cancelAllOptions = () => {
      for (let index = 0; index < props.selectedOptions.length; index++) {
         cancelFilterOption(
            props.selectedOptions[index].id,
            props.selectedOptions[index].type,
            true
         );
         props.setSelectedOptions([]);
      }
   };

   if (error) {
      return (
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button
               title="Try Again"
               onPress={loadActions}
               color={Colors.primaryColor}
            />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View style={styles.right}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }
   if (!filterOptions) {
      return (
         <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
         >
            <Text>There are no products</Text>
         </View>
      );
   }

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
         <View style={{ width: 250, marginBottom: 50 }}>
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
               {props.selectedOptions.map((el) => (
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
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />

                  <FilterPriceBlock
                     title={"Ціна:"}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                     price={price}
                     setPrice={setPrice}
                  />
                  <FilterDropDownItem
                     title={"Процесор:"}
                     query={selectedProcessors}
                     setOptions={setProcessorsOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Оперативна пам'ять:"}
                     query={selectedRams}
                     setOptions={setRamOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Кількість слотів оперативної пам'яті:"}
                     query={selectedMemortSlots}
                     setOptions={setMemorySlotsOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Постійна пам'ять:"}
                     query={selectedHardDrive}
                     setOptions={setHardDriveOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Тип пам'яті:"}
                     query={selectedMemortTypes}
                     setOptions={setMemoryTypeOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Операційна система:"}
                     query={selectedOperSystem}
                     setOptions={setOperSystemOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Діагональ екрану:"}
                     query={selectedScreenDiagonal}
                     setOptions={setScreenDiagonalOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Тип екрану:"}
                     query={selectedScreenTypes}
                     setOptions={setScreenTypesOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Відео карта:"}
                     query={selectedVideoCards}
                     setOptions={setVideoCardsOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <FilterDropDownItem
                     title={"Відео пам'ять:"}
                     query={selectedVideoMemories}
                     setOptions={setVideoMemoryOptions}
                     selectedOptions={props.selectedOptions}
                     setSelectedOptions={selectFilterOption}
                  />
                  <View style={{ height: 40 }}></View>
                  {/* <FilterDropDownItem query={{}} /> */}
               </View>
            </ScrollView>
         </View>
         <View
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
               <TouchableOpacity
                  onPress={() => {
                     props.handleFilter();
                  }}
               >
                  <Text style={styles.bottomButtonText}>Застосувати</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   right: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",

      height: 300,
      width: 270,
   },
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
      marginTop: 50,
   },
   bottomButtonBlock: {},
   bottomButtonText: {
      color: Colors.primaryColor,
      fontSize: 16,
      fontWeight: "600",
   },
});

export default DrawerFilter;
