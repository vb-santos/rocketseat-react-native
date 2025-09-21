import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useAuth } from "@hooks/useAuth";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { ToastMessage } from "@components/ToastMessage";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";


const profileSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string(),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .nullable()
    .optional()
    .transform((value) => !!value ? value : null),
  old_password: yup.string().nullable().optional(),
  confirm_password: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref("password"), null], "As senhas não conferem")
    .when("password", {
      is: (value: string) => value && value.length > 0,
      then: (schema) => schema
        .nullable()
        .required('Informe a confirmação da senha')
        .transform((value) => !!value ? value : null)
    }),
});


type FormDataProps = {
  name: string;
  email: string;
  password?: string | null;
  old_password?: string | null;
  confirm_password?: string | null;
}


export const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/victorb-s.png");
  
  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: undefined,
      old_password: undefined,
      confirm_password: undefined,
    },
    resolver: yupResolver(profileSchema as any)
  });

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              title="Tamanho da imagem muito grande!"
              description="Essa imagem é muito grande, escolha uma de até 5MB."
              onClose={() => toast.close(id)}
            />
          )
        });
      }

      const photoURI = photoSelected.assets[0].uri

      if (photoURI) {
        const photoInfo = await FileSystem.getInfoAsync(photoURI) as { size: number };

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return 
        }

        setUserPhoto(photoURI);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleProfileUpdate = async (data: FormDataProps) => {
    try {
      setIsLoading(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);
      await updateUserProfile(userUpdated);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Perfil atualizado com sucesso!"
            onClose={() => toast.close(id)}
          />
        )
      })
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível atualizar os dados. Tente novamente mais tarde"

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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto de perfil do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  bg="$gray600"
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
                  bg="$gray600"
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                  isReadOnly
                />
              )}
            />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  bg="$gray600"
                  placeholder="Senha antiga"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  bg="$gray600"
                  placeholder="Nova senha"
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange} }) => (
                <Input
                  bg="$gray600"
                  placeholder="Confirmar senha"
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              title="Atualizar"
              isLoading={isLoading}
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}