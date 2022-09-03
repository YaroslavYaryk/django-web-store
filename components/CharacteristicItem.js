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

const CharacteristicItem = (props) => {
   return (
      <View style={styles.container}>
         <View
            style={[
               styles.itemBlock,
               { backgroundColor: props.item.type == 2 ? "#F6F6F4" : "white" },
            ]}
         >
            <View style={styles.labelBlock}>
               <Text style={styles.label}>{props.item.label}</Text>
            </View>
            {props.item.slug ? (
               <View>
                  <TouchableOpacity
                     onPress={() => {
                        console.log(
                           `${props.item.charactType} - ${props.item.slug}`
                        );
                     }}
                  >
                     <Text style={styles.characteristicLinkText}>
                        {props.item.characteristic !== null
                           ? props.item.characteristic
                           : "none"}
                     </Text>
                  </TouchableOpacity>
               </View>
            ) : (
               <Text style={styles.characteristicText}>
                  {props.item.characteristic !== null
                     ? props.item.characteristic
                     : "none"}
               </Text>
            )}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },

   labelBlock: { width: "50%" },
   label: {
      fontSize: 14,
      width: "90%",
      fontWeight: "600",
   },
   itemBlock: {
      flexDirection: "row",
      //   backgroundColor: "grey",
      width: "100%",
      paddingLeft: 20,
      paddingVertical: 10,
   },
   characteristicText: {
      width: "50%",
      fontSize: 15,
   },
   characteristicLinkText: {
      color: Colors.primaryColor,
   },
});

export default CharacteristicItem;
