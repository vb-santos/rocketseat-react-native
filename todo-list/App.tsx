import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import Home from './src/screen/Home';

const App = () => {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    <Home />
    </View>
  );
}

export default App