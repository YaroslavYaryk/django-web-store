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
} from "react-native";
import InputRating from "../../../components/InputRating";
import Colors from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../../redux-folder/actions/userActions";
import * as orderActions from "../../../redux-folder/actions/orderActions";
import { AntDesign } from "@expo/vector-icons";
import UserInfoForms from "../../../components/UserInfoForms";

const OrderFirst = (props) => {
   const [buttonDisabled, setButtonDisabled] = useState(true);

   const userId = useSelector((state) => state.auth.userId);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(authActions.fetchUserInfo(userId));
   }, []);

   const user = useSelector((state) => state.auth.user);

   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;
   const order = useSelector((state) =>
      state.orders.orders.find((elem) => elem.cartId === cartId)
   );

   const [inpSurName, setInpSurName] = useState(user.lastName);
   const [inpName, setInpName] = useState(user.firstName);
   const [inpMiddleName, setInpMiddleName] = useState(user.middleName);
   const [inpPhone, setinpPhone] = useState(user.phone);

   const validateForm = () => {
      if (
         Boolean(
            user.livingPlace &&
               inpSurName &&
               inpName &&
               inpMiddleName &&
               inpPhone
         )
      ) {
         return true;
      }
   };

   useEffect(() => {
      if (validateForm()) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [user.livingPlace, inpMiddleName, inpName, inpPhone, inpSurName]);

   return (
      <View>
         <ScrollView>
            <View style={StyleSheet.comtainerInner}>
               <TouchableOpacity
                  style={{}}
                  onPress={() => {
                     props.navigation.navigate("ChoosePlaceScreen", {
                        params: { cartId: cartId },
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

                        <Text style={{ fontSize: 16 }}>
                           Ваше місто
                           {user.livingPlace ? `: ${user.livingPlace}` : ""}
                        </Text>
                     </View>
                     <View style={styles.placeIconBlock}>
                        <AntDesign name="right" size={18} color="black" />
                     </View>
                  </View>
               </TouchableOpacity>
               <UserInfoForms
                  inpSurName={inpSurName}
                  setInpSurName={setInpSurName}
                  inpName={inpName}
                  setInpName={setInpName}
                  inpMiddleName={inpMiddleName}
                  setInpMiddleName={setInpMiddleName}
                  inpPhone={inpPhone}
                  setinpPhone={setinpPhone}
                  cartId={cartId}
                  dispatch={dispatch}
                  user={user}
                  order={order}
                  saveMyself
               />
               <View style={{ alignItems: "center" }}>
                  <View
                     style={[
                        styles.buttonOrderBlock,
                        {
                           backgroundColor: buttonDisabled
                              ? "grey"
                              : Colors.primaryColor,
                        },
                     ]}
                  >
                     <TouchableOpacity
                        disabled={buttonDisabled}
                        onPress={() => {
                           dispatch(
                              authActions.changeUserInfo(
                                 userId,
                                 inpName,
                                 inpSurName,
                                 inpMiddleName,
                                 inpPhone,
                                 order.place
                              )
                           );

                           dispatch(
                              orderActions.addRecieverInfo(
                                 cartId,
                                 inpSurName,
                                 inpName,
                                 inpMiddleName,
                                 inpPhone
                              )
                           );

                           props.navigation.navigate("OrderFull", {
                              params: { cartId: cartId },
                           });
                        }}
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                     >
                        <Text style={styles.orderItem}>
                           Оформити замовлення
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   container: {
      flex: 1,
   },
   placeIconBlock: {
      marginTop: 4,
      //   position: "absolute",
      //   top: 0,
      //   right: 10,
   },
   PlaceBlock: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginBottom: 20,
      // backgroundColor: "",
      borderColor: "#B3B3B1",
      borderWidth: 2,
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

export default OrderFirst;
