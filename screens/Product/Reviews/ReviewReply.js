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
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from "../../../redux-folder/actions/productReviewsActions";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const ReviewReply = (props) => {
   const [wordCountComment, setWordComment] = useState(0);
   const [fullName, setFullName] = useState("Ярослав Диханов");
   const [comment, setComment] = useState("");
   const { width } = useWindowDimensions();
   const { commentId, productId } = props.route.params;
   const dispatch = useDispatch();
   const email = "duhanov2003@gmail.com";
   const [isLoading, setIsLoading] = useState(false);

   const handleAddReply = () => {
      setIsLoading(true);

      dispatch(
         reviewActions.createReviewReply(
            productId,
            commentId,
            comment,
            fullName,
            email
         )
      );
      setIsLoading(false);
      props.navigation.navigate("ProductReviewsList", {
         productId: productId,
         commentId: commentId,
         openReplies: true,
      });
   };

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <ScrollView>
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
                  //   onChangeText={(value) => setComment(value)}
                  initialValue=""
                  login={true}
                  height={80}
                  placeholder="Коментар"
                  setWordsCount={setWordComment}
                  setComment={setComment}
                  maxLength={2000}
               />
               <View style={styles.wordCount}>
                  <Text>{wordCountComment}/2000</Text>
               </View>
            </View>

            <View
               style={[styles.TextFieldCommentLabelOnBorder, { marginTop: 40 }]}
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
                  //   onInputChange={inputChangeHandler}
                  initialValue={fullName}
                  setFullName={setFullName}
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
                        handleAddReply();
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
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
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
      marginTop: 10,
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

export default ReviewReply;
