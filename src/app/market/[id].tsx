import { api } from "@/services/api";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { useEffect, useState, useRef } from "react";
import { Loading } from "@/components/loading";
import { View, Text, Alert, Modal, StatusBar } from "react-native";
import { Cover } from "@/components/market/cover";
import { Details, DetailsProps } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { ScrollView } from "react-native-gesture-handler";

type MarketParams = {
  id: string
}

type MarketProps = DetailsProps & {
  cover: string,
}

export default function Market() {
  const params = useLocalSearchParams<MarketParams>()

  const [market, setMarket] = useState<MarketProps>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingCoupon, setIsFetchingCoupon] = useState(false)
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false)
  const [_, requestPermission] = useCameraPermissions()

  const qrLock = useRef(false)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)

      setMarket(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        { text: "OK", onPress: () => router.back() }
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera")
      }

      setIsCameraModalVisible(true)
      qrLock.current = false
    } catch (error) {
      console.log(error)
      Alert.alert("Câmera", "Não foi possível utilizar a câmera")
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsFetchingCoupon(true)

      const { data } = await api.patch(`/coupons/${id}`)

      Alert.alert("Cupom", data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível utilizar o cupom")
    } finally {
      setIsFetchingCoupon(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsCameraModalVisible(false)

    Alert.alert("Cupom", "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?", [
      { style: "cancel", text: "Não" },
      { text: "Sim", onPress: () => getCoupon(id) }
    ])
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) return <Loading />

  if (!market) return <Redirect href="/home" />

  return (
    <View style={{ flex: 1 }} >
      <StatusBar barStyle="light-content" hidden={isCameraModalVisible} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
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
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsCameraModalVisible(false)} isLoading={isFetchingCoupon}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </ View>
  )
}