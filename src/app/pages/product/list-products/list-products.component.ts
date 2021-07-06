import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product';
import { Project } from 'src/app/core/models/project.interface';
import { Observable } from 'rxjs';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { NgForm } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  products: any;
  productsCart: Array<any> = [];
  provinces: any;
  selectedProvince: null;
  img: String;
  

  constructor(private service: ProductService,
    private router: Router,
    private provinceService: GetProvincesService,
    
    ) {
      this.selectedProvince = null;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.provinces = this.provinceService.getProvinces();  
    //this.products =  this.service.getAllProductProperties();
    this.service.getStores().then(res=>{
      this.products = res;
      console.log(this.products[1].attributes.name);
    })
 
    
    
    
    
    
    
    
  }
  
  btnClick() {
    
        this.router.navigate(['/b']);
    this.router.navigateByUrl('/add-order', { state: {product: this.productsCart}});  
  };
  getProductForProvince() {
    /*console.log(this.selectedProvince);    
    this.service.getProductProperties(this.selectedProvince).subscribe(product => {
      product.forEach(product => {        
      });
      this.products = product;
    }
    );*/
  }
  addToCart(product: any){
    console.log(product);
    this.productsCart.push(product);
    console.log(this.productsCart);
  }

 
 

}
