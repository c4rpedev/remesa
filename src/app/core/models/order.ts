import { Product } from "./product";

export class Order {    
    orderId: string;
    orderAgency: string;
    orderClientName: string;
    orderRecieverName: string;
    orderProvince: string;
    orderMunicipio: string;
    orderAddress: string;
    orderPhone: string;
    orderSucursal: string;
    productArray: Product[];  
    state: string;
  }
  
