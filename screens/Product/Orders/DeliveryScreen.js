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
} from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import Colors from "../../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useState } from "react";

const re = /.*:/;

const DeliveryScreen = (props) => {
   const [checked, setChecked] = useState("first");
   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;
   const userId = useSelector((state) => state.auth.userId);
   const user = useSelector((state) => state.auth.user);

   const data = [
      {
         label: "Кур'єрська Доставка",
      },
      {
         label: "Доставка до пункту видачі",
      },
   ];
   return (
      <View>
         <View style={{}}>
            <TouchableOpacity
               style={{}}
               onPress={() => {
                  props.navigation.navigate("ChoosePlaceScreen", {
                     params: { cartId: cartId, redirectToDelivery: true },
                  });
               }}
            >
               <View style={styles.PlaceBlock}>
                  <View
                     style={{
                        padding: 10,
                        paddingLeft: 0,
                        flexDirection: "row",
                        alignItems: "center",
                     }}
                  >
                     <MaterialIcons
                        // onPress={() => {
                        //    dispatch(
                        //       novaPoshtaAction.fetchNovaPoshCities(
                        //          "Володимир"
                        //       )
                        //    );
                        // }}
                        name="place"
                        size={30}
                        color="black"
                     />

                     <Text style={{ fontSize: 16, marginLeft: 5 }}>
                        Ваше місто
                        {user.livingPlace ? `: ${user.livingPlace}` : ""}
                     </Text>
                  </View>
                  <View style={styles.placeIconBlock}>
                     <AntDesign name="right" size={18} color="black" />
                  </View>
               </View>
            </TouchableOpacity>
         </View>
         <View
            style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }}
         >
            <RadioButtonRN
               initial={1}
               activeColor={Colors.primaryColor}
               circleSize={10}
               data={data}
               selectedBtn={(e) => console.log(e)}
            />
         </View>
         <View>
            <TouchableOpacity
               style={{}}
               onPress={() => {
                  props.navigation.navigate("ChooseWareHouse", {
                     params: { cartId: cartId },
                  });
               }}
            >
               <View style={styles.wareHouseBlock}>
                  <View
                     style={{
                        padding: 10,
                        paddingLeft: 0,
                        flexDirection: "row",
                        alignItems: "center",
                     }}
                  >
                     <MaterialCommunityIcons
                        name="map-marker-path"
                        size={30}
                        color="black"
                     />
                     <Text style={{ fontSize: 16, marginLeft: 10 }}>
                        Ваш пункт
                        {user.wareHouse
                           ? `:  ${re.exec(user.wareHouse)[0].slice(0, -1)}`
                           : ""}
                     </Text>
                  </View>
                  <View style={styles.placeIconBlock}>
                     <AntDesign name="right" size={18} color="black" />
                  </View>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },

   PlaceBlock: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      justifyContent: "space-between",
      marginHorizontal: 10,
      // backgroundColor: "",
      borderColor: "#B3B3B1",
      borderWidth: 2,
      paddingHorizontal: 10,
      width: "94%",
      borderRadius: 10,
   },
   wareHouseBlock: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      justifyContent: "space-between",
      marginHorizontal: 10,
      // backgroundColor: "",
      backgroundColor: "#D3D3D3",
      paddingHorizontal: 10,
      width: "94%",
      borderRadius: 10,
   },
   TextFieldCommentLabelOnBorder: {
      position: "relative",
   },
   TextFieldCommentLabelOnBorderText: {
      position: "absolute",
      top: -10,
      left: 20,
      zIndex: 5,
   },
   labelOnBorder: {
      backgroundColor: "#F2F4F6",
      paddingHorizontal: 7,
      color: "grey",
   },
   buttonOrderBlock: {
      width: "95%",
      alignItems: "center",
      padding: 10,
      borderRadius: 20,
   },
   orderItem: {
      color: "white",
      fontWeight: "500",
   },
});

export default DeliveryScreen;
