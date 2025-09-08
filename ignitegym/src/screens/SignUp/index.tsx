import { useState } from "react";
import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const handleGoBack = () => {
    navigation.navigate("signIn");
  }

  const handleSignUp = () => {
    console.log({
      name,
      email,
      password,
      confirmPassword,
    })
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          position="absolute"
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando na academia no fundo da página"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center gap="$2" flex={1}>
            <Heading color="$gray100">
              Crie sua conta
            </Heading>

            <Input
              placeholder="Nome"
              onChangeText={setName}
            />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />

            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={setPassword}
            />

            <Input
              placeholder="Confirme a Senha"
              secureTextEntry
              onChangeText={setConfirmPassword}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSignUp}
            />
          </Center>

          <Button
            title="Fazer Login"
            variant="outline"
            mt="$12"
            onPress={handleGoBack}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}