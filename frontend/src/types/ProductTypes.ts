export interface ProductTypes {
    id: number;
    name: string;
}

export interface ProductTypesResponse {
    productTypes: ProductTypes[];
}

export interface ProductTypesCreate {
    name: string;
}