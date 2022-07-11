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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Colors from "../../constants/Colors";

const AuthScreen = (props) => {
   var isAuth = false;
   return (
      <View style={styles.container}>
         {!isAuth && (
            <View style={styles.logRegBlock}>
               <View style={styles.logRegBlockInner}>
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("TopTabNavigator", { screen: 'Login' });
                     }}
                  >
                     <Text style={styles.logRegBlockText}>Вхід</Text>
                  </TouchableOpacity>
                  <Text style={styles.logRegBlockText}>|</Text>
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("TopTabNavigator", { screen: 'Registration' });
                     }}
                  >
                     <Text style={styles.logRegBlockText}>Реєстрація</Text>
                  </TouchableOpacity>
               </View>
            </View>
         )}
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Electron",
      headerLeft: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="electron" color={"white"} iconName="logo-electron" />
         </HeaderButtons>
      ),
      headerRight: () => (
         <View style={styles.buttonRightContainer}>
            <Text
               style={[styles.buttonRightItem, styles.buttonRightItemActive]}
            >
               UA
            </Text>
            <Text style={styles.buttonRightItem}>|</Text>
            <Text style={styles.buttonRightItem}>EN</Text>
         </View>
      ),
   };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   buttonRightContainer: {
      marginRight: 20,
      flexDirection: "row",
   },
   buttonRightItem: {
      marginHorizontal: 5,
      color: "white",
      fontWeight: "700",
   },
   buttonRightItemActive: {
      color: "yellow",
   },
   logRegBlock: {
      alignItems: "center",
      width: "100%",
      marginVertical: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primaryColor,
      paddingBottom: 20,
   },
   logRegBlockInner: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "45%",
   },
   logRegBlockText: {
      fontSize: 18,
      fontWeight:"700",
      color: Colors.primaryColor,
   },
});

export default AuthScreen;
