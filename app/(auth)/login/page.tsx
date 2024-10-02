import React from "react";
import LoginForm from "./login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Thanh Thùy",
};

const Page: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
