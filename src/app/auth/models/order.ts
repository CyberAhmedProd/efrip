import { ItemsList } from "@ng-select/ng-select/lib/items-list";
import { Address } from "./address";
import { LigneItem } from "./ligneItem";

import { Payment } from "./payment";

import { User } from "./user";

export class Order{
    
    id : string;
    user : User;
    billingAddress : Address
    status : string;
    orderedDate : Date;
    shippedDate : Date;
    fullName : string;
    mobile : number;
    flat : string;
    near : string;
    totalPrice : number;
    listLigneItem : LigneItem[];
    payment : Payment;
    createdDate:Date;
    lastModified:Date;
}