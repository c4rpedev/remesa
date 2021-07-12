import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import * as Parse from 'parse'
import { Complain } from '../models/complain';


@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor() { }

  createComplain(complain: Complain, user: string){
    (async () => {
      const myNewObject = new Parse.Object('complains');
      myNewObject.set('complainAgency', user);
      myNewObject.set('complainClient', complain.complainClient);
      myNewObject.set('complainOrder', complain.complainOrder);
      myNewObject.set('complainMotive', complain.complainMotive);
      myNewObject.set('complainId', complain.complainId);
      myNewObject.set('complainState', 'Nuevo');
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log('complains created', result);
      } catch (error) {
        console.error('Error while creating complains: ', error);
      }
    })();
  }

  getComplain(agency: string): Promise <any> {    
    if(agency && agency != 'buttymanager'){   
      const Complains = Parse.Object.extend('complains');
      const query = new Parse.Query(Complains);    
      query.equalTo('complainAgency', agency);
      return query.find() 
    }else{
      const Complains = Parse.Object.extend('complains');
      const query = new Parse.Query(Complains); 
      return query.find()
    }       
  }

  updateComplain(complain: Complain, complainId: string){
    (async () => {
      const query = new Parse.Query('complains');
      try {
        // here you put the objectId that you want to update
        const object = await query.get(complainId);
        
        object.set('complainClient', complain.complainClient);
        object.set('complainOrder', complain.complainOrder);
        object.set('complainMotive', complain.complainMotive);
        object.set('complainState', complain.complainState);
        object.set('complainId', complain.complainId);
        try {
          const response = await object.save();
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          // Access the Parse Object attributes using the .GET method
          console.log(response.get('complainAgency'));
          console.log(response.get('complainClient'));
          console.log(response.get('complainOrder'));
          console.log(response.get('complainMotive'));
          console.log('complains updated', response);
        } catch (error) {
          console.error('Error while updating complains', error);
          }
        } catch (error) {
          console.error('Error while retrieving object complains', error);
        }
    })();
  }

  deleteComplain(id: string){
    (async () => {
      const query = new Parse.Query('complains');
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
}
