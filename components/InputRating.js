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

const InputRating = (props) => {
   const [error, setError] = useState(props.errorText);
   const [hiddenText, setHiddenText] = useState(props.secureTextEntry);
   const [hideUnhideTextIcon, setHideUnhideTextIcon] = useState("eye-off");

   const [inputState, dispatch] = useReducer(inputReducer, {
      value: props.initialValue ? props.initialValue : "",
      isValid: props.initiallyValid,
      touched: false,
   });
   const { onInputChange, id } = props;

   if (onInputChange) {
      useEffect(() => {
         if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
         }
      }, [inputState, onInputChange, id]);
   }

   const textChangeHandler = (text) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = true;
      if (props.required && text.trim().length === 0) {
         isValid = false;
      }
      if (props.email && !emailRegex.test(text.toLowerCase())) {
         isValid = false;
      }
      if (props.setWordsCount) {
         props.setWordsCount(text.length);
      }
      if (props.setText) {
         props.setText(text);
      }
      if (props.id == "coupon") {
         if (text.indexOf(" ") >= 0) {
            isValid = false;
            setError("Невірний купон");
         } else {
            isValid = true;
         }
      }

      dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
   };

   const lostFocusHandler = (word) => {
      if (!word) {
         dispatch({ type: INPUT_BLUR });
      }
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
            secureTextEntry={hiddenText}
            style={[
               styles.input,
               {
                  height: props.height,
                  textAlignVertical: props.alignTop ? "top" : "center",
               },
            ]}
            {...props}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={() => {
               lostFocusHandler(inputState.value);
            }}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            multiline={true}
            editable={!props.disabled}
         />

         {!inputState.isValid && inputState.touched && error && (
            <View style={styles.errorContainer}>
               <Text style={styles.errorText}>{error}</Text>
            </View>
         )}
         {!inputState.isValid &&
            inputState.touched &&
            !error &&
            props.required && (
               <View
                  style={[
                     styles.errorContainerLine,
                     {
                        marginLeft: props.ml ? props.ml : 0,
                        width: props.wdt ? props.wdt : "100%",
                     },
                  ]}
               ></View>
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
      borderRadius: 10,
      position: "relative",
      height: 50,
      marginHorizontal: 10,
   },
   inputPasswordSee: {
      position: "absolute",
      top: 13,
      right: 10,
   },
   errorContainer: {
      marginVertical: 5,
      marginHorizontal: 10,
      marginTop: 10,
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

export default InputRating;
