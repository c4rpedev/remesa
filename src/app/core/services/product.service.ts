import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import * as Parse from 'parse'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Array<Product>;
  name: String;
  img: string;
  path: string;
  results: any;

  constructor(private http:HttpClient, 
              private router: Router,   
              
              ) { 
                
              }

  getProductProperties(province: string): Promise <any> { 
   
    if(province){
      const Products = Parse.Object.extend('products');
      const query = new Parse.Query(Products);
      query.equalTo('province', province);
      return query.find() 
    }else{
      const Products = Parse.Object.extend('products');
      const query = new Parse.Query(Products);
      return query.find();
    }       
    
  }


 
  public getAllProductProperties(): Promise <any> {
    const Products = Parse.Object.extend('products');
    const query = new Parse.Query(Products);
    return query.find()
  }

  addProduct(product: Product, img: string){    
    (async () => {
      const myNewObject = new Parse.Object('products');
      myNewObject.set('name', product.productName);
      myNewObject.set('price', product.productPrice);
      myNewObject.set('cost', product.productCost);
      myNewObject.set('amount', product.productAmount);
      myNewObject.set('province', product.productProvince);
      myNewObject.set('category', product.productCategory);
      myNewObject.set('picture', new Parse.File("product.jpg", { uri: img }));     
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
