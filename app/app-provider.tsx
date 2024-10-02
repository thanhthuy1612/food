"use client";
import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import React from "react";

type User = AccountResType["data"] | null;

export interface IAppProviderProps {
  children: React.ReactNode;
  initialSessionToken: string;
  user: User;
}

const AppContext = React.createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = "",
  user: userProps,
}: IAppProviderProps) {
  const [user, setUser] = React.useState<User>(userProps);
  React.useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
