import { ImageBackground, View } from "react-native";
import { router } from "expo-router";
import { style } from "./styles";
import { Button } from "@/components/button";

type Props = {
  uri: string;
};

export function Cover({ uri }: Props) {
  return (
    <ImageBackground source={{ uri }} style={style.container}>
      <View style={style.header}>
        <Button style={style.backButton} onPress={() => router.back()}>
          <Button.Icon iconName="arrow-back" />
        </Button>
      </View>
    </ImageBackground>
  );
}
