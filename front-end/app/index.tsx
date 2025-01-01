import React from 'react';
import { router } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Platform } from 'react-native';
import HomeProducts from '@/assets/data/home-products/data';
import IProduct from './interfaces/product';
import useListProduct from './context/listProvider/listProvider';
import useConfigStore from './context/config/Provider';
import Menu from './components/menu';
import { Bangers_400Regular, useFonts } from '@expo-google-fonts/bangers';
import FavoriteButton from './components/favoriteButton';
import { AntDesign } from '@expo/vector-icons';
import useCartStore from './context/cart/cartProvider';
import { useToast } from "react-native-toast-notifications";
const { width, height } = Dimensions.get("window");

export default function HomeScreen() {

    const [fontsLoaded] = useFonts({
        Bangers_400Regular
    });

    const { listProduct, addFavorite, favorites } = useListProduct();
    const { size, theme } = useConfigStore();
    const { addProduct } = useCartStore();
    const toast = useToast();

    function handleProduct(data: IProduct) {
        listProduct(data);
        router.push('screens/ProductDetail' as never);
    }

    function handleRestaurant(url: IProduct) {
        router.push(url as never);
    }


    function showToast() {
        toast.show("Produto adicionado ao carrinho", {
            type: "success",
            duration: 1000,
            placement: "top",
            animationDuration: 200,
            successColor: "#FF1E00",
            
        });
    }

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme ? '#313131' : '#fff', }]}>
            <Menu theme={theme} />
            <View>
                <View style={styles.header}>
                    <Text style={[styles.title, { fontSize: size as number }]}>Restaurantes</Text>
                </View>
                <ScrollView
                    horizontal
                    decelerationRate="normal"
                    showsHorizontalScrollIndicator={false}
                    style={styles.containerItens}
                    contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity style={[styles.itens, { backgroundColor: theme ? '#313131' : '#fff' }]} onPress={() => { handleRestaurant('screens/ProductDetailAll/mcdonalds' as never) }}>
                        <Image style={styles.itemImage} source={require('../assets/logos/mcdonalds.png')} />
                        <Text style={[styles.itemText, { fontSize: size as number, color: theme ? '#fff' : '#313131' }]}>MC DONALDS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itens, { backgroundColor: theme ? '#313131' : '#fff' }]} onPress={() => handleRestaurant('screens/ProductDetailAll/kfc' as never)}>
                        <Image style={styles.itemImage} source={require('../assets/logos/kfc.png')} />
                        <Text style={[styles.itemText, { fontSize: size as number, color: theme ? '#fff' : '#313131' }]}>KFC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itens, { backgroundColor: theme ? '#313131' : '#fff' }]} onPress={() => handleRestaurant('screens/ProductDetailAll/burger_king' as never)}>
                        <Image style={styles.itemImage} source={require('../assets/logos/bk.png')} />
                        <Text style={[styles.itemText, { fontSize: size as number, color: theme ? '#fff' : '#313131' }]}>BURGUER KING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itens, { backgroundColor: theme ? '#313131' : '#fff' }]} onPress={() => handleRestaurant('screens/ProductDetailAll/bobs' as never)}>
                        <Image style={styles.itemImage} source={require('../assets/logos/bobs.png')} />
                        <Text style={[styles.itemText, { fontSize: size as number, color: theme ? '#fff' : '#313131' }]}>BOBS</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.productSection}>
                <View style={styles.productHeader}>
                    <Text style={[styles.productTitle, { fontSize: size as number, color: theme ? '#fff' : '#313131', }]}>Mais Pedidos</Text>
                    <TouchableOpacity onPress={() => router.push('/screens/products' as never)} style={styles.seeAllButton}>
                        <Text style={[styles.seeAllText, { fontSize: size as number }]}>VER TODOS</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productList}>
                    {HomeProducts.map((item: IProduct, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.productItem, { backgroundColor: theme ? '#313131' : '#fff' }]}
                            onPress={() => handleProduct(item)}>
                            <View className="absolute top-5 left-2 flex-col items-center justify-center gap-2 z-10 ">
                                <TouchableOpacity className='w-11 h-11 items-center justify-center  rounded-sm'>
                                    <FavoriteButton product={item} addFavorite={addFavorite} favorites={favorites} theme={theme} size={41} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        addProduct({ ...item, qtd: 1 })
                                        showToast()
                                    }}
                                    className='w-10 h-10 items-center justify-center bg-[#FF1E00] rounded-full'>
                                    <AntDesign name="shoppingcart" size={17} color={theme ? "#000" : "#fff"} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.productLogoContainer}>
                                <Image style={styles.productLogo} source={item.logo} />
                            </View>
                            <Image style={styles.productImage} source={item.image} />
                            <View className='items-center w-[100%] '>
                                <Text className={`w-[100%] text-center  font-medium text-[#323232]  text-[${theme ? '#fff' : '#313131'}]`}
                                    style={{
                                        fontSize: size as number,
                                        fontFamily: Platform.select({
                                            android: 'Bangers_400Regular',
                                            ios: 'Bangers_400Regular',
                                        }),
                                    }}
                                >{item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        padding: 10,
    },
    header: {
        gap: 5,
        marginTop: 20,
        width: "100%",
        marginBottom: 10,
        paddingLeft: width * 0.02,
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    title: {
        fontWeight: "500",
        color: "#323232",
        fontFamily: Platform.select({
            android: 'Bangers_400Regular',
            ios: 'Bangers_400Regular',
        }),
    },
    containerItens: {
        height: 170,
    },
    contentContainer: {
        alignItems: "center",
        gap: 6,
        height: "100%"
    },
    itens: {
        borderWidth: 1,
        borderColor: "#e1e1e17d",
        height: "100%",
        width: width / 2.9,
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    itemImage: {
        width: "60%",
        marginBottom: 10,
        height: "50%",
        resizeMode: "contain",
    },
    itemText: {
        position: "absolute",
        bottom: 3,
        width: "100%",
        fontWeight: "500",
        textAlign: "center",
        color: "#323232",
        fontFamily: Platform.select({
            android: 'Bangers_400Regular',
            ios: 'Bangers_400Regular',
        }),
    },
    productSection: {
        marginTop: 20,
    },
    productHeader: {
        width: "100%",
        display: "flex",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    productTitle: {
        fontWeight: "500",
        color: "#323232",
        fontFamily: Platform.select({
            android: 'Bangers_400Regular',
            ios: 'Bangers_400Regular',
        }),
    },
    seeAllButton: {
        justifyContent: 'center',
    },
    seeAllText: {
        color: "#FF8000",
        fontFamily: Platform.select({
            android: 'Bangers_400Regular',
            ios: 'Bangers_400Regular',
        }),
    },
    productList: {
        paddingBottom: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 5,
    },
    productItem: {
        position: "relative",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e1e1e17d",
        backgroundColor: "#E8E8E8",
        width: width / 2.14,
        height: height / 4.5,
        justifyContent: "center",
        alignItems: "center",
    },
    productLogoContainer: {
        position: "absolute",
        backgroundColor: "#D2D2D2",
        borderRadius: 10,
        right: 20,
        top: 20,
        width: 50,
        height: 50,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productLogo: {
        width: "70%",
        height: "70%",
        resizeMode: "contain",
    },
    productImage: {
        width: "100%",
        height: "50%",
        resizeMode: "contain",
    },

});
