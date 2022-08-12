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
import { useState, useRef, useEffect } from "react";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../../redux-folder/actions/productActions";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const SearchInputScreen = (props) => {
   const searchProducts = useSelector((state) => state.products.searchProducts);

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

   const onSearchItemChange = (el) => {
      setSearchValue(el);
      if (el.length > 0) {
         dispatch(productActions.SearchProducts(el));
      } else {
         dispatch(productActions.SearchProducts("all"));
      }
   };

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
               <TouchableOpacity
                  style={{ marginHorizontal: 15 }}
                  onPress={() => {
                     getSearchResult();
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
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>
                           {searchValue}
                        </Text>
                     </View>
                  </View>
                  <View style={{ position: "absolute", right: 10 }}>
                     <Feather
                        name="arrow-up-left"
                        size={24}
                        color="black"
                        onPress={() => {}}
                     />
                  </View>
               </TouchableOpacity>

               {/* <FlatList
               data={[searchValue]}
               keyExtractor={(item) => item.id}
               spacing={20}
               renderItem={(itemData) => (
                  <View style={{ padding: 10, marginLeft: 10 }}>
                     <TouchableOpacity
                        onPress={() => {
                           getProductDetails(
                              itemData.item.id,
                              itemData.item.onlyName
                           );
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
                              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                 {itemData.item.onlyName}
                              </Text>
                           </View>
                        </View>
                        <View style={{ position: "absolute", right: 10 }}>
                           <Feather
                              name="arrow-up-left"
                              size={24}
                              color="black"
                              onPress={() => {
                                 setSearchValue(itemData.item.onlyName);
                              }}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
               )}
            /> */}
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
