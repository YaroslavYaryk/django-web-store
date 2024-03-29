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
import { useEffect, useState, useCallback } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../redux-folder/actions/userActions";
import UserInfoItem from "../../components/User/userInfoItem";
import { useIsFocused } from "@react-navigation/native";

const AuthScreen = (props) => {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const auth = useSelector((state) => state.auth);
   const user = useSelector((state) => state.user.user);

   const dispatch = useDispatch();

   const isFocused = useIsFocused();

   const loadUser = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         if (auth.userId) {
            await dispatch(userActions.fetchUserInfo(auth.userId));
         }
      } catch (err) {
         console.log(err.message);
         console.log("setError");
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading, isFocused]);

   useEffect(() => {
      if (auth.userId) {
         loadUser();
      }
   }, [dispatch, loadUser, isFocused]);

   var isAuth = auth.token;
   if (error) {
      return (
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button
               title="Try Again"
               onPress={loadUser}
               color={Colors.primaryColor}
            />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }
   return (
      <View style={styles.container}>
         {!isAuth ? (
            <View style={styles.logRegBlock}>
               <View style={styles.logRegBlockInner}>
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("TopTabNavigator", {
                           screen: "Login",
                        });
                     }}
                  >
                     <Text style={styles.logRegBlockText}>Вхід</Text>
                  </TouchableOpacity>
                  <Text style={styles.logRegBlockText}>|</Text>
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("TopTabNavigator", {
                           screen: "Registration",
                        });
                     }}
                  >
                     <Text style={styles.logRegBlockText}>Реєстрація</Text>
                  </TouchableOpacity>
               </View>
            </View>
         ) : (
            <View style={styles.userBlockWrapper}>
               <View style={styles.userBlock}>
                  <Text style={styles.userBlockText}>
                     {user.firstName} {user.lastName}
                  </Text>
               </View>
               <View
                  style={{
                     borderWidth: 0.2,
                     padding: 18,
                     borderRadius: 5,
                     backgroundColor: "#F0F0F0",
                  }}
               >
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("ProfileNavigator", {
                           screen: "ProfileNavigator",
                        });
                     }}
                  >
                     <View
                        style={{
                           flexDirection: "row",
                        }}
                     >
                        <View>
                           <FontAwesome5
                              name="user-circle"
                              size={24}
                              color="black"
                           />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                           <Text style={{ fontSize: 16, fontWeight: "500" }}>
                              {user.firstName} {user.lastName}
                           </Text>
                        </View>
                     </View>
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
   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
      fontWeight: "700",
      color: Colors.primaryColor,
   },
   userBlockWrapper: {
      // borderWidth: 0.5,
   },
   userBlock: {
      alignItems: "center",
      padding: 10,
   },
   userBlockText: {
      fontSize: 18,
   },
   userTextLabel: {
      color: "grey",
   },
   userTextInfoBLockWrapper: {
      borderBottomWidth: 0.5,
   },
   userTextInfoBLock: {
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 5,
   },
});

export default AuthScreen;
