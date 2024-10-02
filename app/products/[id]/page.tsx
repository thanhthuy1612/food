import productApiRequest from "@/apiRequest/product";
import { handleErrorApi } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  let productDetail = null;
  try {
    const result = await productApiRequest.getDetail(id);
    productDetail = result?.payload?.data;
  } catch (error) {
    handleErrorApi({ error });
  }
  return (
    <div>
      {productDetail ? (
        <div>
          <Image
            src={productDetail.image}
            alt={productDetail.name}
            width={100}
            height={100}
            className="w-32 h-32 object-cover"
          />
          <h3>{productDetail.name}</h3>
          <div>{productDetail.description}</div>
          <div>{productDetail.price}</div>
        </div>
      ) : (
        "Không tìm thấy sản phẩm"
      )}
    </div>
  );
}
