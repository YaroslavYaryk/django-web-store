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
import ReplyItem from "./ReplyItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
   const properComment = props.item.id == props.commentId;
   const [repliesVisible, setRepliesVisible] = useState(
      properComment && props.openReplies ? true : false
   );

   const getPrettyDate = (date) => {
      const newDate =
         date.getFullYear() +
         "-" +
         (date.getMonth() + 1) +
         "-" +
         date.getDate();
      var splittedData = newDate.split("-");

      const day = splittedData[2];
      const month = monthDict[splittedData[1]];
      const year = splittedData[0];
      return `${day} ${month} ${year}`;
   };

   return (
      <View style={styles.container}>
         <View style={styles.containerInner}>
            <View style={styles.headerBlock}>
               <View style={styles.headerTop}>
                  <View style={styles.headerNameDate}>
                     <Text style={styles.userName}>
                        {props.item.user.firstName} {props.item.user.lastName}
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

            {props.item.photos && (
               <View style={styles.commentImages}>
                  <ScrollView scrollEnabled horizontal>
                     {props.item.photos.map((elem) => (
                        <View key={elem.id}>
                           <TouchableOpacity
                              onPress={() => {
                                 setVisible(true);
                                 {
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
                        props.replyToReview(
                           props.item.productId,
                           props.item.id
                        );
                     }}
                  >
                     <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <MaterialCommunityIcons
                           name="message-reply-text"
                           size={24}
                           color="black"
                        />
                     </View>
                  </TouchableOpacity>
                  {props.userReviews &&
                     props.userReviews.find(
                        (elem) => elem.id == props.item.id
                     ) && (
                        <View style={{}}>
                           <TouchableOpacity
                              onPress={() => {
                                 props.editComment(
                                    props.item.productId,
                                    props.item.id
                                 );
                              }}
                              style={{
                                 borderWidth: 0.5,
                                 paddingHorizontal: 15,
                                 paddingVertical: 3,
                                 borderRadius: 10,
                              }}
                           >
                              <Text style={{ fontWeight: "500" }}>edit</Text>
                           </TouchableOpacity>
                        </View>
                     )}

                  <TouchableOpacity
                     onPress={() => {
                        props.likeCommentHandle(props.item.id);
                     }}
                  >
                     <View style={{ flexDirection: "row" }}>
                        <AntDesign
                           name={
                              props.isAuth &&
                              props.commentLikes &&
                              props.commentLikes.length &&
                              props.commentLikes.find(
                                 (elem) => elem.post_comment == props.item.id
                              )
                                 ? "heart"
                                 : "hearto"
                           }
                           size={24}
                           color="red"
                        />
                        <Text style={{ marginLeft: 5 }}>
                           {props.item.likesCount}
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </View>

         {props.item.replies.length > 0 && (
            <View style={styles.repliesBlock}>
               <View style={styles.repliesInner}>
                  {!repliesVisible && (
                     <TouchableOpacity
                        onPress={() => setRepliesVisible(!repliesVisible)}
                     >
                        <View style={styles.repliesLabelBlock}>
                           <View style={styles.repliesLabelBlockInner}>
                              <Text style={styles.repliesLabelText}>
                                 {props.item.replies.length} replies
                              </Text>
                              <AntDesign
                                 name="caretdown"
                                 size={20}
                                 color="grey"
                              />
                           </View>
                        </View>
                     </TouchableOpacity>
                  )}
                  {repliesVisible && (
                     <View>
                        <FlatList
                           data={props.item.replies}
                           renderItem={(itemData) => (
                              <View
                                 style={{
                                    borderWidth: 0,
                                    shadowColor: "grey",
                                    shadowOpacity: 0.26,
                                    shadowOffset: { width: 2, height: 2 },
                                    shadowRadius: 8,
                                    elevation: 5,
                                 }}
                              >
                                 <ReplyItem
                                    item={itemData.item}
                                    isAuth={props.isAuth}
                                    commentLikes={props.commentLikes}
                                    likeCommentHandle={props.likeCommentHandle}
                                    userReviews={props.userReviews}
                                    editReply={props.editReply}
                                 />
                              </View>
                           )}
                           keyExtractor={(item) => Math.random()}
                        />
                        <View style={styles.repliesLabelBlock}>
                           <TouchableOpacity
                              onPress={() => setRepliesVisible(!repliesVisible)}
                           >
                              <View style={styles.repliesLabelBlockInner}>
                                 <Text style={styles.repliesLabelText}>
                                    {props.item.replies.length} replies
                                 </Text>
                                 <AntDesign
                                    name="caretup"
                                    size={20}
                                    color="grey"
                                 />
                              </View>
                           </TouchableOpacity>
                        </View>
                     </View>
                  )}
               </View>
            </View>
         )}
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
      // paddingBottom: 17,
      // borderWidth: 1,
      marginBottom: -12,
   },
   footerInner: {
      flexDirection: "row",
      justifyContent: "space-between",
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
      marginTop: -20,
   },
   repliesBlock: {
      marginTop: 5,
      borderColor: "grey",
      paddingTop: 5,
   },
   repliesLabelBlock: {
      marginTop: 10,
      alignItems: "center",
      marginBottom: -5,
   },
   repliesLabelBlockInner: {
      alignItems: "center",
      flexDirection: "row",
      width: "20%",
      justifyContent: "space-between",
   },
   repliesLabelText: {
      fontSize: 15,
      fontWeight: "700",
      marginLeft: -10,
   },
});

export default ReviewItem;
