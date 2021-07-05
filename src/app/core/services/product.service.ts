import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  constructor(private http:HttpClient, 
              private router: Router,   
              private afAuth: AngularFireAuth, 
              private afs: AngularFirestore,
              private firestore: AngularFirestore) { 
                
              }

  getProductProperties(province: string) {  
    console.log(province);
    
    
    this.productsCollection = this.afs.collection<Product>('product', ref=>{
      return ref.where('productProvince', '==', province)
    });
    //this.firestore.collection('users').doc(emailLower).valueChanges();
    
   
   
    this.products = this.productsCollection.valueChanges();
    return this.products;
  }
 


  addProduct(product: any){
    this.afs.doc('/product/' + product.productId)                        // on a successful signup, create a document in 'users' collection with the new user's info
                .set({
                  
                  productName: product.productName,
                 
                  productPrice: product.productPrice,
                  productCost: product.productCost,
                  productAmount: product.productAmount
                  
                   
                  
                });
  }
}
