import React from "react";
import RegisterForm from "./register-form";

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
