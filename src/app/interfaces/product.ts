export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    urlImage: string;
    state: boolean;
    userId: string;    
    createdAt: string;
    updatedAt: string;
    __v: number;
    stock: number;
}
