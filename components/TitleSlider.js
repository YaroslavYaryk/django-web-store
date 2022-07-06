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
import { useState } from "react";
const { width } = Dimensions.get("window");
const height = width * 0.6;
import Colors from "../constants/Colors";

const TitleSlider = (props) => {
    const [active, setActive] = useState(0);
    const scrollToIndex = props.scrollToIndex ? props.scrollToIndex : 0;
    const [dataSourceCords, setDataSourceCords] = useState([]);

    const [ref, setRef] = useState(null);
    const titles = [
        {
            id: 0,
            tag: "details",
            name: "Все про товар",
            route: "ProductDetails",
        },
        {
            id: 1,
            tag: "characteristic",
            name: "Характеристики",
            route: "ProductCharacteristic",
        },
        { id: 2, tag: "reviews", name: "Відгуки", route: "ProductReview" },
        { id: 3, tag: "photo", name: "Фото", route: "ProductImages" },
        { id: 4, tag: "video", name: "Відео", route: "ProductVideos" },
    ];

    if (ref) {
        ref.scrollTo({
            x: 0,
            y: props.scrollTo,
            animated: true,
        });
    }

    const navigateroute = (route) => {
        props.navigation.navigate(route, {
            productId: props.productId,
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={(ref) => {
                    setRef(ref);
                }}
            >
                {titles.map((elem) => (
                    <View
                        key={elem.tag}
                        style={styles.scrollItemBlock}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            dataSourceCords[elem.id] = layout.x;
                            setDataSourceCords(dataSourceCords);
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigateroute(elem.route)}
                        >
                            {props.active == elem.tag ? (
                                <Text
                                    style={[
                                        styles.scrollItem,
                                        {
                                            color: Colors.primaryColor,
                                            borderBottomWidth: 2,
                                            borderColor: Colors.primaryColor,
                                        },
                                    ]}
                                >
                                    {elem.name}
                                </Text>
                            ) : (
                                <Text style={[styles.scrollItem]}>
                                    {elem.name}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: 30,
        marginBottom: 10,
    },
    scrollItemBlock: {
        backgroundColor: "#DEE0DF",
    },
    scrollItem: {
        color: "black",
        marginHorizontal: 10,
        fontSize: 18,
    },
});

export default TitleSlider;
