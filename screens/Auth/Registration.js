import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
   View,
   ActivityIndicator,
   StyleSheet,
   Text,
   TouchableOpacity,
   ScrollView,
   Alert,
   Button,
} from "react-native";
import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";

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

const Registration = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [diabledButton, setDisabledButton] = useState(true);

   const dispatch = useDispatch();

   useEffect(() => {
      console.log(error);
      if (error) {
         Alert.alert("An Error Occured", error, [
            { text: "Okay", onPress: setError(null) },
         ]);
      }
   }, [error]);

   useEffect(() => {
      if (formState.formIsValid) {
         console.log("here");
         setDisabledButton(false);
      } else {
         setDisabledButton(true);
      }
   });

   const authHandler = async () => {
      setError(null);
      let action;

      action = authActions.login(
         formState.inputValues.email,
         formState.inputValues.password
      );
      setIsLoading(true);
      try {
         await dispatch(action);
         // props.navigation.navigate("Shop");
      } catch (err) {
         setError(err.message);
         setIsLoading(false);
      }
   };

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         email: "",
         password: "",
      },
      inputValidities: {
         email: false,
         password: false,
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

   const redirectToRegistration = () => {
      props.navigation.navigate("Registration");
   };

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
         </View>
      );
   }

   return (
      <View>
         <View style={styles.titleBlockOuter}></View>
         <View style={styles.inputWrapper}>
            <ScrollView style={styles.inputBlock}>
               <Input
                  id="firstName"
                  label="First Name"
                  keyboardType="email-address"
                  secureTextEntry={false}
                  required
                  firstName
                  autoCapitalize="none"
                  // errorText="Please enter a valid first name address."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  placeholder="Прізвище"
               />
               <Input
                  id="lastName"
                  label="Last Name"
                  keyboardType="email-address"
                  secureTextEntry={false}
                  required
                  lastName
                  autoCapitalize="none"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  placeholder="Ім'я"
               />
               <Input
                  id="phone"
                  label="Phone"
                  keyboardType="numeric"
                  secureTextEntry={false}
                  required
                  lastName
                  autoCapitalize="none"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  placeholder="Phone"
               />
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
                  initialValue=""
                  login={true}
                  placeholder="Електронна пошта"
               />
               <Input
                  id="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry={true}
                  required
                  password
                  minLength={8}
                  autoCapitalize="none"
                  errorText="Please enter a valid password."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  login={true}
                  placeholder="Пароль"
               />
               <View style={styles.passwordRequirementsBlock}>
                  <Text style={styles.passwordRequirementsText}>
                     Пароль повинен містити не менше ніж 6 символів, містити
                     цифри ш великі літери
                  </Text>
               </View>
               <View style={styles.buttonContainer}>
                  {/* {isLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.primaryColor}
                            />
                        ) : ( */}
                  <Button
                     title="Зареєструватися"
                     color={Colors.primaryColor}
                     onPress={authHandler}
                     disabled={diabledButton}
                  />
               </View>
            </ScrollView>
         </View>
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Авторизація",
   };
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   container: {
      height: 300,
      width: 300,
      backgroundColor: "white",
      borderRadius: 30,
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 50,
   },
   titleBlockOuter: {
      alignItems: "center",
   },
   titleBlock: {
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "85%",
   },
   titleText: {
      fontSize: 20,
      fontFamily: "sans-serif",
      fontWeight: "600",
   },
   titleBlockRegLink: {
      flexDirection: "row",
   },
   titleBlockRegLinkText: {
      marginRight: 5,
   },
   titleBlockRegLinkLinkText: {
      color: "#7988FF",
   },
   inputWrapper: {
      alignItems: "center",
      marginVertical: 30,
   },
   inputBlock: {
      width: "85%",
   },
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   forgotPassword: {
      marginVertical: 20,
      alignItems: "center",
   },
   forgotPasswordText: {
      fontSize: 18,
      fontWeight: "700",
      color: Colors.primaryColor,
   },
   passwordRequirementsBlock: {
      marginTop: -5,
      marginBottom: 20,
   },
   passwordRequirementsText: {
      color: "grey",
      fontWeight: "600",
   },
});

export default Registration;
