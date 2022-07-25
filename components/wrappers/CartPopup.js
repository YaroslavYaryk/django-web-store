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
   Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

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

const CartPopup = (props) => {
   const { visible, setVisible } = props;
   return (
      <View style={{ backgroundColor: "green", marginTop: 50 }}>
         <ModalPoup visible={visible}>
            <View style={{ alignItems: "center" }}>
               <AntDesign
                  name="checkcircleo"
                  size={100}
                  color={Colors.primaryColor}
               />
               <View style={styles.header}>
                  <TouchableOpacity
                     onPress={() => {
                        setVisible(false);
                     }}
                  >
                     <AntDesign
                        name="closecircle"
                        size={30}
                        color={Colors.danger}
                     />
                  </TouchableOpacity>
               </View>
            </View>
            <View style={{ alignItems: "center", marginTop: 15 }}>
               <Text style={{ fontSize: 16 }}>
                  Товар успішно додано в корзину
               </Text>
            </View>
         </ModalPoup>
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
      position: "absolute",
      right: 0,
      top: -20,
      width: "100%",
      height: 40,
      alignItems: "flex-end",
      justifyContent: "center",
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

export default CartPopup;
