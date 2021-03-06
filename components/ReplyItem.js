import React, { useState } from "react";
import {
   View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   TouchableNativeFeedback,
   Platform,
   Button,
   Animated,
   Modal,
   FlatList,
   ScrollView,
} from "react-native";
import monthDict from "../constants/DateMonth";
import RatingItem from "./RatingItem";
import { AntDesign } from "@expo/vector-icons";

const ModalPoup = ({ visible, children }) => {
   const [showModal, setShowModal] = useState(visible);
   const scaleValue = React.useRef(new Animated.Value(0)).current;
   React.useEffect(() => {
      toggleModal();
   }, [visible]);
   const toggleModal = () => {
      if (visible) {
         setShowModal(true);
         Animated.spring(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
         }).start();
      } else {
         setTimeout(() => setShowModal(false), 200);
         Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
         }).start();
      }
   };
   return (
      <Modal transparent visible={showModal}>
         <View style={styles.modalBackGround}>
            <Animated.View
               style={[
                  styles.modalContainer,
                  { transform: [{ scale: scaleValue }] },
               ]}
            >
               {children}
            </Animated.View>
         </View>
      </Modal>
   );
};

const ReplyItem = (props) => {
   const [visible, setVisible] = React.useState(false);
   const [imagePreview, setImagePreview] = useState(null);
   const [repliesVisible, setRepliesVisible] = useState(false);
   const [likeImage, setLikeImage] = useState("hearto");
   const [commentLikes, setCommentLikes] = useState(props.item.likesCount);

   const getPrettyDate = (date) => {
      const day = date.getDay();
      const month = monthDict[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
   };

   return (
      <View style={styles.container}>
         <View style={styles.containerInner}>
            <View style={styles.headerBlock}>
               <View style={styles.headerTop}>
                  <View style={styles.headerNameDate}>
                     <Text style={styles.userName}>
                        {props.item.user.firstName}
                     </Text>
                     <Text style={styles.reviewDate}>
                        {getPrettyDate(new Date(props.item.date))}
                     </Text>
                  </View>
               </View>
               <View style={styles.HeaderBottom}>
                  <View style={styles.sellerRating}></View>
               </View>
            </View>
            <View style={styles.bodyBlock}>
               <View style={styles.bodyBlockInner}>
                  <View style={styles.commentBlock}>
                     <Text style={styles.commentText}>
                        {props.item.comment}
                     </Text>
                  </View>
               </View>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 10,
      marginVertical: 10,
      paddingVertical: 10, // height: 300,
      // borderWidth: 1,
   },
   containerInner: {},
   headerBlock: {
      marginTop: 5,
   },
   headerTop: {
      alignItems: "center",
   },
   headerNameDate: {
      flexDirection: "row",
      width: "93%",
      justifyContent: "space-between",
   },
   userName: {
      fontWeight: "700",
   },
   reviewDate: {
      color: "grey",
      fontSize: 12,
   },
   HeaderBottom: {
      alignItems: "center",
      marginTop: 10,
   },
   sellerRating: {
      flexDirection: "row",
      width: "93%",
      justifyContent: "space-between",
   },

   productSeller: {
      flexDirection: "row",
      marginTop: 5,
   },
   bodyBlock: {
      alignItems: "center",
   },
   bodyBlockInner: {
      width: "93%",
   },
   commentText: {
      fontSize: 15,
   },
   prosBlock: {
      flexDirection: "row",
      marginTop: 15,
   },
   prosText: { width: "100%" },
   consBlock: {
      marginTop: 10,
      flexDirection: "row",
   },
   consText: { width: "100%" },
   footerBlock: {
      marginTop: 10,
      borderTopWidth: 0.5,
      borderColor: "grey",
      position: "relative",
      paddingTop: 5,
      paddingBottom: 17,
   },
   footerInner: {
      position: "absolute",
      right: 5,
      top: 7,
   },
   commentImages: {
      marginLeft: 10,
      marginTop: 10,
   },
   image: {
      width: 107,
      height: 70,
      marginLeft: 5,
   },
   modalBackGround: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
   },
   modalContainer: {
      width: "80%",
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
   },
   header: {
      width: "100%",
      height: 40,
      alignItems: "flex-end",
      justifyContent: "center",
   },
   repliesBlock: {
      marginTop: 14,
      borderTopWidth: 0.5,
      borderColor: "grey",
      paddingTop: 5,
   },
   repliesLabelBlock: {
      alignItems: "center",
      marginBottom: -5,
   },
   repliesLabelText: {
      fontSize: 15,
      fontWeight: "700",
   },
});

export default ReplyItem;
