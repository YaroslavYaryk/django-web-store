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

const Slider = (props) => {
    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
            >
                {props.images.map((image) => (
                    <Image
                        key={image}
                        source={{ uri: image }}
                        style={styles.imageScroll}
                    />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {props.images.map((i, k) => (
                    <Text
                        key={k}
                        style={
                            k == active
                                ? styles.pagingActiveText
                                : styles.pagingText
                        }
                    >
                        ⬤
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width,
        height,
    },
    scroll: {
        width,
        height,
        // marginTop: 50,
    },
    imageScroll: { width, height, resizeMode: "contain", position: "relative" },
    pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
    },
    pagingText: { fontSize: width / 30, color: "grey", margin: 3 },
    pagingActiveText: { fontSize: width / 30, color: "green", margin: 3 },
});

export default Slider;
