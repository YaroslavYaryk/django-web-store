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
import { TextInput } from "react-native-paper";
import { useState, useRef, useEffect, useCallback } from "react";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../../redux-folder/actions/productActions";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const SearchInputScreen = (props) => {
   const searchQuery = useSelector((state) => state.products.searchQuery);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const ref = useRef(null);
   const [searchValue, setSearchValue] = useState("");

   const dispatch = useDispatch();

   const getSearchResult = () => {
      props.navigation.navigate("SearchNavigator", {
         screen: "SearchResultScreen",
         params: {
            searchValue: searchValue,
         },
      });
   };

   useEffect(() => {
      ref.current.focus();
   }, []);

   const onSearchItemChange = useCallback(async (el) => {
      setError(null);
      // setIsLoading(true);
      setSearchValue(el);
      try {
         if (el.length > 0) {
            await dispatch(productActions.SearchQuery(el));
         } else {
            dispatch(productActions.SearchProducts("all"));
         }
      } catch (error) {
         setError(error.message);
      }
      // setIsLoading(false);
   });

   if (error) {
      return (
         <View style={styles.center}>
            <Text>An error occured</Text>
            <Button title="Try Again" color={Colors.primaryColor} />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View style={styles.center}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   return (
      <View style={{ marginTop: 60 }}>
         <View
            style={{
               marginHorizontal: 10,
               marginTop: 10,
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
               borderBottomWidth: 0.5,
            }}
         >
            <View>
               <AntDesign
                  name="arrowleft"
                  size={24}
                  color="black"
                  onPress={() => {
                     props.navigation.navigate("BaseFullNavigator");
                  }}
               />
            </View>
            <View style={{ width: "92%" }}>
               <TextInput
                  ref={ref}
                  style={{ backgroundColor: "#F2F4F6" }}
                  //   mode="outlined"
                  value={searchValue}
                  onChangeText={(el) => onSearchItemChange(el)}
                  // label={"Search"}
                  underlineColor="#F2F2F2"
                  activeOutlineColor="green"
                  color="red"
                  activeUnderlineColor="#F3F5F6"
                  selectionColor="black"
                  right={<TextInput.Icon name="home-search-outline" />}
               />
            </View>
         </View>
         {searchValue.length ? (
            <View style={{ marginTop: 10 }}>
               <FlatList
                  data={[searchValue, ...searchQuery]}
                  keyExtractor={(item) => item.id}
                  spacing={20}
                  renderItem={(itemData) => (
                     <View style={{ padding: 10, marginLeft: 10 }}>
                        <TouchableOpacity
                           onPress={() => {
                              getSearchResult(itemData.item);
                           }}
                        >
                           <View
                              style={{
                                 flexDirection: "row",
                                 alignItems: "center",
                              }}
                           >
                              <Ionicons name="search" size={24} color="grey" />
                              <View style={{ marginLeft: 20 }}>
                                 <Text
                                    style={{ fontSize: 16, fontWeight: "500" }}
                                 >
                                    {itemData.item}
                                 </Text>
                              </View>
                           </View>
                           <View style={{ position: "absolute", right: 10 }}>
                              <Feather
                                 name="arrow-up-left"
                                 size={24}
                                 color="black"
                                 onPress={() => {
                                    setSearchValue(itemData.item);
                                 }}
                              />
                           </View>
                        </TouchableOpacity>
                     </View>
                  )}
               />
            </View>
         ) : (
            <Text></Text>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   wrapper: {
      width: "100%",
   },
   center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default SearchInputScreen;
