'use client';
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";
import { Sales } from "@/types/Sales";
import SaleForm from "@/components/forms/SalesForms";
import { Button } from "@/components/ui/button";

export default function SalePage() {
  const [sales, setSales] = useState<Sales[]>();
  const [sale, setSale] = useState<Partial<Sales> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getAllSales();
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
      { sale ? (
        <SaleForm 
          sale={sale || {}}
          onSave={handleSave}
          onCancel={() => setSale(null)}
          onChange={setSale}
        />
      ):(
        <>
          <div className="flex justify-end w-full mb-4">
          <Button onClick={() => setSale({})}>Add New</Button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                  <th className="py-2 px-4 border-b text-left">Total Tax</th>
                  <th className="py-2 px-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales && sales.map((sale: Sales) => (
                  <tr key={sale.id}>
                    <td className="py-2 px-4 border-b text-left">{sale.id}</td>
                    <td className="py-2 px-4 border-b text-left">{sale.sale_date}</td>
                    <td className="py-2 px-4 border-b text-left">{sale.total}</td>
                    <td className="py-2 px-4 border-b text-left">{sale.total_tax}</td>
                    <td className="py-2 px-4 border-b text-right">
                      <button onClick={() => setSale(sale)} className="text-blue-500 hover:underline mr-4">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sale.id)}
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

  async function getAllSales() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales`)

    if (!response.ok) {
      setError(new Error('Failed to fetch'));
      return;
    }

    const data = await response.json();
    setSales(data);
    setLoading(false);
  }

  async function createSale() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sale),
    });

    if (!response.ok) {
      setError(new Error('Failed to create'));
      return;
    }
  }

  async function updateSale() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/${sale?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sale),
    });

    if (!response.ok) {
      setError(new Error('Failed to update'));
      return;
    }
  }

  async function handleSave() {
    if (sale?.id) {
      await updateSale();
    } else {
      await createSale();
    }
    await getAllSales();
    setSale(null);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        setError(new Error('Failed to delete'));
        return;
      }
      getAllSales();
    }
  }
}
