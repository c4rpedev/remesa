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
  img: String;
  path: string;
  results: any;

  constructor(private http:HttpClient, 
              private router: Router,   
              
              ) { 
                
              }

  getProductProperties(province: string) { 
   
   /* if(province){
      this.productsCollection = this.afs.collection<Product>('product', ref=>{
        return ref.where('productProvince', '==', province)
      });  
    }else{
      this.productsCollection = this.afs.collection<Product>('product');
    }       
    this.products = this.productsCollection.valueChanges();
    return this.products;*/
  }

  getAllProductProperties() {  
    
      const products = Parse.Object.extend('products');
      const query = new Parse.Query(products);
      // You can also query by using a parameter of an object
      // query.equalTo('objectId', 'xKue915KBG');
      this.results = query.find();  

      return this.results;
      


    //return this.http.get("https://parseapi.back4app.com/classes/products.json");       
    // this.productsCollection = this.afs.collection<Product>('product');
    // this.products = this.productsCollection.valueChanges();
    // return this.products;
  }
 
  public getStores(): Promise <any> {
    const Products = Parse.Object.extend('products');
    const query = new Parse.Query(Products);
    return query.find()
  }

  addProduct(product: Product){
    
    (async () => {
      const myNewObject = new Parse.Object('products');
      myNewObject.set('name', product.productName);
      myNewObject.set('price', product.productPrice.toString);
      myNewObject.set('cost', product.productCost.toString);
      myNewObject.set('amount', product.productAmount.toString);
      myNewObject.set('province', product.productProvince);
      myNewObject.set('category', product.productCategory);
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
