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
import { Sales } from "@/types/Sales"

interface SaleFormProps {
    sale: Partial<Sales> | null;
    onSave: () => void;
    onCancel: () => void;
    onChange: (sale: Sales) => void;
}

export default function SaleForm({
    sale,
    onSave,
    onCancel,
    onChange,
}: SaleFormProps) {
  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{ sale?.id ? "Update" : "Create" } Product Type</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Sale Date</Label>
              <Input 
                id="sale_date" 
                type="date"
                onChange={(e) => onChange({ ...sale, sale_date: e.target.value })}
                value={sale?.sale_date}
                />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="total">Total</Label>
              <Input 
                id="total" 
                type="number"
                onChange={(e) => onChange({ ...sale, total: e.target.value })}
                value={sale?.total}
                />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="total_tax">Total Tax</Label>
              <Input 
                id="total_tax" 
                type="number"
                onChange={(e) => onChange({ ...sale, total_tax: e.target.value })}
                value={sale?.total_tax}
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
