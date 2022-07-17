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

const ReviewItem = (props) => {
   const [visible, setVisible] = React.useState(false);
   const [imagePreview, setImagePreview] = useState(null);

   const [likeImage, setLikeImage] = useState("hearto");
   const [commentLikes, setCommentLikes] = useState(props.item.likesCount);

   const getPrettyDate = (date) => {
      const day = date.getDay();
      const month = monthDict[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
   };

   const likeProduct = () => {
      if (likeImage == "hearto") {
         setLikeImage("heart");
         setCommentLikes(commentLikes + 1);
      } else {
         setLikeImage("hearto");
         setCommentLikes(commentLikes - 1);
      }
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
                  <View style={styles.sellerRating}>
                     <View style={styles.productSeller}>
                        <Text
                           style={{
                              fontSize: 11,
                              color: "grey",
                           }}
                        >
                           Продавець:
                        </Text>

                        <Text
                           style={{
                              fontWeight: "700",
                              marginLeft: 10,
                              fontSize: 11,
                           }}
                        >
                           Rozetka
                        </Text>
                     </View>
                     <View style={styles.reviewRating}>
                        <RatingItem
                           stars={props.item.rating}
                           nonSpace={true}
                           hideReview={true}
                        />
                     </View>
                  </View>
               </View>
            </View>
            <View style={styles.bodyBlock}>
               <View style={styles.bodyBlockInner}>
                  <View style={styles.commentBlock}>
                     <Text style={styles.commentText}>
                        {props.item.comment}
                     </Text>
                  </View>
                  <View style={styles.prosBlock}>
                     <Text style={styles.prosText}>
                        <Text style={{ fontWeight: "700" }}>Переваги: </Text>
                        {props.item.pros}
                     </Text>
                  </View>
                  <View style={styles.consBlock}>
                     <Text style={styles.consText}>
                        <Text style={{ fontWeight: "700" }}>Недоліки:</Text>{" "}
                        {props.item.cons}
                     </Text>
                  </View>
               </View>
            </View>
            {props.item.photos.length && (
               <View style={styles.commentImages}>
                  <ScrollView scrollEnabled horizontal>
                     {props.item.photos.map((elem) => (
                        <View key={elem.id}>
                           <TouchableOpacity
                              onPress={() => {
                                 setVisible(true);
                                 {
                                    console.log(elem.url, 1);
                                    setImagePreview(elem.url);
                                 }
                              }}
                           >
                              <Image
                                 key={elem.id}
                                 style={styles.image}
                                 source={{
                                    uri: elem.url,
                                 }}
                              />
                           </TouchableOpacity>
                           <View
                              style={{
                                 flex: 1,
                                 justifyContent: "center",
                                 alignItems: "center",
                              }}
                           >
                              {visible && (
                                 <ModalPoup visible={visible}>
                                    <View style={{ alignItems: "center" }}>
                                       <View style={styles.header}>
                                          <TouchableOpacity
                                             onPress={() => {
                                                setVisible(false);
                                                setImagePreview(null);
                                             }}
                                          >
                                             <AntDesign
                                                name="closecircle"
                                                size={30}
                                                color="red"
                                             />
                                          </TouchableOpacity>
                                       </View>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                       <Image
                                          source={{ uri: imagePreview }}
                                          style={{
                                             height: 250,
                                             width: 250,
                                             marginVertical: 10,
                                          }}
                                       />
                                    </View>
                                 </ModalPoup>
                              )}
                           </View>
                        </View>
                     ))}
                  </ScrollView>
               </View>
            )}
            <View style={styles.footerBlock}>
               <View style={styles.footerInner}>
                  <TouchableOpacity
                     onPress={() => {
                        likeProduct();
                     }}
                  >
                     <View style={{ flexDirection: "row" }}>
                        <AntDesign name={likeImage} size={24} color="red" />
                        <Text style={{ marginLeft: 5 }}>{commentLikes}</Text>
                     </View>
                  </TouchableOpacity>
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
   commentBlock: { marginTop: 15 },
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
});

export default ReviewItem;
