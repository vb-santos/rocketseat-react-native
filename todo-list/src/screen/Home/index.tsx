import { View, Image } from 'react-native'
import { useState } from 'react'

import { Input } from '../../components/Input'

import { styles } from './styles'

const Home = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (<>
    <View style={styles.blackContainer}>
      <Image source={require('../../../assets/logoApp.png')} />
    </View>

    <View style={styles.greyContainer}>
      <Input 
        isPressed={isPressed}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    </View>
  </>)
}

export default Home