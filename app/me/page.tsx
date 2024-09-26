import accountApiRequest from "@/apiRequest/account";
import { cookies } from "next/headers";
import React from "react";
import ProfileForm from "@/app/me/profile-form";

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value ?? "");
  return (
    <div>
      <h1>Profile</h1>
      {result?.payload.data && <ProfileForm profile={result?.payload.data} />}
    </div>
  );
}
