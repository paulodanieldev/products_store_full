'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Tax } from "@/types/Taxes";
import TaxForm from "@/components/forms/TaxForms";
import { Button } from "@/components/ui/button";
import { ProductTypes } from "@/types/ProductTypes";

export default function ProductPage() {
  const [taxes, setTaxes] = useState<Tax[]>();
  const [tax, setTax] = useState<Partial<Tax> | null>(null);
  const [productTypes, setProductTypes] = useState<ProductTypes[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getAllProductTypes();
    getAllTaxes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error && error?.message}</p>;
  }

  return (
    <ScrollArea className="desktop-body flex w-full h-full py-16 mx-auto items-center justify-center overflow-auto pl-[230px] pr-[50px]">
      <h1 className="text-4xl font-bold text-center mb-8">Taxes by Product type</h1>
      { tax ? (
        <TaxForm 
          tax={tax || {}}
          productTypes={productTypes}
          onSave={handleSave}
          onCancel={() => setTax(null)}
          onChange={setTax}
        />
      ):(
        <>
          <div className="flex justify-end w-full mb-4">
          <Button onClick={() => setTax({})}>Add New</Button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Product Type</th>
                  <th className="py-2 px-4 border-b text-left">Rate</th>
                  <th className="py-2 px-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {taxes && taxes.map((tax: Tax) => (
                  <tr key={tax.id}>
                    <td className="py-2 px-4 border-b text-left">{tax.id}</td>
                    <td className="py-2 px-4 border-b text-left">{productTypes?.find(pt => pt.id === tax.product_type_id)?.name}</td>
                    <td className="py-2 px-4 border-b text-left">{tax.tax_rate}</td>
                    <td className="py-2 px-4 border-b text-right">
                      <button onClick={() => setTax(tax)} className="text-blue-500 hover:underline mr-4">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tax.id)}
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

  async function getAllTaxes() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/taxes`)

    if (!response.ok) {
      setError(new Error('Failed to fetch'));
      return;
    }

    const data = await response.json();
    setTaxes(data);
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

  async function createTax() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/taxes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tax),
    });

    if (!response.ok) {
      setError(new Error('Failed to create'));
      return;
    }
  }

  async function updateTax() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/taxes/${tax?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tax),
    });

    if (!response.ok) {
      setError(new Error('Failed to update'));
      return;
    }
  }

  async function handleSave() {
    if (tax?.id) {
      await updateTax();
    } else {
      await createTax();
    }
    await getAllTaxes();
    setTax(null);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/taxes/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        setError(new Error('Failed to delete'));
        return;
      }
      getAllTaxes();
    }
  }
}
