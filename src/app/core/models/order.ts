import { Product } from "./product";

export class Order {
    orderRecieverName: string;
    orderProvince: string;
    orderMunicipio: string;
    orderAddress: string;
    orderReference: string;
    orderPhone: string;
    orderSucursal: string;
    orderNote: string;
    orderPrice: number;
    orderCancelMotive: string;
    productArray: Product[];



    orderId: number;
    orderAgency: string;
    orderClientName: string;
    orderClientNumber: number;
    orderAmount: number;
    orderCurrency: string;
    orderAlbaran: File;
    orderDays: number;
    state: string;
    orderMobile: string;
  }

