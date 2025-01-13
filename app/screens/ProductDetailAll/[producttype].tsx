import { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, Image, Platform, TouchableOpacity, TextInput, ViewStyle, FlatList, RefreshControl } from "react-native";
import { useRouter, useLocalSearchParams, usePathname } from "expo-router";
import BackButton from "@/app/components/backButton";
import IProduct from "@/app/interfaces/product";
import useListProduct from "@/app/context/listProvider/listProvider";
import useConfigStore from "@/app/context/config/Provider";
import { AntDesign } from "@expo/vector-icons";
import SkeletonListProducts from "@/app/components/skeleton/skeleton";
import { Bangers_400Regular, useFonts } from "@expo-google-fonts/bangers";
import useGetProductsEnterprise from "@/app/hooks/useGetProductsEnterprise";
import RecommendedSkeletonListProducts from "@/app/components/skeleton/recommended_skeleton";
import useGetRecommendedProducts from "@/app/hooks/useGetRecommendedProducts";
const { height } = Dimensions.get("window");
type ProductType = 'mcdonalds' | 'kfc' | 'burger_king' | 'bobs';

export default function ProductsDetailAllScreen() {

    const pathname = usePathname();
    const router = useRouter();
    const { currency, theme } = useConfigStore();
    const [refreshing, setRefreshing] = useState(false);
    const { data: recommendedProducts } = useGetRecommendedProducts({ refreshing: refreshing })
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [text, setText] = useState('');
    const { producttype } = useLocalSearchParams();
    const { listProduct } = useListProduct();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [fontsLoaded] = useFonts({ Bangers_400Regular });
    const { data: products, loading } = useGetProductsEnterprise({ enterprise: producttype });

    useEffect(() => {
        setText('')
        setFilteredProducts([])
        setIsEmpty(false)
    }, [pathname])

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    function handleProduct(data: IProduct) {
        listProduct(data);
        router.push('screens/ProductDetail' as never);
    }

    function inputHandleChange(text: string) {
        setText(text);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const filteredProduct = products.filter((item: any) => item.title.toLowerCase().includes(text.toLowerCase()));
            const isEmpty = text && filteredProduct.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
            setFilteredProducts(filteredProduct);
        }, 1000);
    }

    function handleClear() {
        setText('')
        setFilteredProducts([])
        setIsEmpty(false)
    }

    const data = filteredProducts.length > 0 ? filteredProducts : products;

    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style={{ backgroundColor: theme ? '#313131' : '#fff', height: height }}>
            <BackButton />
            <View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#FF8000"]}
                            tintColor="#FF8000"
                        />
                    }       >
                    <View style={{ height: 50, width: "100%", paddingHorizontal: 10, borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
                        <View style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%",
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: theme ? '#ffffff2b' : '#f9f9f9',
                            backgroundColor: theme ? '#323232' : "#EFEFEF",
                        }}>
                            <TextInput
                                placeholder="Pesquisar"
                                value={text}
                                placeholderTextColor={theme ? '#ffffffab' : '#000'}
                                onChangeText={(text) => inputHandleChange(text)}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    color: theme ? '#fff' : '#000',
                                }} />
                            {
                                text && (
                                    <TouchableOpacity onPress={handleClear} style={{
                                        position: "absolute",
                                        right: 0,
                                        width: 40,
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: theme ? '#323232' : "#EFEFEF",
                                    }}>
                                        <AntDesign name="close" size={18} color="black" />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>

                    <View style={{ paddingLeft: 20, justifyContent: "center", marginBottom: 20 }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: "500",
                            color: "#FF8000",
                            fontFamily: Platform.select({
                                android: 'Bangers_400Regular',
                                ios: 'Bangers_400Regular',
                            }),
                        }}>Recomendados</Text>
                        {
                            !loading && !refreshing ? (
                                <FlatList
                                    data={recommendedProducts}
                                    extraData={loading}
                                    renderItem={({ item }: any) => (
                                        <TouchableOpacity onPress={() => handleProduct(item)} style={[styles.cart, { backgroundColor: theme ? '#282828' : '#F9F9F9' }]}>
                                            <View style={{
                                                width: "100%", height: "50%", backgroundColor: theme ? '#313131' : '#fff', justifyContent: "center", alignItems: "center",
                                                borderTopEndRadius: 10, borderTopStartRadius: 10, overflow: "hidden"
                                            }}>
                                                <Image source={{ uri: item.img }} style={{ width: "70%", height: "70%", resizeMode: "contain", borderRadius: 10, }} />
                                            </View>
                                            <View style={{ padding: 10 }}>
                                                <Text style={[styles.text, { color: theme ? '#fff' : '#313131' }]}>{item.title}</Text>
                                                <Text style={[styles.text, { fontSize: 15, color: "#FF8000", textAlign: "center" }]}>{currency == "USD" ? `$ ${item.price} ` : `R$ ${(Number(item.price) * 6).toFixed(2)}`}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    horizontal
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.flashMoreContent}
                                />
                            )
                                :
                                (
                                    <RecommendedSkeletonListProducts theme={theme} />
                                )
                        }
                    </View>

                    <View style={{ marginBottom: height / 6 }}>
                        <Text style={{
                            marginLeft: 20,
                            fontSize: 25,
                            fontWeight: "500",
                            color: "#FF8000",
                            fontFamily: Platform.select({
                                android: 'Bangers_400Regular',
                                ios: 'Bangers_400Regular',
                            }),
                        }}>Cardápio</Text>
                        <View style={styles.flashListContent}>
                            {
                                refreshing ? (
                                    <SkeletonListProducts theme={theme} />
                                )
                                    :
                                    isEmpty === false ? data.map((item, index) => (
                                        !loading ?
                                            <TouchableOpacity onPress={() => handleProduct(item)} style={[styles.cartList,
                                            { backgroundColor: theme ? '#282828' : '#F9F9F9', width: data.length == 1 ? "100%" : "49%" }]} key={index}>
                                                <View style={{
                                                    width: "100%", height: "50%", backgroundColor: theme ? '#313131' : '#fff', justifyContent: "center", alignItems: "center",
                                                    borderTopEndRadius: 10, borderTopStartRadius: 10,
                                                    overflow: "hidden"
                                                }}>
                                                    <Image source={{ uri: item.img }} style={{ width: "70%", height: "70%", resizeMode: "contain", borderRadius: 10, }} />
                                                </View>
                                                <View style={{ padding: 10 }}>
                                                    <Text style={[styles.text, { color: theme ? '#fff' : '#313131' }]}>{item.title}</Text>
                                                    <Text style={[styles.text, { fontSize: 16, color: "#FF8000", textAlign: "center" }]}>{currency == "USD" ? `$ ${item.price} ` : `R$ ${(Number(item.price) * 6).toFixed(2)}`}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <SkeletonListProducts key={index} theme={theme} />
                                    ))
                                        :
                                        <View style={{ width: "100%", height: height / 3, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={[styles.text, { fontSize: 40, color: "#00000057", textAlign: "center" }]}>Nenhum produto encontrado</Text>
                                        </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    flashMoreContent: {
    } as ViewStyle,
    cart: {
        padding: 1,
        width: 250,
        marginBottom: 10,
        height: 200,
        marginRight: 5,
        borderRadius: 10,
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    cartList: {
        padding: 1,
        marginBottom: 10,
        width: "45%",
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    text: {
        fontSize: 20,
        fontWeight: "500",
        color: "#323232",
        fontFamily: Platform.select({
            android: 'Bangers_400Regular',
            ios: 'Bangers_400Regular',
        }),
    },
    flashListContent: {
        width: "90%",
        alignSelf: "center",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
