import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sales } from "@/types/Sales"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Product } from "@/types/Products"

interface SaleFormProps {
    sale: Partial<Sales> | null;
    onBack: () => void;
}

interface ItemProps {
  sale_id: number;
  product_id: number;
  quantity: number;
  price: number;
  total: number;
  tax: number;
}

export default function SaleForm({
    sale,
    onBack,
}: SaleFormProps) {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [item, setItem] = useState<ItemProps>({
    sale_id: 0,
    product_id: 0,
    quantity: 0,
    price: 0,
    total: 0,
    tax: 0
  });
  const [saleTotal, setSaleTotal] = useState(0);
  const [saleTax, setSaleTax] = useState(0);

  async function handleAddItem() {
    // Calculate total
    const total = item.quantity * item.price;
    item.tax = await calculateTax(item.product_id, total);
    item.total = total + item.tax;

    setSaleTotal(saleTotal + item.total);
    setSaleTax(saleTax + item.tax);

    setItems([...items, item]);
    setItem({ 
      sale_id: 0, 
      product_id: 0, 
      quantity: 0, 
      price: 0, 
      total: 0,
      tax: 0
    });
  }

  async function calculateTax(product_id: number, total: number): Promise<number>{
    const tax = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/calculateTax`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id, total }),
    });

    if (!tax.ok) {
      setError(new Error('Failed to fetch'));
      return 0;
    }

    const data = await tax.json();
    return data.tax_result;
  }

  function handleRemoveItem(index: number) {
    const findItem = items.filter((_, i) => i === index);
    setSaleTotal(saleTotal - findItem[0].total);
    setSaleTax(saleTax - findItem[0].tax);

    setItems(items.filter((_, i) => i !== index));
  }

  function handleItemChange(index: number) {
    const findItem = items.filter((_, i) => i === index);
    setItem(findItem[0]);
  }

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

  async function getAllItems() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/${sale?.id}/getSaleItems`)

    if (!response.ok) {
      setError(new Error('Failed to fetch'));
      return;
    }

    const data = await response.json();
    setItems(data);
    setLoading
  }

  useEffect(() => {
    getAllProducts();
    if (sale?.id) {
      getAllItems();
      setSaleTotal(sale?.total || 0);
      setSaleTax(sale?.total_tax || 0);
    }
  }, []);

  useEffect(() => {
    const updateItemWithTax = async () => {
      if (item?.product_id > 0 && item?.quantity > 0) {
        const product = products?.find(pt => pt.id === item.product_id);
        if (product && product.price) {
          const productPrice = Number(product.price); // Garante que productPrice é um número
          if (!isNaN(productPrice)) { // Verifica se productPrice é um número válido
            let total = item.quantity * productPrice;
            const tax = await calculateTax(item.product_id, total);
            setItem({
              ...item,
              total: +(total + tax).toFixed(2),
              price: +productPrice.toFixed(2),
              tax: +tax.toFixed(2)
            });
          }
        }
      }
    };
    updateItemWithTax();
  }, [item?.product_id, item?.quantity, products]);

  async function createSale() {
    if (items.length === 0) {
      setError(new Error('Please add items'));
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/createSalesItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: saleTotal,
        total_tax: saleTax,
        items: items,
      }),
    });

    if (!response.ok) {
      setError(new Error('Failed to create'));
      return;
    }

    if (response.ok) {
      onBack();
    }
  }

  async function updateSale() {
    if (items.length === 0) {
      setError(new Error('Please add items'));
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/${sale?.id}/updateSalesItems`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: saleTotal,
        total_tax: saleTax,
        items: items,
      }),
    });

    if (!response.ok) {
      setError(new Error('Failed to update'));
      return;
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error && error?.message}</p>;
  }

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{ sale?.id ? "Update" : "Create" } Sale</CardTitle>
        <div className="flex justify-end">
          <div className="space-x-2">
            <span>Total: {saleTotal}</span>
            <span>Tax: {saleTax}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-type">Product</Label>
              <Select
                onValueChange={(value) => setItem({ ...item, product_id: parseInt(value) })}
                value={item?.product_id?.toString()}
              >
                <SelectTrigger id="product-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {products && products.map((product: Product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>{product.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty">Qty</Label>
              <Input 
                onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) })}
                value={item?.quantity?.toString()}
                id="qty" name="qty" required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                value={item?.price?.toString()}
                id="price" name="price" required disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax">Tax</Label>
              <Input 
                value={item?.tax?.toString()}
                id="tax" name="tax" required disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Total</Label>
              <Input 
                value={item?.total?.toString()}
                id="total" name="total" required disabled
              />
            </div>
            <div className="flex items-end justify-end">
              <Button onClick={handleAddItem}>Add</Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-10"></div>
        <div className="overflow-x-auto w-full mt-10">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Qty</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">Tax</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                  <th className="py-2 px-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items && items.map((item: ItemProps, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-left">{products?.find(pt => pt.id === item.product_id)?.name}</td>
                    <td className="py-2 px-4 border-b text-left">{item.quantity}</td>
                    <td className="py-2 px-4 border-b text-left">{item.price}</td>
                    <td className="py-2 px-4 border-b text-left">{item.tax}</td>
                    <td className="py-2 px-4 border-b text-left">{item.total}</td>
                    <td className="py-2 px-4 border-b text-right">
                      {/* <button onClick={() => handleItemChange(index)} className="text-blue-500 hover:underline mr-4">
                        Edit
                      </button> */}
                      <button
                        onClick={() => handleRemoveItem(index)}
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Cancel</Button>
        {sale?.id ? (
          <Button onClick={updateSale}>Update Sale</Button>
        ) : (
          <Button onClick={createSale}>Save Sale</Button>
        )}
      </CardFooter>
    </Card>
  )
}
