import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Box } from "@gluestack-ui/themed";

import { AuthRoutes } from "@routes/auth.routes";

import { AppRoutes } from "@routes/app.routes";

import { useAuth } from "@hooks/useAuth";

import { Loading } from "@components/Loading";

export const Routes = () => {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        { user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}