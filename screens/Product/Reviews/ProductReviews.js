import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
   TextInput,
} from "react-native";
import React, { useState, useEffect, useCallback, useReducer } from "react";
import RATING_MARKS from "../../../constants/ratingMark";
import RatingStars from "../../../components/RatingStars";
import InputRating from "../../../components/InputRating";
import ImgPicker from "../../../components/ImagePicker";
import Colors from "../../../constants/Colors";
import { useWindowDimensions } from "react-native";

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

const ProductReviews = (props) => {
   const [ratingStars, setRatingStars] = useState(0);
   const [ratingMark, setRatingMark] = useState("Оцініть товар");
   const [pickedImage, setPickedImage] = useState();
   const [wordCountComment, setWordComment] = useState(0);
   const [wordCountPros, setWordPros] = useState(0);
   const [wordCountCons, setWordCons] = useState(0);
   const [fullName, setFullName] = useState("Ярослав Диханов");

   const onImageTakeHandler = (imageUri) => {
      setPickedImage(imageUri);
   };

   const { width } = useWindowDimensions();

   const email = "duhanov2003@gmail.com";

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         comment: "",
         pros: "",
         cons: "",
      },
      inputValidities: {
         comment: false,
         pros: false,
         cons: false,
      },
      formIsValid: false,
   });

   useEffect(() => {
      if (ratingStars == 0) {
         setRatingMark("Оцініть товар");
      } else {
         setRatingMark(RATING_MARKS[ratingStars]);
      }
   }, [ratingStars]);

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
   const productId = props.route.params;

   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={styles.ratingBlock}>
               <RatingStars setRatingStars={setRatingStars} />
               <View style={styles.ratingTitle}>
                  <Text style={styles.ratingTitleText}>{ratingMark}</Text>
               </View>
            </View>
            <View style={styles.TextFieldComment}>
               <InputRating
                  id="comment"
                  label="Comment"
                  keyboardType="default"
                  comment
                  alignTop
                  minLength={8}
                  autoCapitalize="none"
                  errorText="Please enter a valid comment."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  login={true}
                  height={80}
                  placeholder="Коментар"
                  setWordsCount={setWordComment}
                  maxLength={2000}
               />
               <View style={styles.wordCount}>
                  <Text>{wordCountComment}/2000</Text>
               </View>
            </View>
            <View style={[styles.TextFieldCommentLittle, { marginTop: 50 }]}>
               <InputRating
                  id="pros"
                  label="pros"
                  keyboardType="default"
                  minLength={8}
                  pros
                  alignTop
                  required
                  autoCapitalize="none"
                  errorText="Будь ласка введіть переваги"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  login={true}
                  height={50}
                  placeholder="Переваги"
                  setWordsCount={setWordPros}
                  maxLength={200}
               />
               <View style={styles.wordCountLittle}>
                  <Text>{wordCountPros}/200</Text>
               </View>
            </View>
            <View style={[styles.TextFieldCommentLittle, { marginTop: 20 }]}>
               <InputRating
                  id="cons"
                  label="cons"
                  keyboardType="default"
                  minLength={8}
                  cons
                  alignTop
                  required
                  autoCapitalize="none"
                  errorText="Будь ласка введіть недоліки"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  login={true}
                  height={50}
                  placeholder="Недоліки"
                  setWordsCount={setWordCons}
                  maxLength={200}
               />
               <View style={styles.wordCountLittle}>
                  <Text>{wordCountCons}/200</Text>
               </View>
            </View>
            <View style={styles.imagePicker}></View>
            <ImgPicker
               onImageTaken={onImageTakeHandler}
               imageUri={pickedImage}
            />
            <View
               style={[styles.TextFieldCommentLabelOnBorder, { marginTop: 10 }]}
            >
               <InputRating
                  id="fullName"
                  label="Full Name"
                  keyboardType="default"
                  minLength={8}
                  pros
                  required
                  autoCapitalize="none"
                  errorText="Будь ласка введіть Ім'я та прізвище"
                  onInputChange={inputChangeHandler}
                  initialValue={fullName}
                  login={true}
                  height={50}
               />
               <View style={styles.TextFieldCommentLabelOnBorderText}>
                  <Text style={styles.labelOnBorder}>Ім'я та прізвище</Text>
               </View>
            </View>
            <View
               style={[styles.TextFieldCommentLabelOnBorder, { marginTop: 10 }]}
            >
               <InputRating
                  id="email"
                  label="Email"
                  keyboardType="default"
                  minLength={8}
                  pros
                  required
                  autoCapitalize="none"
                  errorText="Будь ласка введіть Email"
                  onInputChange={inputChangeHandler}
                  initialValue={email}
                  disabled={true}
                  login={true}
                  height={50}
               />
               <View style={styles.TextFieldCommentLabelOnBorderText}>
                  <Text style={styles.labelOnBorder}>Email</Text>
               </View>
            </View>
            <View
               style={[
                  styles.saveCommentBlock,
                  { width: width - 26, marginLeft: 13 },
               ]}
            >
               <View
                  style={[
                     styles.buttonStyle,
                     { backgroundColor: Colors.primary },
                  ]}
               >
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("ProductReviewsList", {
                           productId: id,
                        });
                     }}
                  >
                     <Text style={[styles.saveCommentText]}>Відгуки</Text>
                  </TouchableOpacity>
               </View>
               <View style={styles.buttonStyle}>
                  <TouchableOpacity
                     onPress={() => {
                        console.log("sent");
                     }}
                  >
                     <Text style={styles.saveCommentText}>Відправити</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   ratingBlock: {
      marginVertical: 20,
   },
   ratingTitle: {
      alignItems: "center",
      marginTop: 10,
   },
   ratingTitleText: {
      fontSize: 18,
   },
   TextFieldComment: {
      position: "relative",
   },
   TextFieldCommentLittle: {
      position: "relative",
   },
   wordCount: {
      position: "absolute",
      right: 10,
      bottom: -30,
   },
   wordCountLittle: {
      position: "absolute",
      right: 10,
      bottom: 0,
   },
   imagePicker: {
      // marginVertical: 10,
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
   saveCommentBlock: {
      marginTop: -10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   saveCommentText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
   },
   buttonStyle: {
      alignItems: "center",
      backgroundColor: Colors.primaryColor,
      width: "49%",
      paddingVertical: 10,
      borderRadius: 15,
   },
});

export default ProductReviews;
