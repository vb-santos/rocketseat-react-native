import {useNavigation} from "@react-navigation/native";

import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from '@assets/logo.png';

type Props = {
  showBackButton?: boolean;
}

export const Header = ({ showBackButton = false }: Props) => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.navigate('groups');
    // Usar o navigate para voltar para tela inicial se necessário
    // Caso desejar voltar a tela anterior, utilizar 'goBack()'
  }

  return (
    <Container>
      {
        showBackButton && (
          <BackButton onPress={handleGoBack}>
            <BackIcon />
          </BackButton>
        )
      }
      <Logo source={logoImg}/>
    </Container>
  )
}