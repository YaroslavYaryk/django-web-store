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
   const [comment, setComment] = useState("");
   const { width } = useWindowDimensions();
   const { commentId, productId } = props.route.params;
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [pickedImage, setPickedImage] = useState();

   const onImageTakeHandler = (imageUri) => {
      setPickedImage(imageUri);
   };

   const [ratingStars, setRatingStars] = useState(0);
   const [ratingMark, setRatingMark] = useState("Оцініть товар");

   const handleAddReply = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(
            reviewActions.createReviewReply(
               productId,
               commentId,
               comment,
               pickedImage,
               ratingStars
            )
         );
      } catch (error) {
         console.log(error.message);
         setError(error.message);
      }
      setIsLoading(false);
      props.navigation.navigate("ProductReviewsList", {
         productId: productId,
         commentId: commentId,
         openReplies: true,
      });
   });

   useEffect(() => {
      if (ratingStars == 0) {
         setRatingMark("Оцініть товар");
      } else {
         setRatingMark(RATING_MARKS[ratingStars]);
      }
   }, [ratingStars]);

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   if (error) {
      return (
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button
               title="Try Again"
               onPress={handleAddReply}
               color={Colors.primaryColor}
            />
         </View>
      );
   }

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
                  //   onChangeText={(value) => setComment(value)}
                  initialValue=""
                  login={true}
                  height={80}
                  placeholder="Коментар"
                  setWordsCount={setWordComment}
                  setText={setComment}
                  maxLength={2000}
               />
               <View style={styles.wordCount}>
                  <Text>{wordCountComment}/2000</Text>
               </View>
            </View>
            <View style={[styles.imagePicker, { marginBottom: 15 }]}>
               <ImgPicker
                  onImageTaken={onImageTakeHandler}
                  imageUri={pickedImage}
               />
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
      marginBottom: 50,
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
