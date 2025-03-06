import { StatusBar } from 'react-native';
import { View } from 'react-native';

const App = () => {
  return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
}

export default App