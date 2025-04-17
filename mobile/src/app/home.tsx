import { useEffect, useState } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native"
import MapView, { Callout, Marker } from "react-native-maps";
import { router } from "expo-router";

import { api } from "@/services/api";
import { colors, fontFamily } from "@/styles/theme";

import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { Categories, CategoriesProps } from "@/components/categories";

type MarketProps = PlaceProps & {
    latitude: number,
    longitude: number
};

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494   
}

{/* 
    Para pegar de forma automatica so fazer 
    
    npx expo install expo-location
    
    import * as Location from "expo-location";

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const location = await Location.getCurrentPositionAsync();
                console.log(location);
            }

        } catch (error) {
            console.log(error);
            Alert.alert("Localização", "Erro ao buscar localização");
        }   
    }

    e chamar essa função como um useEffect separado ou dentro do useEffect de caregoria

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        getCurrentLocation();
        fetchCategories(); 
    }
    , []);
*/}

export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState("");
    const [market, setMarket] = useState<MarketProps[]>([]);

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);

        } catch (error) {
            console.log(error);
            Alert.alert("Categorias", "Erro ao buscar categorias");
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) {
                return
            }

            const { data } = await api.get("/markets/category/" + category);
            setMarket(data);

        } catch (error) {
            console.log(error);
            Alert.alert("Locais", "Erro ao buscar locais");
        }
    }

    useEffect(() => {
        fetchCategories(); 
    }
    , []);

    useEffect(() => {
        fetchMarkets();
    }, [category]);

    return (
        <View style={{flex: 1, backgroundColor: "#CECECE"}}>
            <Categories 
                data={categories} 
                onSelect={setCategory} 
                selected={category}
            />

            <MapView 
                style={{flex: 1}}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            > 
                <Marker 
                    identifier="current"
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude
                    }}
                    image={require("@/assets/location.png")}
                />

                {
                    market.map((item) => (
                        <Marker 
                            key={item.id}
                            identifier={item.id}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude
                            }}
                            image={require("@/assets/pin.png")}
                        >
                            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                                <View>
                                    <Text style={{
                                        fontSize:14, 
                                        color: colors.gray[600], 
                                        fontFamily: fontFamily.medium
                                        }}
                                    >
                                        {item.name}
                                    </Text>

                                    <Text style={{
                                        fontSize:12, 
                                        color: colors.gray[600], 
                                        fontFamily: fontFamily.regular
                                        }}
                                    >
                                        {item.address}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker> 
                    ))
                }

            </MapView>

            <Places data={market} />
        </View>  
    );
}