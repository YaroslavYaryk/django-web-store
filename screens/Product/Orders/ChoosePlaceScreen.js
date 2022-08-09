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
   TextInput,
   SafeAreaView,
   VirtualizedList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { useState, useEffect } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { useSelector, useDispatch } from "react-redux";
import * as novaPoshtaAction from "../../../redux-folder/actions/novaPoshtaActions";
import * as orderActions from "../../../redux-folder/actions/orderActions";
import * as authActions from "../../../redux-folder/actions/userActions";

const re = /\(.*?\)/;

const ChoosePlaceScreen = (props) => {
   const data = ["Київ", "Львів", "Харків", "Рівне", "Одеса", "Луцьк"];
   const [defaultDataQuery, setDefaultDataQuery] = useState(true);
   const [query, setQuery] = useState();
   const cities = useSelector((elem) => elem.cities.cities);
   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;

   const redirectToDelivery = props.route.params.redirectToDelivery
      ? props.route.params.redirectToDelivery
      : props.route.params.params.redirectToDelivery;

   const dispatch = useDispatch();

   const changeTextHandler = (text) => {
      setQuery(text);
      if (text) {
         setDefaultDataQuery(false);
         dispatch(novaPoshtaAction.fetchNovaPoshCities(text));
      } else {
         setDefaultDataQuery(true);
      }
   };

   return (
      <View style={styles.container}>
         <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <TextInput
               {...props}
               onChangeText={(text) => {
                  changeTextHandler(text);
               }}
               style={styles.input}
            />
            {/* <AntDesign name="search1" size={24} color="black" /> */}
            <View style={styles.TextFieldCommentLabelOnBorderText}>
               <Text style={styles.labelOnBorder}>Виберіть ваце місто</Text>
            </View>
         </View>
         <SafeAreaView style={{ marginTop: 10, height: "100%" }}>
            <VirtualizedList
               // style={{ height: "100%" }}
               getItemCount={(data) => data.length}
               keyExtractor={(item) =>
                  item.Area
                     ? item.Area + item.Ref + Math.random()
                     : item + Math.random()
               }
               getItem={(data, index) => data[index]}
               initialNumToRender={10}
               data={cities && !defaultDataQuery ? cities : data}
               renderItem={(itemData) => (
                  <TouchableOpacity
                     key={itemData.item.Area + itemData.item.Ref}
                     onPress={() => {
                        if (cities.length && !defaultDataQuery) {
                           dispatch(
                              orderActions.addPlaceToOrder(
                                 cartId,
                                 itemData.item.CityID,
                                 itemData.item.Description.split(" ")[0]
                              )
                           );
                           dispatch(
                              authActions.changeUserLivingPlace(
                                 1,
                                 itemData.item.Description.split(" ")[0]
                              )
                           );
                        } else {
                           dispatch(
                              orderActions.addPlaceToOrder(
                                 cartId,
                                 -1,
                                 itemData.item
                              )
                           );
                           dispatch(
                              authActions.changeUserLivingPlace(
                                 1,
                                 itemData.item
                              )
                           );
                        }

                        if (redirectToDelivery) {
                           props.navigation.navigate("DeliveryScreen", {
                              params: { cartId: cartId },
                           });
                        } else {
                           props.navigation.navigate("OrderBase", {
                              params: { cartId: cartId },
                           });
                        }
                     }}
                  >
                     <View
                        key={itemData.item.Area + itemData.item.Ref}
                        style={{
                           marginHorizontal: 20,
                           marginVertical: 10,
                           // height: 160,
                           // padding: 10,
                           // borderColor: "grey",
                           // borderRadius: 10,
                        }}
                     >
                        {cities.length && !defaultDataQuery ? (
                           <View style={{}}>
                              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                 {itemData.item.Description.split(" ")[0]}
                              </Text>
                              <Text style={{ fontSize: 13 }}>
                                 {itemData.item.AreaDescription} обл.{" "}
                                 {re.exec(itemData.item.Description)}
                              </Text>
                           </View>
                        ) : (
                           <Text style={{ fontSize: 16, fontWeight: "500" }}>
                              {itemData.item}
                           </Text>
                        )}
                     </View>
                  </TouchableOpacity>
               )}
            />
         </SafeAreaView>
         <View>
            <Text>here</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderColor: Colors.primaryColor,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderRadius: 5,
      position: "relative",
      height: 50,
   },

   TextFieldCommentLabelOnBorderText: {
      position: "absolute",
      top: -10,
      left: 10,
      zIndex: 5,
   },
   labelOnBorder: {
      backgroundColor: "#F2F4F6",
      paddingHorizontal: 7,
      color: Colors.primaryColor,
   },
});

export default ChoosePlaceScreen;
