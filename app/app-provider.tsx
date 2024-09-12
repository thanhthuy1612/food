"use client";
import React, { createContext } from "react";

const AppContext = createContext({
  sessionToken: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSessionToken: (sessionToken: string) => {},
});

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken,
}: {
  children: React.ReactNode;
  initialSessionToken: string;
}) {
  const [sessionToken, setSessionToken] =
    React.useState<string>(initialSessionToken);

  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}
