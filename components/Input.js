import React, { useReducer, useEffect, useState } from "react";
import {
   View,
   Text,
   TextInput,
   StyleSheet,
   TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
   switch (action.type) {
      case INPUT_CHANGE:
         return {
            ...state,
            value: action.value,
            isValid: action.isValid,
         };
      case INPUT_BLUR:
         return {
            ...state,
            touched: true,
         };
      default:
         return state;
   }
};

const Input = (props) => {
   const [error, setError] = useState(props.errorText);
   const [hiddenText, setHiddenText] = useState(props.secureTextEntry);
   const [hideUnhideTextIcon, setHideUnhideTextIcon] = useState("eye-off");

   const [inputState, dispatch] = useReducer(inputReducer, {
      value: props.initialValue ? props.initialValue : "",
      isValid: props.initiallyValid,
      touched: false,
   });
   const { onInputChange, id } = props;

   useEffect(() => {
      if (inputState.touched) {
         onInputChange(id, inputState.value, inputState.isValid);
      }
   }, [inputState, onInputChange, id]);

   const textChangeHandler = (text) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = true;
      if (props.required && text.trim().length === 0) {
         isValid = false;
      }
      if (props.email && !emailRegex.test(text.toLowerCase())) {
         isValid = false;
      }
      const phoneRegex = /^\+?[1-9][0-9]{7,14}$/;
      if (props.id == "phone" && !phoneRegex.test(text.toLowerCase())) {
         setError(`Invalid phone number`);
         isValid = false;
      }
      if (!props.login) {
         if (props.minLength != null && text.length < props.minLength) {
            setError(`length is lower then ${props.minLength}`);
            isValid = false;
         }
         if (id === "password" && !/^[A-Za-z0-9]*$/.test(text)) {
            setError("only letters and numbers");
            isValid = false;
         }
      }
      console.log(text.length);

      dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
   };

   const lostFocusHandler = () => {
      dispatch({ type: INPUT_BLUR });
   };

   const reveal1Password = () => {
      setHiddenText(!hiddenText);
      if (hideUnhideTextIcon == "eye-off") {
         setHideUnhideTextIcon("eye");
      } else {
         setHideUnhideTextIcon("eye-off");
      }
   };

   return (
      <View style={styles.formControl}>
         <TextInput
            {...props}
            secureTextEntry={hiddenText}
            style={styles.input}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
            placeholder={props.placeholder}
         />
         {["password", "confirmPassword"].includes(id) && (
            <TouchableOpacity
               style={styles.inputPasswordSee}
               onPress={reveal1Password}
            >
               <Ionicons name={hideUnhideTextIcon} size={24} color="grey" />
            </TouchableOpacity>
         )}
         {props.dontMatchError && inputState.touched && (
            <View style={styles.errorContainer}>
               <Text style={styles.errorText}>{props.dontMatchError}</Text>
            </View>
         )}
         {!inputState.isValid && inputState.touched && error && (
            <View style={styles.errorContainer}>
               <Text style={styles.errorText}>{error}</Text>
            </View>
         )}
         {!inputState.isValid &&
            inputState.touched &&
            !error &&
            !props.dontMatchError && (
               <View style={styles.errorContainerLine}></View>
            )}
      </View>
   );
};

const styles = StyleSheet.create({
   formControl: {
      width: "100%",
      height: 75,
   },
   label: {
      fontFamily: "Roboto",
      marginVertical: 8,
   },
   input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderColor: "#ccc",
      paddingHorizontal: 10,
      borderWidth: 2,
      borderRadius: 5,
      position: "relative",
      height: 50,
   },
   inputPasswordSee: {
      position: "absolute",
      top: 13,
      right: 10,
   },
   errorContainer: {
      marginVertical: 5,
   },
   errorContainerLine: {
      borderWidth: 1,
      borderColor: "red",
   },
   errorText: {
      fontFamily: "Roboto",
      color: "red",
      fontSize: 13,
      marginTop: -5,
   },
});

export default Input;
