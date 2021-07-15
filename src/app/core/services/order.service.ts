import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import * as Parse from 'parse'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  createOrder(order: Order, products: any[], user: string){
    (async () => {
      const myNewObject = new Parse.Object('order');
      myNewObject.set('orderId', order.orderId);
      myNewObject.set('orderClientName', order.orderClientName);
      myNewObject.set('orderRecieverName', order.orderRecieverName);
      myNewObject.set('orderProvince', order.orderProvince);
      myNewObject.set('orderMunicipio', order.orderMunicipio);
      myNewObject.set('orderAddress', order.orderAddress);
      myNewObject.set('orderPhone', order.orderPhone);
      myNewObject.set('orderMobile', order.orderMobile);
      myNewObject.set('productArray', products);
      myNewObject.set('orderAgency', user);
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log('order created', result);
      } catch (error) {
        console.error('Error while creating order: ', error);
      }
    })();
  }
  updateOrder(order: Order, orderId: string, img: string){
    (async () => {
      const query = new Parse.Query('order');
      try {
        // here you put the objectId that you want to update
        const myNewObject = await query.get(orderId);
        myNewObject.set('orderId', order.orderId);
        myNewObject.set('orderClientName', order.orderClientName);
        myNewObject.set('orderRecieverName', order.orderRecieverName);
        myNewObject.set('orderProvince', order.orderProvince);
        myNewObject.set('orderMunicipio', order.orderMunicipio);
        myNewObject.set('orderAddress', order.orderAddress);
        myNewObject.set('orderPhone', order.orderPhone);
        myNewObject.set('orderSucursal', order.orderSucursal);
        myNewObject.set('orderAlbaran', new Parse.File("albaran.jpg", { uri: img })); 
        myNewObject.set('state', order.state);
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
    if(agency && agency != 'buttymanager'){   
      const Orders = Parse.Object.extend('order');
      const query = new Parse.Query(Orders);    
      query.equalTo('orderAgency', agency);
      return query.find() 
    }else{
      const Orders = Parse.Object.extend('order');
      const query = new Parse.Query(Orders);
      return query.find()
    }   

    
  }
}
