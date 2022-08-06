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

import InputRating from "./InputRating";
import Colors from "../constants/Colors";
import { useState, useEffect, useReducer, useCallback } from "react";

const UserInfoForms = (props) => {
   const [buttonDisabled, setButtonDisabled] = useState(true);

   const dispatch = props.dispatch;

   const user = props.user;
   const order = props.order;

   const validateForm = () => {
      if (
         Boolean(
            props.user.livingPlace &&
               props.inpSurName &&
               props.inpName &&
               props.inpMiddleName &&
               props.inpPhone
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
   }, [
      user.livingPlace,
      props.inpMiddleName,
      props.inpName,
      props.inpPhone,
      props.inpSurName,
   ]);

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
                     initialValue={props.inpSurName}
                     login={true}
                     height={50}
                     placeholder="Прізвище"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={props.setInpSurName}
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
                     initialValue={props.inpName}
                     login={true}
                     height={50}
                     placeholder="Ім'я"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={props.setInpName}
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
                     initialValue={props.inpMiddleName}
                     login={true}
                     height={50}
                     placeholder="По батькові"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={props.setInpMiddleName}
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
                     initialValue={props.inpPhone}
                     login={true}
                     height={50}
                     placeholder="Номер телефону"
                     maxLength={200}
                     ml={20}
                     wdt={"90%"}
                     setText={props.setinpPhone}
                  />
                  <View style={styles.TextFieldCommentLabelOnBorderText}>
                     <Text style={styles.labelOnBorder}>Номер телефону</Text>
                  </View>
               </View>
               {!props.saveMyself && (
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
                              props.saveUserData();
                           }}
                           style={{
                              flexDirection: "row",
                              alignItems: "flex-end",
                           }}
                        >
                           <Text style={styles.orderItem}>Зберегти</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               )}
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

export default UserInfoForms;
