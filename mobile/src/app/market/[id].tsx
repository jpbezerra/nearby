import { View, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Coupon } from "@/components/market/coupon";
import { Details, PropsDetails } from "@/components/market/details";

import { api } from "@/services/api";

type DataProps = PropsDetails & {
    cover: string
}

export default function Market() {
    const [ data, setData ] = useState<DataProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [coupon, setCoupon] = useState<string | null>(null);
    const [isVisibleCameraModal, setVisibleCameraModal] = useState(false);
    const [couponIsFetching, setCouponIsFetching] = useState(false);

    const [permission, requestPermission] = useCameraPermissions();
    const params = useLocalSearchParams<{ id: string }>();
    const qrLock = useRef(false);
    console.log(params.id);

    async function fetchMarket() {
        try {
            const { data } = await api.get(`/markets/${params.id}`);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível buscar mercado", [
                { text: "OK", onPress: () => router.back() }
            ]);
        }
    }

    async function handleOpenCamera() {
        try {
            const { granted } = await requestPermission();

            if (!granted) {
                return Alert.alert("Câmera", "Você precisa permitir o acesso a câmera");
            }

            qrLock.current = false;
            setVisibleCameraModal(true);
        } catch (error) {
            console.log(error);
            Alert.alert("Câmera", "Não foi possível abrir a câmera");
        }
    }

    async function getCoupon(id: string) {
        try {
            setCouponIsFetching(true);

            const { data } = await api.patch("/coupons/" + id);

            Alert.alert("Cupom", data.coupon);
            setCoupon(data.coupon);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível buscar cupom", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } finally {
            setCouponIsFetching(false);
        }
    }

    function handleUseCoupon(id: string) {
        setVisibleCameraModal(false);

        Alert.alert("Cupom", "Não é possível utilizar um cupom resgatado. Deseja realmente resgatar o cupom?", 
            [
                {style: "cancel", text: "Não"},
                {text: "Sim", onPress: () => getCoupon(id)}
            ]
        );
    }

    useEffect(() => {
        fetchMarket();
    }
    , [params.id, coupon]);

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <Redirect href="/home" />
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover} />
                <Details data={data} />
                {coupon && <Coupon code={coupon} />}
            </ScrollView>

            <View style={{ padding: 32 }}>
                <Button onPress={handleOpenCamera}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
                <CameraView 
                    style={{ flex: 1 }} 
                    facing="back" 
                    onBarcodeScanned={({ data }) => { 
                        if (data && !qrLock.current) {
                            qrLock.current = true;
                            setTimeout(() => {
                                handleUseCoupon(data);
                            }, 500);
                        }    
                    }} 
                />

                <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                    <Button onPress={() => setVisibleCameraModal(false)} isLoading={couponIsFetching}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}