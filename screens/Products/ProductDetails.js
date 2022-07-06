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

const { width } = Dimensions.get("window");
const height = width * 0.6 + 305;

const ProductDetails = (props) => {
    const productId = props.route.params.productId;
    const eventDetails = useSelector((state) =>
        state.products.products.find((elem) => elem.id === productId)
    );

    const images = [
        "https://cdn11.bigcommerce.com/s-ss31ap/images/stencil/1280x1280/products/7739/27700/41oKylGa%25252ByL__23085.1630999913.jpg?c=2",
        "https://content.rozetka.com.ua/goods/images/big/163386254.jpg",
        "data:image/jpeg;base64,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",
    ];
    return (
        eventDetails && (
            <View style={{ height, backgroundColor: "white" }}>
                <TitleSlider
                    active={"details"}
                    productId={productId}
                    navigation={props.navigation}
                />
                <Slider images={images} />
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
                                    <Text
                                        style={{ color: "green", fontSize: 12 }}
                                    >
                                        В наявності
                                    </Text>
                                ) : (
                                    <Text
                                        style={{ color: "red", fontSize: 12 }}
                                    >
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
                                    КУПИТИ В КРУДИТ
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    );
};

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.productTitle,
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
        marginBottom: 30,
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
});

export default ProductDetails;
