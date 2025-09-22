import React, { createContext, useEffect, useState } from "react";

import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";

import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const userAndTokenUpdate= async (userData: UserDTO, token: string) => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      console.error("Error setting auth header:", error);
      throw error;
    }
  }

  const storageUserAndTokenSave = async (userData: UserDTO, token: string, refresh_token: string) => {
    try {
      setIsLoadingUserStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave({ token, refresh_token });
    } catch (error)  {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        setIsLoadingUserStorageData(true);

        await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
        await userAndTokenUpdate(data.user, data.token);
      }
    } catch (error){
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO);
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const updateUserProfile = async (userUpdated: UserDTO) => {
    try{
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        await userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      updateUserProfile,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}