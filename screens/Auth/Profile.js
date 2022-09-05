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
import * as authActions from "../../redux-folder/actions/authActions";
import UserInfoItem from "../../components/User/userInfoItem";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Profile = (props) => {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const user = useSelector((state) => state.user.user);
   const auth = useSelector((state) => state.auth);
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

   const logoutHandle = async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(authActions.logout());
      } catch (err) {
         console.log(err.message);
         setError(err.message);
      }
      setIsLoading(false);
   };

   const getUser = () => {
      if (!auth.token) {
         props.navigation.navigate("Account");
      }
   };

   useEffect(() => {
      getUser();
   }, [auth]);

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
      <View>
         <ScrollView style={{ height: "100%" }}>
            <View style={{ marginBottom: 10 }}>
               <UserInfoItem label="Ім'я" value={user.firstName} />
               <UserInfoItem label="прізвище" value={user.lastName} />
               <UserInfoItem label="По-батькові" value={user.middleName} />
               <UserInfoItem label="Пошта" value={user.email} />
               <UserInfoItem label="Мобільний телефон" value={user.phone} />
            </View>

            <View
               style={{
                  borderWidth: 3,
                  padding: 10,
                  borderColor: "#CCCCCC",
                  borderRadius: 10,
               }}
            >
               <TouchableOpacity
                  onPress={() => {
                     logoutHandle();
                  }}
               >
                  <View style={{ alignItems: "center" }}>
                     <Text
                        style={{
                           fontSize: 18,
                           fontWeight: "500",
                           color: Colors.primaryColor,
                        }}
                     >
                        Вийти з акаунту
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Особистий кабінет",

      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="edit"
               color={"white"}
               iconName="edit"
               icon={Feather}
               onPress={() => {
                  navData.navigation.navigate("EditProfile");
               }}
            />
         </HeaderButtons>
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

export default Profile;
