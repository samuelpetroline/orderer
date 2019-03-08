import { OrderProduct } from "./order.product";
import { User } from "./user";

export class Order {
    _id: string;
    products: OrderProduct[];
    user: User;
    createdDate: Date;
    totalValue: number;
    discountValue: number;
    status: Status;
}

export enum Status {
    New,
    Waiting,
    Doing,
    Done
}