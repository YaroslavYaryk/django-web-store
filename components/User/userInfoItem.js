import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
const UserInfoItem = (props) => {
   return (
      <View style={styles.userTextInfoBLockWrapper}>
         <View style={styles.userTextInfoBLock}>
            <Text style={styles.userTextLabel}>{props.label}</Text>
            <Text style={styles.userBlockText}>{props.value}</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   userBlockWrapper: {
      // borderWidth: 0.5,
   },
   userBlock: {
      alignItems: "center",
      padding: 5,
   },
   userBlockText: {
      fontSize: 15,
   },
   userTextLabel: {
      color: "grey",
      fontSize: 13,
   },
   userTextInfoBLockWrapper: {
      borderBottomWidth: 0.2,
      borderColor: "grey",
      marginBottom: 15,
   },
   userTextInfoBLock: {
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 5,
   },
});

export default UserInfoItem;
