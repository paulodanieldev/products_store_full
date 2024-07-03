'use client';
import { ProductTypes } from '@/types/ProductTypes';
import { Product } from '@/types/Products';
import { Sales } from '@/types/Sales';
import { Tax } from '@/types/Taxes';
import {createContext,useContext, useEffect, useState} from 'react';

interface AppContextType {
    getData: (endpoint: string) => Promise<any>;
    postData: (endpoint: string, data: any) => Promise<any>;
    createProduct: (product: Partial<Product> | null) => Promise<void>;
    updateProduct: (product: Partial<Product> | null) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    createProductType: (productType: Partial<ProductTypes> | null) => Promise<void>;
    updateProductType: (productType: Partial<ProductTypes> | null) => Promise<void>;
    deleteProductType: (id: number) => Promise<void>;
    createTax: (tax: Partial<Tax> | null) => Promise<void>;
    updateTax: (tax: Partial<Tax> | null) => Promise<void>;
    deleteTax: (id: number) => Promise<void>;
    deleteSale: (id: number) => Promise<void>;
    dataProduct: Product[];
    dataProductType: ProductTypes[];
    dataTax: Tax[];
    dataSales: Sales[];
    loading?: boolean;
    error?: any;
}

const AppContext = createContext<AppContextType>({} as AppContextType)

export function AppWrapper({children}: {children: React.ReactNode}) {
    const [dataProduct, setDataProduct] = useState<Product[]>([]);
    const [dataProductType, setDataProductType] = useState<ProductTypes[]>([])
    const [dataTax, setDataTax] = useState<Tax[]>([]);
    const [dataSales, setDataSales] = useState<Sales[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [
                productData, 
                productTypeData,
                taxData,
                saleData
            ] = await Promise.all([
                getData('products'), 
                getData('productTypes'),
                getData('taxes'),
                getData('sales')
            ]);
            setDataProduct(productData);
            setDataProductType(productTypeData);
            setDataTax(taxData);
            setDataSales(saleData);
            setLoading(false);
        } catch (error:any) {
            console.error("Error fetching data:", error);
            setError(error);
            setLoading(false);
        }
    };

    // API FUNCTIONS - BEGIN ----------------------------------------------

    const getData = async (endpoint: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    };

    const postData = async (endpoint: string, data: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    const putData = async (endpoint: string, data: any, id:number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    const deleteData = async (endpoint: string, id: number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }

    // API FUNCTIONS - END ------------------------------------------------

    // PRODUCT FUNCTIONS - BEGIN ------------------------------------------

    async function createProduct(product: Product) {
        try {
            setLoading(true);
            const newProduct = await postData('products', product);
            setDataProduct([...dataProduct, newProduct]);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async function updateProduct(product: Product) {
        try {
            setLoading(true);
            const updatedProduct = await putData('products', product, product.id);
            const index = dataProduct.findIndex((p) => p.id === product.id);
            const updatedProducts = [...dataProduct];
            updatedProducts[index] = updatedProduct;
            setDataProduct(updatedProducts);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error updating product:', error);
            throw error;
        }
    }

    async function deleteProduct(id: number) {
        try {
            setLoading(true);
            await deleteData('products', id);
            const updatedProducts = dataProduct.filter((p) => p.id !== id);
            setDataProduct(updatedProducts);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    // PRODUCT FUNCTIONS - END --------------------------------------------

    // PRODUCT TYPE FUNCTIONS - BEGIN -------------------------------------

    async function createProductType(productType: ProductTypes) {
        try {
            setLoading(true);
            const newProductType = await postData('productTypes', productType);
            setDataProductType([...dataProductType, newProductType]);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error creating product type:', error);
            throw error;
        }
    }

    async function updateProductType(productType: ProductTypes) {
        try {
            setLoading(true);
            const updatedProductType = await putData('productTypes', productType, productType.id);
            const index = dataProductType.findIndex((pt) => pt.id === productType.id);
            const updatedProductTypes = [...dataProductType];
            updatedProductTypes[index] = updatedProductType;
            setDataProductType(updatedProductTypes);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error updating product type:', error);
            throw error;
        }
    }

    async function deleteProductType(id: number) {
        try {
            setLoading(true);
            await deleteData('productTypes', id);
            const updatedProductTypes = dataProductType.filter((pt) => pt.id !== id);
            setDataProductType(updatedProductTypes);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error deleting product type:', error);
            throw error;
        }
    }

    // PRODUCT TYPE FUNCTIONS - END --------------------------------

    // TAX FUNCTIONS - BEGIN ----------------------------------------

    async function createTax(tax: Tax) {
        try {
            setLoading(true);
            const newTax = await postData('taxes', tax);
            setDataTax([...dataTax, newTax]);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error creating tax:', error);
            throw error;
        }
    }

    async function updateTax(tax: Tax) {
        try {
            setLoading(true);
            const updatedTax = await putData('taxes', tax, tax.id);
            const index = dataTax.findIndex((t) => t.id === tax.id);
            const updatedTaxes = [...dataTax];
            updatedTaxes[index] = updatedTax;
            setDataTax(updatedTaxes);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error updating tax:', error);
            throw error;
        }
    }

    async function deleteTax(id: number) {
        try {
            setLoading(true);
            await deleteData('taxes', id);
            const updatedTaxes = dataTax.filter((t) => t.id !== id);
            setDataTax(updatedTaxes);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error deleting tax:', error);
            throw error;
        }
    }

    // TAX FUNCTIONS - END ------------------------------------------

    // SALES FUNCTIONS - BEGIN ----------------------------------------

    async function deleteSale(id: number) {
        try {
            setLoading(true);
            await deleteData('sales', id);
            const updatedSales = dataSales.filter((s) => s.id !== id);
            setDataSales(updatedSales);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error deleting sale:', error);
            throw error;
        }
    }

    // SALES FUNCTIONS - END ------------------------------------------

    return (
        <AppContext.Provider value={{
            getData,
            postData,
            createProduct,
            updateProduct,
            deleteProduct,
            createProductType,
            updateProductType,
            deleteProductType,
            createTax,
            updateTax,
            deleteTax,
            deleteSale,
            dataProduct,
            dataProductType,
            dataTax,
            dataSales,
            loading,
            error
        }}>
            {children}
        </AppContext.Provider>
    )
} 

export function useAppContext() {
  return useContext(AppContext)
}