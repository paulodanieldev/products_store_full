import * as React from "react"

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
import { ProductTypes } from "@/types/ProductTypes"

interface ProductTypeFormProps {
    productType: Partial<ProductTypes> | null;
    onSave: () => void;
    onCancel: () => void;
    onChange: (productType: ProductTypes) => void;
}

export default function ProductTypeForm({
    productType,
    onSave,
    onCancel,
    onChange,
}: ProductTypeFormProps) {
  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{ productType?.id ? "Update" : "Create" } Product Type</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Name of your project" 
                onChange={(e) => onChange({ ...productType, name: e.target.value, id: productType?.id || 0 })}
                value={productType?.name}
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
