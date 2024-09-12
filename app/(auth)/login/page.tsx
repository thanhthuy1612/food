import React from "react";
import LoginForm from "./login-form";

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
