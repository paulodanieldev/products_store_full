'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Tax } from "@/types/Taxes";
import TaxForm from "@/components/forms/TaxForms";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context";

export default function ProductPage() {
  const {
    dataTax,
    dataProductType, 
    createTax,
    updateTax,
    deleteTax,
    loading, 
    error
  } = useAppContext();

  const [tax, setTax] = useState<Partial<Tax> | null>(null);

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
          productTypes={dataProductType}
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
                {dataTax && dataTax.map((tax: Tax) => (
                  <tr key={tax.id}>
                    <td className="py-2 px-4 border-b text-left">{tax.id}</td>
                    <td className="py-2 px-4 border-b text-left">{dataProductType?.find(pt => pt.id === tax.product_type_id)?.name}</td>
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

  async function handleSave() {
    if (tax?.id) {
      await updateTax(tax);
    } else {
      await createTax(tax);
    }
    setTax(null);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteTax(id);
    }
  }
}
