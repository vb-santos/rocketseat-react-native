import React, { createContext } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  return (
    <AuthContext.Provider value={{
      user: {
        id: "1",
        name: "Victor",
        email: "teste@gmail.com",
        avatar: "victor.png"
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}