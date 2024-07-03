'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/Products";
import { useState } from "react";
import ProductForm from "@/components/forms/ProductForms";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useAppContext } from "@/context";

export default function ProductPage() {
  const {
    dataProduct, 
    dataProductType, 
    createProduct,
    updateProduct,
    deleteProduct,
    loading, 
    error
  } = useAppContext();

  const [product, setProduct] = useState<Partial<Product> | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error && error?.message}</p>;
  }

  return (
    <ScrollArea className="desktop-body flex w-full h-full py-16 mx-auto items-center justify-center overflow-auto pl-[230px] pr-[50px]">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
      { product ? (
        <ProductForm 
          product={product || {}}
          productTypes={dataProductType}
          onSave={handleSave}
          onCancel={() => setProduct(null)}
          onChange={setProduct}
        />
      ):(
        <>
          <div className="flex justify-end w-full mb-4">
          <Button onClick={() => setProduct({})}>Add New</Button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Product Type</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataProduct && dataProduct.map((product: Product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 border-b text-left">{product.id}</td>
                    <td className="py-2 px-4 border-b text-left">{product.name}</td>
                    <td className="py-2 px-4 border-b text-left">{dataProductType?.find(pt => pt.id === product.product_type_id)?.name}</td>
                    <td className="py-2 px-4 border-b text-left">{formatCurrency(parseFloat(product.price))}</td>
                    <td className="py-2 px-4 border-b text-right">
                      <button onClick={() => setProduct(product)} className="text-blue-500 hover:underline mr-4">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>  
        </>
      )}
    </ScrollArea>
  );

  async function handleSave() {
    if (product?.id) {
      await updateProduct(product);
    } else {
      await createProduct(product as Product);
    }
    setProduct(null);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteProduct(id);
    }
  }
}
