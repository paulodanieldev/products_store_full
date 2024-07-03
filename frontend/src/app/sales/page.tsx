'use client';
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";
import { Sales } from "@/types/Sales";
import SaleForm from "@/components/forms/SalesForms";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { useAppContext } from "@/context";

export default function SalePage() {
  const {
    dataSales,
    deleteSale,
    loading, 
    error
  } = useAppContext();

  // const [sales, setSales] = useState<Sales[]>();
  const [sale, setSale] = useState<Partial<Sales> | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<any>(null);

  // useEffect(() => {
  //   getAllSales();
  // }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error && error?.message}</p>;
  }

  return (
    <ScrollArea className="desktop-body flex w-full h-full py-16 mx-auto items-center justify-center overflow-auto pl-[230px] pr-[50px]">
      <h1 className="text-4xl font-bold text-center mb-8">Sales</h1>
      { sale ? (
        <SaleForm 
          sale={sale || {}}
          onBack={() => setSale(null)}
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
                {dataSales && dataSales.map((sale: Sales) => (
                  <tr key={sale.id}>
                    <td className="py-2 px-4 border-b text-left">{sale.id}</td>
                    <td className="py-2 px-4 border-b text-left">{formatDateTime(sale.sale_date)}</td>
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

  // async function getAllSales() {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales`)

  //   if (!response.ok) {
  //     setError(new Error('Failed to fetch'));
  //     return;
  //   }

  //   const data = await response.json();
  //   setSales(data);
  //   setLoading(false);
  // }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteSale(id);
    }
  }
}
