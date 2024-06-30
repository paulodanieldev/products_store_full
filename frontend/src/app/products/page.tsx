'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/Products";
import { useEffect, useState } from "react";
import ProductForm from "@/components/forms/ProductForms";
import { Button } from "@/components/ui/button";
import { ProductTypes } from "@/types/ProductTypes";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>();
  const [product, setProduct] = useState<Partial<Product> | null>(null);
  const [productTypes, setProductTypes] = useState<ProductTypes[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getAllProductTypes();
    getAllProducts();
  }, []);

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
          productTypes={productTypes}
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
                {products && products.map((product: Product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 border-b text-left">{product.id}</td>
                    <td className="py-2 px-4 border-b text-left">{product.name}</td>
                    <td className="py-2 px-4 border-b text-left">{productTypes?.find(pt => pt.id === product.product_type_id)?.name}</td>
                    <td className="py-2 px-4 border-b text-left">{product.price}</td>
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

  async function getAllProducts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)

    if (!response.ok) {
      setError(new Error('Failed to fetch'));
      return;
    }

    const data = await response.json();
    setProducts(data);
    setLoading(false);
  }

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

  async function createProduct() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      setError(new Error('Failed to create'));
      return;
    }
  }

  async function updateProduct() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      setError(new Error('Failed to update'));
      return;
    }
  }

  async function handleSave() {
    if (product?.id) {
      await updateProduct();
    } else {
      await createProduct();
    }
    await getAllProducts();
    setProduct(null);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        setError(new Error('Failed to delete'));
        return;
      }
      getAllProducts();
    }
  }
}
