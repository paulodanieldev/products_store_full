'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductTypes } from "@/types/ProductTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductTypeForm from "@/components/forms/ProductTypesForms";
import { Button } from "@/components/ui/button";

export default function ProductTypePage() {
  const [productTypes, setProductTypes] = useState<ProductTypes[]>();
  const [productType, setProductType] = useState<Partial<ProductTypes> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getAllProductTypes();
  }, []);

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
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productTypes && productTypes.map((productType: ProductTypes) => (
                  <tr key={productType.id}>
                    <td className="py-2 px-4 border-b text-center">{productType.id}</td>
                    <td className="py-2 px-4 border-b text-center">{productType.name}</td>
                    <td className="py-2 px-4 border-b text-center">
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

  async function getAllProductTypes() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productTypes`)

    if (!response.ok) {
      setError(new Error('Failed to fetch'));
      return;
    }

    const data = await response.json();
    setProductTypes(data);
    setLoading(false);
  }

  async function createProductType() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productTypes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productType),
    });

    if (!response.ok) {
      setError(new Error('Failed to create'));
      return;
    }
  }

  async function updateProductType() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productTypes/${productType?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productType),
    });

    if (!response.ok) {
      setError(new Error('Failed to update'));
      return;
    }
  }

  async function handleSave() {
    if (productType?.id) {
      await updateProductType();
    } else {
      await createProductType();
    }
    await getAllProductTypes();
    setProductType(null);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productTypes/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        setError(new Error('Failed to delete'));
        return;
      }
      getAllProductTypes();
    }
  }
}
