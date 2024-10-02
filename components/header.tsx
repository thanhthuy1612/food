import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountResType } from "@/schemaValidations/account.schema";
import Link from "next/link";
import React from "react";
export interface IHeaderProps {
  user: AccountResType["data"] | null;
}
export default async function Header({ user }: IHeaderProps) {
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
