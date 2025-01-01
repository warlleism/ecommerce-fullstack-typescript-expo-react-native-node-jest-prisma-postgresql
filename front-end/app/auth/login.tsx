import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { useAuth } from '../context/auth/authProvider';
import useConfigStore from '../context/config/Provider';
import SubmitButtom from '../components/submitButton';
import { Bangers_400Regular, useFonts } from '@expo-google-fonts/bangers';
import Feather from '@expo/vector-icons/Feather';
import useListProduct from '../context/listProvider/listProvider';

const { width, height } = Dimensions.get("window");

interface ProtectRouteProps {
    children: React.ReactNode;
}

export default function ProtectRoute({ children }: ProtectRouteProps) {

    const { initialize, theme } = useConfigStore();
    const { initialize: initializeList } = useListProduct()
    const [seePassword, setSeePassword] = useState(false);
    const [fontsLoaded] = useFonts({
        Bangers_400Regular
    });

    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors } } = useForm({
            defaultValues: {
                email: '',
                password: ''
            }
        });

    const { login, isAuthenticated } = useAuth()

    useEffect(() => {
        initialize();
        initializeList();
    }, [])

    if (!fontsLoaded) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <View
                className={`flex-1 justify-center items-center p-4 ${theme ? "bg-[#313131]" : "bg-[#F6F6F6]"}`}>
                <View style={[styles.card, { backgroundColor: theme ? "#313131" : "#fff" }]}>
                    <View style={styles.form}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={styles.logo}
                                source={require('../../assets/logos/logo.png')} />
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                                <Text style={{
                                    color: theme ? "#fff" : "#313131",
                                    fontSize: 30,
                                    fontFamily: Platform.select({
                                        android: 'Bangers_400Regular',
                                        ios: 'Bangers_400Regular',
                                    }),
                                }}>Menu</Text>
                                <Text style={{
                                    fontSize: 30,
                                    color: "#FF3B00",
                                    fontFamily: Platform.select({
                                        android: 'Bangers_400Regular',
                                        ios: 'Bangers_400Regular',
                                    }),
                                }}>Rapide</Text>
                            </View>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: "100",
                                color: theme ? "#fff" : "#313131",
                                marginBottom: 10,
                                textAlign: "center",
                                fontFamily: Platform.select({
                                    android: 'Bangers_400Regular',
                                    ios: 'Bangers_400Regular',
                                }),
                            }}>Seu restaurante favorito, na palma da mão!</Text>
                        </View>
                        <View>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        theme={{ colors: { primary: "#FF3B00" } }}
                                        textColor={theme ? "#fff" : "#313131"}
                                        style={[styles.input, { backgroundColor: theme ? "#00000026" : "#fff" }]}
                                        label="Email"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="email"
                                rules={{ required: true }}
                            />
                            <Text style={[styles.error, { opacity: errors.email ? 1 : 0, textAlign: "left", color: theme ? "#fff" : "#313131" }]}>Email é obrigatório</Text>
                        </View>
                        <View>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        secureTextEntry={seePassword}
                                        theme={{ colors: { primary: "#FF3B00" } }}
                                        textColor={theme ? "#fff" : "#313131"}
                                        style={[styles.input, { backgroundColor: theme ? "#00000026" : "#fff" }]}
                                        label="Senha"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="password"
                                rules={{ required: true }}
                            />
                            <TouchableOpacity
                                onPress={() => setSeePassword(!seePassword)}
                                className='absolute right-0 top-3 w-8 h-8 items-center justify-center '>
                                <Feather
                                    name={seePassword ? "eye-off" : "eye"}
                                    size={19}
                                    color={theme ? "#fff" : "#313131"}

                                />
                            </TouchableOpacity>
                            <Text style={[styles.error, { opacity: errors.password ? 1 : 0, textAlign: "left", color: theme ? "#fff" : "#313131" }]}>Senha é obrigatória</Text>
                        </View>
                        <TouchableOpacity style={{ width: width * 0.4, marginTop: 10, marginBottom: 10, alignSelf: "center" }}>
                            <Text style={{ textAlign: "center", color: theme ? "#fff" : "#313131" }}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                        <SubmitButtom handleSubmit={handleSubmit} login={login} />
                    </View>
                </View>

            </View>
        );
    }
    return children;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.65,
        width: '100%',
        padding: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffffff57',
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        gap: 10,
        width: "100%",
    },
    logo: {
        width: 70,
        height: 70,
        marginTop: 20,
        objectFit: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 40,
        fontSize: 13,
        width: width * 0.8,
        backgroundColor: '#fff',
    },
    error: {
        marginTop: 5,
        width: width * 0.8,
        color: '#0000004f',
        textAlign: 'center',
    },
});