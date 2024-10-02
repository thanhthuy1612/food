import React from "react";
import RegisterForm from "./register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Thanh Thùy",
};

const Page: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-center">Đăng ký</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
