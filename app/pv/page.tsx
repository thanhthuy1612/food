import React from "react";

export default function Page() {
  const ftest = (arrs: number[]) => {
    return arrs.reduce((result: number, value, index) => {
      const find = arrs.fill(index + 1);
      if (find) {
        result = Number(value);
      }
      return result;
    }, 1);
  };
  console.log(ftest([4, 1, 2, 1, 2]), "result");
  return <div>123</div>;
}
