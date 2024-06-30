export interface Sales {
    id: number;
    sale_date: string;
    total: number;
    total_tax: number;
}

export interface SalesResponse {
    sales: Sales[];
}

export interface SalesCreate {
    sale_date: string;
    total: number;
    total_tax: number;
}