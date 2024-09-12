import accountApiRequest from "@/apiRequest/account";
import Profile from "./profile";
import { cookies } from "next/headers";
import React from "react";

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value ?? "");
  return (
    <div>
      <h1>Profile</h1>
      <div>Hello {result.payload.data?.name}</div>
      <Profile />
    </div>
  );
}
