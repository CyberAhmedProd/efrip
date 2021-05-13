import { Product } from "./product";
import { User } from "./user";

export class Cart {
    id: string;
    product: Product;
    user: User;
    quantity: number;
    
}