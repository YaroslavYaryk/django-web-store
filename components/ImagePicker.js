import React, { useState } from "react";

import {
   View,
   Button,
   Image,
   Text,
   StyleSheet,
   Alert,
   TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";

import Colors from "../constants/Colors";
const ImgPicker = (props) => {
   const verifyPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
         Alert.alert(
            "Insufficient permissions!",
            "You need to grant camera permissions to use this app.",
            [{ text: "Okay" }]
         );
         return false;
      }
      return true;
   };

   const { width } = useWindowDimensions();

   const takeImageHandler = async () => {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
         return;
      }
      const image = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         aspect: [16, 9],
         quality: 0.5,
      });

      props.onImageTaken(image.uri);
   };

   return (
      <View style={[styles.imagePicker, { width: width - 26, marginLeft: 13 }]}>
         <View style={styles.imagePickerInner}>
            <TouchableOpacity onPress={takeImageHandler}>
               <View style={styles.buttonPhoto}>
                  <Feather name="image" size={30} color={Colors.primaryColor} />
                  <Text style={styles.buttonPhotoText}>Фото</Text>
               </View>
            </TouchableOpacity>
            <View style={styles.imagePreview}>
               {props.imageUri ? (
                  <Image
                     source={{ uri: props.imageUri }}
                     style={styles.image}
                  />
               ) : (
                  <Text>No image picked</Text>
               )}
            </View>
         </View>
         {props.imageUri && (
            <View
               style={{
                  padding: 5,
                  marginBottom: 5,
                  alignItems: "flex-end",
                  marginRight: 20,
                  marginTop: -5,
               }}
            >
               <TouchableOpacity
                  onPress={() => {
                     props.onImageTaken(null);
                  }}
                  style={{ borderWidth: 0.5, padding: 5, borderRadius: 10 }}
               >
                  <Text style={{ fontSize: 15 }}>reset</Text>
               </TouchableOpacity>
            </View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   imagePicker: {
      // alignItems: "center",
      marginTop: 10,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 10,
   },
   imagePickerInner: {
      padding: 10,
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
   },
   imagePreview: {
      width: "40%",
      height: 75,
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
   },
   image: {
      width: "100%",
      height: "100%",
   },
   buttonPhoto: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 10,
   },
   buttonPhotoText: {
      color: Colors.primaryColor,
      fontSize: 20,
      marginLeft: 5,
   },
});

export default ImgPicker;
