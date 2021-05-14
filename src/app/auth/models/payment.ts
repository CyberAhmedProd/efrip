
import { ItemsList } from "@ng-select/ng-select/lib/items-list";
import { Address } from "node:cluster";

import { User } from "./user";

export class Payment{
    
    id : string;
    paidDate : Date;
    totalPaid : number;
    details : String;
}