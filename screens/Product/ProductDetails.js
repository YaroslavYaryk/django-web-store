import {
   Text,
   View,
   ScrollView,
   Image,
   StyleSheet,
   Button,
   Dimensions,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Platform } from "react-native";
import Slider from "../../components/Slider";
import TitleSlider from "../../components/TitleSlider";
import RatingItem from "../../components/RatingItem";
import { Transition, Transitioning } from "react-native-reanimated";
import { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import PAYMENT_METHODS from "../../constants/PaymentMethods";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const height = width * 0.6 + 455;

const transition = (
   <Transition.Together>
      <Transition.In type="fade" durationMs={200} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={200} />
   </Transition.Together>
);

const ProductDetails = (props) => {
   const productId = props.route.params.productId;
   const eventDetails = useSelector((state) =>
      state.products.products.find((elem) => elem.id === productId)
   );
   const [currentIndex, setCurrentIndex] = useState(null);
   const [warrantyIcon, setWarrantyIcon] = useState("downcircleo");
   const [priceMethodIcon, setPriceMethodIcon] = useState("downcircleo");

   const ref = useRef();

   const changeIconName = (type) => {
      if (type == "payment") {
         if (priceMethodIcon == "downcircleo") {
            setPriceMethodIcon("upcircleo");
         } else {
            setPriceMethodIcon("downcircleo");
         }
         setWarrantyIcon("downcircleo");
      } else {
         if (warrantyIcon == "downcircleo") {
            setWarrantyIcon("upcircleo");
         } else {
            setWarrantyIcon("downcircleo");
         }
         setPriceMethodIcon("downcircleo");
      }
   };

   return (
      eventDetails && (
         <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}
         >
            <ScrollView>
               <View style={{ height, backgroundColor: "white" }}>
                  <Slider images={eventDetails.photos} />
                  <View style={styles.nameBlockWrapper}>
                     <View style={styles.nameTextBlock}>
                        <Text style={styles.nameText}>{eventDetails.name}</Text>
                     </View>
                     <View
                        style={{
                           alignItems: "center",
                           paddingBottom: 15,
                           borderBottomWidth: 0.2,
                           borderBottomColor: "grey",
                        }}
                     >
                        <View style={styles.underNameBlock}>
                           <View style={styles.idBlock}>
                              <Text style={styles.idBlockText}>
                                 <Text style={styles.kodLabel}>Код</Text>{" "}
                                 {eventDetails.id}
                              </Text>
                           </View>
                           <RatingItem stars={4} reviews={145} />
                        </View>
                     </View>
                     <View style={styles.priceBlock}>
                        <View style={styles.inStockBlock}>
                           <Text style={styles.inStock}>
                              {eventDetails.isAvailable ? (
                                 <Text style={{ color: "green", fontSize: 12 }}>
                                    В наявності
                                 </Text>
                              ) : (
                                 <Text style={{ color: "red", fontSize: 12 }}>
                                    Відсутній
                                 </Text>
                              )}
                           </Text>
                        </View>
                        <View style={styles.priceInnerBlock}>
                           <Text style={styles.price}>
                              {eventDetails.price}
                              <Text style={styles.currencySymbol}> ₴</Text>
                           </Text>
                        </View>
                     </View>
                     <View style={styles.partPayBlock}>
                        <View style={styles.partPayBlockInner}>
                           <Text style={styles.partPayPriceBefore}>Від</Text>
                           <Text style={styles.partPayPrice}>
                              {Math.ceil(eventDetails.price / 12)}
                           </Text>
                           <Text style={styles.partPayPriceAfter}>
                              ₴/місяць
                           </Text>
                        </View>
                        <View style={styles.loanBlock}>
                           <TouchableOpacity>
                              <Text style={styles.loanBlockText}>
                                 КУПИТИ В КРEДИТ
                              </Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                     <View style={styles.fullDescriptionBlock}>
                        <TouchableOpacity
                           style={{ alignItems: "center" }}
                           onPress={() => {
                              props.navigation.navigate("ProductDescription", {
                                 productId: productId,
                              });
                           }}
                        >
                           <View style={styles.fullDescriptionInnerBlock}>
                              <Text style={styles.fullDescriptionText}>
                                 Повний опис
                              </Text>
                              <AntDesign
                                 name="rightcircleo"
                                 size={24}
                                 color="black"
                              />
                           </View>
                        </TouchableOpacity>
                     </View>
                     <View style={styles.line}></View>
                     <View style={styles.warrantyBlock}>
                        <ScrollView
                           style={{ marginVertical: 15, marginHorizontal: 10 }}
                        >
                           <TouchableOpacity
                              key={"warranty"}
                              onPress={() => {
                                 ref.current.animateNextTransition();
                                 setCurrentIndex(1 === currentIndex ? null : 1);
                                 changeIconName("warranty");
                              }}
                              style={styles.cardContainer}
                              activeOpacity={0.9}
                           >
                              <View style={{}}>
                                 <ScrollView>
                                    <View style={styles.varrantyCard}>
                                       <Text style={[styles.warranryHeading]}>
                                          {"Гарантія"}
                                       </Text>
                                       <AntDesign
                                          name={warrantyIcon}
                                          size={24}
                                          color="black"
                                       />
                                    </View>
                                    {1 === currentIndex && (
                                       <View style={styles.subCategoriesList}>
                                          <Ionicons
                                             name="shield-checkmark-outline"
                                             size={24}
                                             color="black"
                                          />
                                          <View>
                                             <Text
                                                style={[
                                                   styles.subCategoriesListText,
                                                ]}
                                             >
                                                {"12 днів"}
                                             </Text>
                                             <Text
                                                style={[
                                                   styles.subCategoriesListText,
                                                ]}
                                             >
                                                {
                                                   "Обмін і.повернення товару в продовж 14 днів"
                                                }
                                             </Text>
                                          </View>
                                       </View>
                                    )}
                                 </ScrollView>
                              </View>
                           </TouchableOpacity>
                        </ScrollView>
                     </View>
                     <View style={styles.warrantyBlock}>
                        <ScrollView
                           style={{ marginVertical: 15, marginHorizontal: 10 }}
                        >
                           <TouchableOpacity
                              key={"warranty"}
                              onPress={() => {
                                 ref.current.animateNextTransition();
                                 setCurrentIndex(2 === currentIndex ? null : 2);
                                 changeIconName("payment");
                              }}
                              style={styles.cardContainer}
                              activeOpacity={0.9}
                           >
                              <View style={[{ backgroundColor: "white" }]}>
                                 <View style={styles.varrantyCard}>
                                    <Text style={[styles.warranryHeading]}>
                                       {"Оплата"}
                                    </Text>
                                    <AntDesign
                                       name={priceMethodIcon}
                                       size={24}
                                       color="black"
                                    />
                                 </View>
                                 {2 === currentIndex &&
                                    PAYMENT_METHODS.map((elem) => (
                                       <View
                                          key={elem.id}
                                          style={styles.subCategoriesListPrice}
                                       >
                                          <View
                                             style={{ flexDirection: "row" }}
                                          >
                                             <AntDesign
                                                name="checkcircleo"
                                                size={18}
                                                color="green"
                                                style={{ marginTop: 2 }}
                                             />
                                             <Text
                                                style={[
                                                   styles.subCategoriesListPriceText,
                                                ]}
                                             >
                                                {elem.method}
                                             </Text>
                                          </View>
                                       </View>
                                    ))}
                              </View>
                           </TouchableOpacity>
                        </ScrollView>
                     </View>
                     <View style={styles.line}></View>
                  </View>
               </View>
            </ScrollView>
         </Transitioning.View>
      )
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: navData.route.params.params.productTitle,
   };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
      // height: 200,
   },
   nameBlockWrapper: {
      paddingTop: 1,
   },
   nameTextBlock: {
      marginHorizontal: 15,
   },
   nameText: {
      fontSize: 20,
   },
   underNameBlock: {
      marginTop: 10,
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   kodLabel: {
      color: "gray",
   },
   inStockBlock: {
      paddingTop: 5,
      paddingLeft: 15,
   },
   priceBlock: {
      paddingBottom: 8,
      borderBottomWidth: 0.2,
      // borderWidth: 2,
      borderBottomColor: "grey",
      marginBottom: 6,
   },
   priceInnerBlock: {
      marginLeft: 15,
   },
   price: {
      fontSize: 25,
   },
   currencySymbol: {
      fontSize: 20,
   },
   partPayBlock: {
      width: "100%",
      marginTop: 3,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 0.2,
      borderBottomColor: "grey",
      alignItems: "center",
      paddingBottom: 10,
   },
   partPayBlockInner: {
      margin: 15,
      flexDirection: "row",
      width: "35%",
      justifyContent: "space-between",
      alignItems: "center",
   },
   partPayPrice: {
      fontSize: 18,
   },
   partPayPriceBefore: { fontSize: 14 },
   partPayPriceAfter: { fontSize: 14 },
   loanBlock: {
      borderWidth: 2,
      paddingHorizontal: 13,
      paddingVertical: 8,
      borderColor: "grey",
      borderRadius: 10,
      marginRight: 20,
   },
   loanBlockText: {
      color: "green",
      fontWeight: "500",
   },
   warrantyBlock: {
      // margin: 10,
      borderBottomWidth: 0.5,
      borderColor: "grey",
   },
   warranryHeading: {
      fontSize: 20,
   },
   varrantyCard: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   fullDescriptionBlock: {
      marginVertical: 15,
   },
   fullDescriptionInnerBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "95%",
   },
   subCategoriesList: {
      flexDirection: "row",
      marginVertical: 15,
   },
   subCategoriesListText: {
      marginLeft: 10,
   },
   fullDescriptionText: {
      fontSize: 20,
   },
   line: {
      width: "100%",
      backgroundColor: "grey",
      height: 0.2,
   },
   subCategoriesListPrice: {
      marginVertical: 5,
   },
   subCategoriesListPriceText: {
      marginLeft: 10,
   },
});

export default ProductDetails;
