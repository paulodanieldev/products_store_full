export interface Tax {
    id: number;
    product_type_id: any;
    tax_rate: number;
}

export interface TaxResponse {
    product: Tax[];
}

export interface TaxCreate {
    product_type_id: number;
    tax_rate: number;
}