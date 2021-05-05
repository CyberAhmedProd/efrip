import { Category } from "./category";
import { Image } from "./Image";
import { User } from "./user";



export class Product {
    id:string;
    name:string;
    user:User;
    category:Category;
    details:string;
    price:number;
    description:string;
    featured:boolean;
    images:[Image];
    createdDate:Date;
    lastModified:Date;

}