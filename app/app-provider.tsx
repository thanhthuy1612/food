"use client";
import { clientSessionToken } from "@/lib/http";
import React from "react";

export default function AppProvider({
  children,
  initialSessionToken,
}: {
  children: React.ReactNode;
  initialSessionToken: string;
}) {
  React.useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return children;
}
