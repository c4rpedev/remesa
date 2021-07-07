import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  img: String;
  path: string;
  constructor(private http:HttpClient, 
              private router: Router,   
              private afAuth: AngularFireAuth, 
              private afs: AngularFirestore,
              private afStorage: AngularFireStorage) { 
                
              }

  getProductProperties(province: string) { 
  
    if(province){
      this.productsCollection = this.afs.collection<Product>('product', ref=>{
        return ref.where('productProvince', '==', province)
      });  
    }else{
      this.productsCollection = this.afs.collection<Product>('product');
    }       
    this.products = this.productsCollection.valueChanges();
    return this.products;
  }

  getAllProductProperties() {         
    this.productsCollection = this.afs.collection<Product>('product');
    this.products = this.productsCollection.valueChanges();
    return this.products;
  }
 
 


  addProduct(product: any, filePath: String){
    this.path = 'products/product'+Math.random()+filePath;
    console.log("Path");
    console.log(this.path);
    
    this.afStorage.upload (this.path, filePath).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        
        this.afs.doc('/product/' + product.productId)                        // on a successful signup, create a document in 'users' collection with the new user's info
                .set({                  
                  productName: product.productName,                
                  productPrice: product.productPrice,
                  productCost: product.productCost,
                  productAmount: product.productAmount,
                  productProvince: product.productProvince,                  
                  productDescription: product.productDescription,
                  productPhoto: url
                  
                });
      })
    });  
    
    
  }
}
