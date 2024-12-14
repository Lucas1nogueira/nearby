import { useEffect, useState, useRef } from "react";
import { Alert, Modal, View, StatusBar, ScrollView } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import Coupon from "@/components/market/coupon";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isCouponFetching, setCouponFetching] = useState(false);
  const [isCameraModalVisible, setCameraModelVisible] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();
  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert("Erro", "Você precisa habilitar o uso da câmera.");
      }
      qrLock.current = false;
      setCameraModelVisible(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível utilizar a câmera.");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponFetching(true);
      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error: any) {
      console.log("Erro: ", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível utilizar o cupom.");
    } finally {
      setCouponFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setCameraModelVisible(false);
    Alert.alert(
      "Cupom",
      "O resgate do cupom só pode ser feito uma única vez. Deseja realmente resgatá-lo?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
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
      <Modal style={{ flex: 1 }} visible={isCameraModalVisible}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setCameraModelVisible(false)}
            isLoading={isCouponFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
