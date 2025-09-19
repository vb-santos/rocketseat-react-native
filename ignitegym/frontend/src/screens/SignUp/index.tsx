import { useState } from "react";
import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { useAuth } from "@hooks/useAuth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";


type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}


const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o email").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter no mínimo 6 dígitos"),
  confirmPassword: yup
    .string()
    .required("Informe a senha novamente")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere"),
});


export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const toast = useToast();

  const handleGoBack = () => {
    navigation.navigate("signIn");
  }

  const handleSignUp = async (data: FormDataProps) => {
    try {
      setIsLoading(true);

      await api.post("/users", data);
      await signIn(data.email, data.password);

    } catch (error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      });
    }
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
                  errorMessage={errors.name?.message}
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
                  errorMessage={errors.email?.message}
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
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.confirmPassword?.message}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
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