import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback, useReducer } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../redux-folder/actions/userActions";
import * as authActions from "../../redux-folder/actions/authActions";
import UserInfoItem from "../../components/User/userInfoItem";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../../components/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
   if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
         ...state.inputValues,
         [action.input]: action.value,
      };
      const updatedValidities = {
         ...state.inputValidities,
         [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
         updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
         formIsValid: updatedFormIsValid,
         inputValidities: updatedValidities,
         inputValues: updatedValues,
      };
   }
   return state;
};

const EditProfile = (props) => {
   const [buttonDisabled, setButtonDisabled] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const user = useSelector((state) => state.user.user);

   const dispatch = useDispatch();

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         email: user.email ? user.email : "",
         firstName: user.firstName ? user.firstName : "",
         lastName: user.lastName ? user.lastName : "",
         middleName: user.middleName ? user.middleName : "",
         phone: user.phone ? user.phone : "",
      },
      inputValidities: {
         email: user.email ? true : false,
         firstName: user.firstName ? true : false,
         lastName: user.lastName ? true : false,
         middleName: user.middleName ? true : false,
         phone: user.phone ? true : false,
      },
      formIsValid: false,
   });

   const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
         dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
         });
      },
      [dispatchFormState]
   );

   useEffect(() => {
      if (
         formState.inputValidities.email &&
         formState.inputValidities.firstName &&
         formState.inputValidities.lastName &&
         formState.inputValidities.middleName &&
         formState.inputValidities.phone
      ) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [formState]);

   const submitHandler = useCallback(async () => {
      if (!formState.formIsValid) {
         Alert.alert("Wrong input!", "Please check the errors in the form.", [
            { text: "Okay" },
         ]);
         return;
      }
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(
            userActions.editUserBaseInfo(
               formState.inputValues.email,
               formState.inputValues.firstName,
               formState.inputValues.lastName,
               formState.inputValues.middleName,
               formState.inputValues.phone
            )
         );
         props.navigation.goBack();
      } catch (err) {
         console.log(err.message);
         setError(err.message);
      }
      setIsLoading(false);
   });

   if (error) {
      return (
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button title="Try Again" color={Colors.primaryColor} />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   return (
      <View>
         <ScrollView>
            <View style={{ margin: 10 }}>
               <Input
                  id="email"
                  label="E-Mail"
                  keyboardType="email-address"
                  required
                  secureTextEntry={false}
                  email
                  autoCapitalize="none"
                  errorText="Please enter a valid email address."
                  onInputChange={inputChangeHandler}
                  initialValue={user.email}
                  //   value={user.email}
                  login={true}
                  placeholder="Електронна пошта"
               />
               <Input
                  id="firstName"
                  label="FirstNmae"
                  keyboardType="default"
                  secureTextEntry={false}
                  required
                  password
                  minLength={8}
                  autoCapitalize="none"
                  onInputChange={inputChangeHandler}
                  initialValue={user.firstName}
                  login={true}
                  placeholder="Ім'я"
               />
               <Input
                  id="lastName"
                  label="LastName"
                  keyboardType="default"
                  secureTextEntry={false}
                  required
                  password
                  minLength={8}
                  autoCapitalize="none"
                  onInputChange={inputChangeHandler}
                  initialValue={user.lastName}
                  login={true}
                  placeholder="Прізвище"
               />
               <Input
                  id="middleName"
                  label="MiddleName"
                  keyboardType="default"
                  secureTextEntry={false}
                  required
                  password
                  minLength={8}
                  autoCapitalize="none"
                  onInputChange={inputChangeHandler}
                  initialValue={user.middleName}
                  login={true}
                  placeholder="По-батькові"
               />
               <Input
                  id="phone"
                  label="Phone"
                  keyboardType="numeric"
                  secureTextEntry={false}
                  required
                  password
                  minLength={8}
                  autoCapitalize="none"
                  onInputChange={inputChangeHandler}
                  initialValue={user.phone}
                  login={true}
                  placeholder="Номер телефону"
               />
            </View>
            <View
               style={{
                  borderWidth: 3,
                  padding: 10,
                  borderColor: "#CCCCCC",
                  borderRadius: 10,
               }}
            >
               <TouchableOpacity
                  disabled={buttonDisabled ? true : false}
                  onPress={() => {
                     submitHandler();
                  }}
               >
                  <View style={{ alignItems: "center" }}>
                     <Text
                        style={{
                           fontSize: 18,
                           fontWeight: "500",
                           color: buttonDisabled ? "grey" : Colors.primaryColor,
                        }}
                     >
                        Зберегти
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Редагування",

      //   headerRight: () => (
      //      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      //         <Item
      //            title="done"
      //            color={"white"}
      //            iconName="done"
      //            icon={MaterialIcons}
      //            onPress={() => {
      //               navData.navigation.navigate("EditProfile");
      //            }}
      //         />
      //      </HeaderButtons>
      //   ),
   };
};

const styles = StyleSheet.create({
   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
});

export default EditProfile;
