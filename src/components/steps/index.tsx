import { View, Text } from "react-native";
import { style } from "./styles";
import { Step } from "../step";

export function Steps() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Veja como funciona:</Text>
      <Step
        iconName="store"
        title="Encontre estabelecimentos"
        description="Veja locais perto de você que são parceiros do Nearby"
      />
      <Step
        iconName="qr-code"
        title="Ative o cupom com QR Code"
        description="Escaneie o código no estabelecimento para usar o benefício"
      />
      <Step
        iconName="attach-money"
        title="Garanta vantagens perto de você"
        description="Ative cupons onde estiver, em diferentes tipos de estabelecimento"
      />
    </View>
  );
}
