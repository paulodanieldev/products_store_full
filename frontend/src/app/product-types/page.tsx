'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductTypes } from "@/types/ProductTypes";
import { useState } from "react";
import ProductTypeForm from "@/components/forms/ProductTypesForms";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context";

export default function ProductTypePage() {
  const {
    dataProductType, 
    createProductType,
    updateProductType,
    deleteProductType,
    loading, 
    error
  } = useAppContext();

  const [productType, setProductType] = useState<Partial<ProductTypes> | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error && error?.message}</p>;
  }

  return (
    <ScrollArea className="desktop-body flex w-full h-full py-16 mx-auto items-center justify-center overflow-auto pl-[230px] pr-[50px]">
      <h1 className="text-4xl font-bold text-center mb-8">Product Types</h1>
      { productType ? (
        <ProductTypeForm 
          productType={productType || {}}
          onSave={handleSave}
          onCancel={() => setProductType(null)}
          onChange={setProductType}
        />
      ):(
        <>
          <div className="flex justify-end w-full mb-4">
          <Button onClick={() => setProductType({})}>Add New</Button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataProductType && dataProductType.map((productType: ProductTypes) => (
                  <tr key={productType.id}>
                    <td className="py-2 px-4 border-b text-left">{productType.id}</td>
                    <td className="py-2 px-4 border-b text-left">{productType.name}</td>
                    <td className="py-2 px-4 border-b text-right">
                      <button onClick={() => setProductType(productType)} className="text-blue-500 hover:underline mr-4">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(productType.id)}
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
    if (productType?.id) {
      await updateProductType(productType);
    } else {
      await createProductType(productType as ProductTypes);
    }
    setProductType(null);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteProductType(id);
    }
  }
}
