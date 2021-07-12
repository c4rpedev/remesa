import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/models/product';
import { Router } from '@angular/router';

import * as Parse from 'parse'
@Injectable({
  providedIn: 'root'
})
export class ProductService {  
  products: Array<Product>;
  name: String;
  img: string;
  path: string;
  results: any;

  constructor(private http:HttpClient, 
              private router: Router,   
              
              ) { 
                
              }

  getProductProperties(province: string, agency: string): Promise <any> {    
    if(province){
      const Products = Parse.Object.extend('products');
      const query = new Parse.Query(Products);
      query.equalTo('province', province);
      query.equalTo('productAgency', agency);
      return query.find() 
    }else{
      const Products = Parse.Object.extend('products');
      const query = new Parse.Query(Products);
      query.containedIn("productAgency",
                  [agency, null]);
      return query.find();
    }           
  }


 
  public getAllProductProperties(agency: string): Promise <any> {
    const Products = Parse.Object.extend('products');
    const query = new Parse.Query(Products);
    query.equalTo('productAgency', agency);
    return query.find()
  }

  addProduct(product: Product, img: string, products: any[], user: string){    
    (async () => {
      const myNewObject = new Parse.Object('products');
      myNewObject.set('productId', product.productId);
      myNewObject.set('name', product.productName);
      myNewObject.set('price', product.productPrice);
      myNewObject.set('cost', product.productCost);
      myNewObject.set('um', product.productUM);
      myNewObject.set('amount', product.productAmount);
      myNewObject.set('province', product.productProvince);
      myNewObject.set('category', product.productCategory);   
      myNewObject.set('productAgency', user);    
      myNewObject.set('picture', new Parse.File("product.jpg", { uri: img }));   
      myNewObject.set('description', product.productDescription);  
      myNewObject.set('products', products); 
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log('products created', result);
      } catch (error) {
        console.error('Error while creating products: ', error);
      }
    })();    
  }

  updateProduct(id: string, product: Product, img: string, products: any[]){    
    (async () => {
      const query = new Parse.Query('products');
      try {
        // here you put the objectId that you want to update
        const myNewObject = await query.get(id);
        myNewObject.set('productId', product.productId);
      myNewObject.set('name', product.productName);
      myNewObject.set('price', product.productPrice);
      myNewObject.set('cost', product.productCost);
      myNewObject.set('um', product.productUM);
      myNewObject.set('amount', product.productAmount);
      myNewObject.set('province', product.productProvince);
      myNewObject.set('category', product.productCategory);      
      myNewObject.set('picture', new Parse.File("product.jpg", { uri: img }));   
      myNewObject.set('description', product.productDescription);
      console.log('product');
      console.log(products);
      
      
      myNewObject.set('products', products); 
        try {
          const response = await myNewObject.save();
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          // Access the Parse Object attributes using the .GET method
          console.log(response.get('name'));
          console.log(response.get('cost'));
          console.log(response.get('amount'));
          console.log(response.get('province'));
          console.log(response.get('category'));
          console.log(response.get('picture'));
          console.log(response.get('description'));
          console.log(response.get('price'));
          console.log(response.get('um'));
          console.log(response.get('id'));
          console.log('products updated', response);
        } catch (error) {
          console.error('Error while updating products', error);
          }
        } catch (error) {
          console.error('Error while retrieving object products', error);
        }
    })(); 
  }

  deleteProduct(id: string){
    (async () => {
      const query = new Parse.Query('products');
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
  addCombo(product: Product, img: string, products: any[], agency: string){    
    (async () => {
      const myNewObject = new Parse.Object('products');
      myNewObject.set('productId', product.productId);
      myNewObject.set('name', product.productName);
      myNewObject.set('price', product.productPrice);
      myNewObject.set('cost', product.productCost);
      myNewObject.set('um', 'u');
      myNewObject.set('amount', '1');
      myNewObject.set('province', product.productProvince);
      myNewObject.set('category', 'Combo');      
      myNewObject.set('productAgency', agency);   
      myNewObject.set('picture', new Parse.File("product.jpg", { uri: img }));   
      myNewObject.set('description', product.productDescription);  
      myNewObject.set('products', products);  
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log('products created', result);
      } catch (error) {
        console.error('Error while creating products: ', error);
      }
    })();    
  }
}
