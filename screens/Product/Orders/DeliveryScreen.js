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
import deliveryType from "../../../constants/deliveryType";
import * as orderActions from "../../../redux-folder/actions/orderActions";
import * as authActions from "../../../redux-folder/actions/userActions";
import { useIsFocused } from "@react-navigation/native";
import ButtonSave from "../../../components/ButtonSave";
import { useState, useEffect } from "react";

const re = /.*:/;

const DeliveryScreen = (props) => {
   const [checked, setChecked] = useState("first");
   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;
   const userId = useSelector((state) => state.auth.userId);
   const user = useSelector((state) => state.user.user);
   const order = useSelector((state) =>
      state.orders.orders.find((elem) => elem.cartId === cartId)
   );
   const dispatch = useDispatch();

   const data = [
      {
         label: "Кур'єрська Доставка",
      },
      {
         label: "Доставка до пункту видачі",
      },
   ];

   const isFocused = useIsFocused();

   useEffect(() => {
      if (user.deliveryType) {
         dispatch(orderActions.addDeliveryType(cartId, user.deliveryType));
      }
   }, [isFocused]);

   var delType;
   if (user.deliveryType) {
      delType = deliveryType[user.deliveryType];
   } else if (order.deliveryType) {
      delType = deliveryType[order.deliveryType];
   } else {
      delType = 1;
   }

   const saveDeliveryData = () => {
      props.navigation.navigate("OrderFull", { params: { cartId: cartId } });
   };

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
               initial={delType}
               activeColor={Colors.primaryColor}
               circleSize={10}
               data={data}
               selectedBtn={(e) => {
                  console.log(e);
                  dispatch(orderActions.addDeliveryType(cartId, e.label));
                  dispatch(authActions.changeUserDeliveryType(e.label));
               }}
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
                        {console.log(
                           user,
                           re.exec(user.wareHouse).slice(0, -1)
                        )}
                        Ваш пункт
                        {user.wareHouse && user.wareHouse.length > 2
                           ? `:  ${user.wareHouse}`
                           : user.wareHouse
                           ? user.wareHouse
                           : ""}
                     </Text>
                  </View>
                  <View style={styles.placeIconBlock}>
                     <AntDesign name="right" size={18} color="black" />
                  </View>
               </View>
            </TouchableOpacity>
         </View>
         <ButtonSave save={saveDeliveryData} />
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
