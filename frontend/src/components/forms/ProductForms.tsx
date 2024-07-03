import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/types/Products"
import { ProductTypes } from "@/types/ProductTypes"

interface ProductFormProps {
    product: Partial<Product> | null;
    productTypes?: ProductTypes[];
    onSave: () => void;
    onCancel: () => void;
    onChange: (product: Product) => void;
}

export default function ProductForm({
    product,
    productTypes,
    onSave,
    onCancel,
    onChange,
}: ProductFormProps) {
  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{ product?.id ? "Update" : "Create" } Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Name of your project" 
                onChange={(e) => onChange({ ...product, name: e.target.value })}
                value={product?.name}
                />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                placeholder="Price of your product" 
                onChange={(e) => onChange({ ...product, price: e.target.value})}
                value={product?.price}
                />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="product-type">Product Type</Label>
              <Select
                onValueChange={(value) => onChange({ ...product, product_type_id: parseInt(value) })}
                value={product?.product_type_id?.toString()}
              >
                <SelectTrigger id="product-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {productTypes && productTypes.map((productType: ProductTypes) => (
                    <SelectItem key={productType.id} value={productType.id.toString()}>{productType.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </CardFooter>
    </Card>
  )
}
