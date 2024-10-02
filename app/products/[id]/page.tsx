import productApiRequest from "@/apiRequest/product";
import ProductForm from "@/components/products/product-form";
import React from "react";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  let productDetail = null;
  try {
    const result = await productApiRequest.getDetail(id);
    productDetail = result?.payload?.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      {productDetail ? (
        <ProductForm product={productDetail} />
      ) : (
        "Không tìm thấy sản phẩm"
      )}
    </div>
  );
}
