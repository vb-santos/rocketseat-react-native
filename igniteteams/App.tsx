import { StatusBar } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import Groups from "@screens/Groups";

import { Loading } from "@components/Loading";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <Loading/>
  }

  return (<>
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />
    <Groups />
  </>)
}

export default App