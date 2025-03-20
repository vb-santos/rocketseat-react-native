import { ActivityIndicator } from "react-native";
import Groups from "@screens/Groups";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <Groups />
  )
}

export default App