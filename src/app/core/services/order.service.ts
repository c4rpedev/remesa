import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import * as Parse from 'parse'


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  createOrder(order: Order, user: string){
    (async () => {
      const myNewObject = new Parse.Object('order');
      myNewObject.set('orderId', order.orderId);
      myNewObject.set('orderClientName', order.orderClientName);
      myNewObject.set('orderClientNumber', order.orderClientNumber);
      myNewObject.set('orderAmount', order.orderAmount);
      myNewObject.set('orderCurrency', order.orderCurrency);
      myNewObject.set('orderAlbaran', order.orderAlbaran);
      myNewObject.set('orderDays', order.orderDays);
      myNewObject.set('state', order.state);

      myNewObject.set('orderAgency', order.orderAgency);
      // myNewObject.set('orderAgency', user);
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log('order created', result);
      } catch (error) {
        console.error('Error while creating order: ', error);
      }
    })();
  }
  updateOrder(order: Order, orderId: string, img: string, hasAlbaran: boolean){
    console.log('asdfsd');

    console.log(img);

    (async () => {
      const query = new Parse.Query('order');
      try {
        // here you put the objectId that you want to update
        const myNewObject = await query.get(orderId);
        myNewObject.set('orderCancelMotive', order.orderCancelMotive);

        myNewObject.set('orderId', order.orderId);
        myNewObject.set('orderClientName', order.orderClientName);
        myNewObject.set('orderClientNumber', order.orderClientNumber);
        myNewObject.set('orderAmount', order.orderAmount);
        myNewObject.set('orderCurrency', order.orderCurrency);
        myNewObject.set('orderDays', order.orderDays);
        myNewObject.set('state', order.state);

        myNewObject.set('orderAgency', order.orderAgency);


        if(hasAlbaran){
          console.log('ALBARAN!!!!')
           myNewObject.set('orderAlbaran', new Parse.File("albaranes.jpg", { uri: img }));
        }

        try {
          const response = await myNewObject.save();
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          // Access the Parse Object attributes using the .GET method
          console.log(response.get('orderProvince'));
          console.log(response.get('orderMunicipio'));
          console.log(response.get('orderAddress'));
          console.log(response.get('orderPhone'));
          console.log(response.get('productArray'));
          console.log(response.get('orderId'));
          console.log(response.get('state'));
          console.log(response.get('orderClientName'));
          console.log(response.get('orderRecieverName'));
          console.log('order updated', response);
        } catch (error) {
          console.error('Error while updating order', error);
          }
        } catch (error) {
          console.error('Error while retrieving object order', error);
        }
    })();
  }

  updateOrderState(orderId: string, state: string){
    (async () => {
      const query = new Parse.Query('order');
      try {
        // here you put the objectId that you want to update
        const myNewObject = await query.get(orderId);

        myNewObject.set('state', state);
        try {
          const response = await myNewObject.save();
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          // Access the Parse Object attributes using the .GET method

          console.log(response.get('state'));

        } catch (error) {
          console.error('Error while updating order', error);
          }
        } catch (error) {
          console.error('Error while retrieving object order', error);
        }
    })();
  }
  deleteOrder(id: string){
    (async () => {
      const query = new Parse.Query('order');
      try {
        // here you put the objectId that you want to delete
        const object = await query.get(id);
        try {
          const response = await object.destroy();
          console.log('Deleted ParseObject', response);
        } catch (error) {
          console.error('Error while deleting ParseObject', error);
        }
      } catch (error) {
        console.error('Error while retrieving ParseObject', error);
      }
    })();
  }

  getOrder(agency: string): Promise <any> {
    if(agency && agency != 'clevercloud1' && agency != 'buttycomercial' && agency != 'buttyoperaciones' && agency != 'buttyekonomico'){
      const Orders = Parse.Object.extend('order');
      const query = new Parse.Query(Orders);
      query.equalTo('orderAgency', agency);
      query.limit(1000);
      return query.find()
    }else{
      const Orders = Parse.Object.extend('order');
      const query = new Parse.Query(Orders);
      query.limit(1000);
      return query.find()
    }


  }


  getAllOrders(): Promise <any> {
    const Orders = Parse.Object.extend('order');
      const query = new Parse.Query(Orders);
      query.limit(1000);
      return query.find()
  }

  getOrderSucursal(sucursal: string): Promise <any> {
    if(sucursal && sucursal != 'buttymanager' && sucursal != 'buttycomercial' && sucursal != 'buttyoperaciones' && sucursal != 'buttyekonomico'){
      const Orders = Parse.Object.extend('order');
      const query = new Parse.Query(Orders);
      query.equalTo('orderAgency', sucursal);
      return query.find()
    }else{
      const Orders = Parse.Object.extend('order');
      const query = new Parse.Query(Orders);
      return query.find()
    }


  }
}
