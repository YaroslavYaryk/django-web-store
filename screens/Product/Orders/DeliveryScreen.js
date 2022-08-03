import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
   FlatList,
   TextInput,
} from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import Colors from "../../../constants/Colors";

import { useState } from "react";

const DeliveryScreen = (props) => {
   const [checked, setChecked] = useState("first");
   const data = [
      {
         label: "data 1",
      },
      {
         label: "data 2",
      },
   ];
   return (
      <View>
         <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <TextInput
               {...props}
               onChangeText={(text) => {
                  {
                  }
               }}
               style={styles.input}
            />
            {/* <AntDesign name="search1" size={24} color="black" /> */}
            <View style={styles.TextFieldCommentLabelOnBorderText}>
               <Text style={styles.labelOnBorder}>Виберіть ваце місто</Text>
            </View>
         </View>
         <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
      </View>
   );
};

const styles = StyleSheet.create({
   input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderColor: Colors.primaryColor,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderRadius: 5,
      position: "relative",
      height: 50,
   },

   TextFieldCommentLabelOnBorderText: {
      position: "absolute",
      top: -10,
      left: 10,
      zIndex: 5,
   },
   labelOnBorder: {
      backgroundColor: "#F2F4F6",
      paddingHorizontal: 7,
      color: Colors.primaryColor,
   },
});

export default DeliveryScreen;
