import React from "react";

export default function Page() {
  const singleOne = (arrs: number[]) => {
    const object = arrs.reduce((result: any, num) => {
      result[num] = (result[num] ?? 0) + 1;
      return result;
    }, {});

    const array = Object.entries(object);
    // console.log(array)

    return array.reduce((result: number, value) => {
      if (value[1] === 1) {
        result = Number(value[0]);
      }
      return result;
    }, 0);
  };
  console.log(singleOne([4, 1, 2, 1, 2]), "result");
  return <div>123</div>;
}
