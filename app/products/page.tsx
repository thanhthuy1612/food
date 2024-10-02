import productApiRequest from "@/apiRequest/product";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteProduct from "@/components/products/delete-product";

export default async function Page() {
  const result = await productApiRequest.getList();
  const productList = result?.payload?.data ?? [];
  return (
    <div>
      <h1>Product list</h1>
      <Link href={"/products/add"}>
        <Button variant="secondary">Thêm sản phẩm</Button>
      </Link>
      <div className="space-y-5">
        {productList.map((item) => (
          <div key={item.id} className="flex gap-5">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="w-32 h-32 object-cover"
            />
            <h3>{item.name}</h3>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div className="flex gap-3">
              <Link href={`/products/${item.id}`}>
                <Button variant="outline">Sửa</Button>
              </Link>
              <DeleteProduct product={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
