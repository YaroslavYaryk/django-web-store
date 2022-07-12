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
            <Text style={styles.characteristicText}>
               {props.item.characteristic !== null
                  ? props.item.characteristic
                  : "none"}
            </Text>
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
});

export default CharacteristicItem;
