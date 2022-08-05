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

const ChangeUserOrderInfo = (props) => {
   const [buttonDisabled, setButtonDisabled] = useState(true);

   const userId = useSelector((state) => state.auth.userId);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(authActions.fetchUserInfo(userId));
   }, []);

   const user = useSelector((state) => state.auth.user);
   // console.log(user);

   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;
   const order = useSelector((state) =>
      state.orders.orders.find((elem) => elem.cartId === cartId)
   );

   const [inpSurName, setInpSurName] = useState(
      order.recieverLastName ? order.recieverLastName : user.lastName
   );
   const [inpName, setInpName] = useState(
      order.recieverFirstName ? order.recieverFirstName : user.firstName
   );
   const [inpMiddleName, setInpMiddleName] = useState(
      order.recieverMiddleName ? order.recieverMiddleName : user.middleName
   );
   const [inpPhone, setinpPhone] = useState(
      order.recieverPhone ? order.recieverPhone : user.phone
   );

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
      <View style={{ marginTop: 10 }}>
         <ScrollView>
            <View style={[styles.comtainerInner, { marginTop: 10 }]}>
               <View style={styles.LastName}>
                  <InputRating
                     id="lastName"
                     label="last name"
                     keyboardType="default"
                     minLength={2}
                     //  alignTop
                     required
                     autoCapitalize="none"
                     //  errorText="Будь ласка введіть прізвище"
                     value={inpSurName}
                     initialValue={inpSurName}
                     login={true}
                     height={50}
                     placeholder="Прізвище"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={setInpSurName}
                  />
                  <View style={styles.TextFieldCommentLabelOnBorderText}>
                     <Text style={styles.labelOnBorder}>Прізвище</Text>
                  </View>
               </View>
               <View style={styles.firstName}>
                  <InputRating
                     id="firstName"
                     label="first name"
                     keyboardType="default"
                     minLength={2}
                     //  alignTop
                     required
                     autoCapitalize="none"
                     //  errorText="Будь ласка введіть ім'я"
                     initialValue={inpName}
                     login={true}
                     height={50}
                     placeholder="Ім'я"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={setInpName}
                  />
                  <View style={styles.TextFieldCommentLabelOnBorderText}>
                     <Text style={styles.labelOnBorder}>Ім'я</Text>
                  </View>
               </View>
               <View style={styles.middleName}>
                  <InputRating
                     id="middleName"
                     label="middle name"
                     keyboardType="default"
                     minLength={2}
                     //  alignTop
                     required
                     autoCapitalize="none"
                     //  errorText="Будь ласка введіть по батькові"
                     initialValue={inpMiddleName}
                     login={true}
                     height={50}
                     placeholder="По батькові"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={setInpMiddleName}
                  />
                  <View style={styles.TextFieldCommentLabelOnBorderText}>
                     <Text style={styles.labelOnBorder}>По батькові</Text>
                  </View>
               </View>
               <View style={styles.phone}>
                  <InputRating
                     id="phone"
                     label="phone"
                     keyboardType="default"
                     minLength={2}
                     //  alignTop
                     required
                     autoCapitalize="none"
                     //  errorText="Будь ласка введіть по номер талефону"
                     initialValue={inpPhone}
                     login={true}
                     height={50}
                     placeholder="Номер телефону"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={setinpPhone}
                  />
                  <View style={styles.TextFieldCommentLabelOnBorderText}>
                     <Text style={styles.labelOnBorder}>Номер телефону</Text>
                  </View>
               </View>
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
                        <Text style={styles.orderItem}>Зберегти</Text>
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
      borderRadius: 10,
   },
   orderItem: {
      color: "white",
      fontWeight: "500",
      fontSize: 18,
   },
});

export default ChangeUserOrderInfo;
