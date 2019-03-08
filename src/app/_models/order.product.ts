import { Product } from "./product";

export class OrderProduct {
    _id: string;
    item: Product;
    amount: number;
    unitValue: number;
    totalValue: number;
}