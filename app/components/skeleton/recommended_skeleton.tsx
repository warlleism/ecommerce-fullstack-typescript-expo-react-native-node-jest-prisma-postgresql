import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width } = Dimensions.get("window");

export default function RecommendedSkeletonListProducts({ theme }: { theme: boolean }) {
    return (
        <View>
            <SkeletonLoader>
                <SkeletonLoader style={styles.container} highlightColor={theme ? "#7e7e7e" : "#e6e6e6"} boneColor={theme ? "#666666" : "#f2f2f2"} duration={500}>
                    <SkeletonLoader.Item
                        style={{
                            width: 250,
                            height: 200,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    />
                    <SkeletonLoader.Item
                        style={{
                            width: 250,
                            height: 200,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    />
                    <SkeletonLoader.Item
                        style={{
                            width: 250,
                            height: 200,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    />
                    <SkeletonLoader.Item
                        style={{
                            width: 250,
                            height: 200,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    />
                </SkeletonLoader>
            </SkeletonLoader>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        display: "flex",
        gap: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
