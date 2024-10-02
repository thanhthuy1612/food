import accountApiRequest from "@/apiRequest/account";
import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import { handleErrorApi } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  let user = null;
  try {
    if (sessionToken) {
      const result = await accountApiRequest.me(sessionToken);
      user = result?.payload.data;
    }
  } catch (error) {
    handleErrorApi({ error });
  }
  return (
    <>
      <ul className="flex gap-5">
        <li>
          <Link href={"/products"}>Sản phẩm</Link>
        </li>
        {user ? (
          <>
            <li>Xin Chào {user.name}</li>
            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Đăng nhập</Link>
            </li>
            <li>
              <Link href={"/register"}>Đăng ký</Link>
            </li>
          </>
        )}
      </ul>
      <ModeToggle />
    </>
  );
}
