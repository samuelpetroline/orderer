import { Address } from './models'


export class User {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    cpf: string;
    address: Address;
    balance: number;
    isAdmin: boolean;
    image: string;
}