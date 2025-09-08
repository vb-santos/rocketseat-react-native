import { useState } from "react";
import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export const SignUp = () => {
  const { control } = useForm();

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const handleGoBack = () => {
    navigation.navigate("signIn");
  }

  const handleSignUp = () => {

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

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
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