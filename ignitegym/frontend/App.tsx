import { StatusBar } from 'react-native';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";

import { AuthContextProvider } from "@contexts/AuthContext";
import React from "react";


const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <GluestackUIProvider config={config}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AuthContextProvider>
          { fontsLoaded ? (<Routes />) : <Loading />}
        </AuthContextProvider>
    </GluestackUIProvider>
  );
}

export default App;