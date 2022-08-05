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
} from "react-native";
import Colors from "../constants/Colors";

const ButtonSave = (props) => {
   return (
      <View style={styles.wrapper}>
         <TouchableOpacity style={{ width: "100%" }} onPress={props.save}>
            <View style={styles.buttonTextContainer}>
               <Text style={styles.buttonText}>Вибрати</Text>
            </View>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   wrapper: {
      marginTop: 30,
      marginHorizontal: 10,
   },
   buttonTextContainer: {
      backgroundColor: Colors.primaryColor,
      width: "100%",
      borderWidth: 1,
      alignItems: "center",
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "white",
   },
   buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
   },
});

export default ButtonSave;
