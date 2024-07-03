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
import { Tax } from "@/types/Taxes"
import { ProductTypes } from "@/types/ProductTypes"

interface TaxFormProps {
    tax: Partial<Tax> | null;
    productTypes?: ProductTypes[];
    onSave: () => void;
    onCancel: () => void;
    onChange: (product: Tax) => void;
}

export default function TaxForm({
    tax,
    productTypes,
    onSave,
    onCancel,
    onChange,
}: TaxFormProps) {
  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{ tax?.id ? "Update" : "Create" } Tax</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="product-type">Product Type</Label>
              <Select
                onValueChange={(value) => onChange({ ...tax, product_type_id: parseInt(value) })}
                value={tax?.product_type_id?.toString()}
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                placeholder="Price of your product" 
                onChange={(e) => onChange({ ...tax, tax_rate: e.target.value})}
                value={tax?.tax_rate}
                />
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
