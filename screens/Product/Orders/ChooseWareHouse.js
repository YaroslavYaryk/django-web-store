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
   SafeAreaView,
   VirtualizedList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { useState, useEffect, useCallback } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { useSelector, useDispatch } from "react-redux";
import * as novaPoshtaAction from "../../../redux-folder/actions/novaPoshtaActions";
import * as orderActions from "../../../redux-folder/actions/orderActions";
import * as authActions from "../../../redux-folder/actions/userActions";
import { useIsFocused } from "@react-navigation/native";

const re = /\(.*?\)/;

const ChooseWareHouse = (props) => {
   const [query, setQuery] = useState();
   const wareHouses = useSelector((elem) => elem.cities.cityWareHouses);
   const cartId = props.route.params.cartId
      ? props.route.params.cartId
      : props.route.params.params.cartId;
   const [error, setError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const user = useSelector((state) => state.user.user);

   const dispatch = useDispatch();

   const isFocused = useIsFocused();

   useEffect(() => {
      if (user.livingPlace) {
         dispatch(novaPoshtaAction.fetchCityPost(user.livingPlace));
      }
   }, [isFocused]);

   const changeUserVareHouse = useCallback(async (name) => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(authActions.changeUserWareHouse(name));
      } catch (err) {
         console.log(err.message);
         setError(err.message);
      }
      setIsLoading(false);
   });

   const addOrderVareHouse = useCallback(async (cartId, description, id) => {
      setError(null);
      setIsLoading(true);
      try {
         console.log(cartId, description, id);
         await dispatch(orderActions.addWareHouse(cartId, description, id));
      } catch (err) {
         console.log(err.message);
         setError(err.message);
      }
      setIsLoading(false);
   });

   const handleChangeUserDeliveryType = useCallback(async (type) => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(authActions.changeUserDeliveryType(type));
      } catch (err) {
         console.log(err.message);
         setError(err.message);
      }
      setIsLoading(false);
   });

   return (
      <View style={styles.container}>
         <SafeAreaView style={{ marginTop: 10, height: "100%" }}>
            <VirtualizedList
               // style={{ height: "100%" }}
               getItemCount={(data) => data.length}
               keyExtractor={(item) =>
                  item.Area
                     ? item.Area + item.Ref + Math.random()
                     : item + Math.random()
               }
               getItem={(data, index) => data[index]}
               initialNumToRender={10}
               data={wareHouses}
               renderItem={(itemData) => (
                  <TouchableOpacity
                     key={itemData.item.Description + Math.random()}
                     onPress={() => {
                        addOrderVareHouse(
                           cartId,
                           itemData.item.Description,
                           itemData.item.Ref
                        );

                        changeUserVareHouse(itemData.item.Description);
                        const a = "Доставка до пункту видачі";
                        if (user.deliveryType != a) {
                           handleChangeUserDeliveryType(a);
                        }

                        props.navigation.navigate("DeliveryScreen", {
                           params: { cartId: cartId },
                        });
                     }}
                  >
                     <View
                        style={{
                           marginHorizontal: 20,
                           marginVertical: 10,
                           height: 30,
                           // padding: 10,
                           // borderColor: "grey",
                           // borderRadius: 10,
                        }}
                     >
                        <View style={{}}>
                           <Text style={{ fontSize: 16, fontWeight: "500" }}>
                              {itemData.item.Description}
                           </Text>
                           {/* <Text style={{ fontSize: 13 }}>
                              {itemData.item.AreaDescription} обл.{" "}
                              {re.exec(itemData.item.Description)}
                           </Text> */}
                        </View>
                     </View>
                  </TouchableOpacity>
               )}
            />
         </SafeAreaView>
         <View>
            <Text>here</Text>
         </View>
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

export default ChooseWareHouse;
