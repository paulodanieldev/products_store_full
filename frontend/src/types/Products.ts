export interface Product {
    id: number;
    name: string;
    price: string;
    product_type_id: number;
}

export interface ProductResponse {
    product: Product[];
}

export interface ProductCreate {
    name: string;
    price: number;
    product_type_id: number;
}