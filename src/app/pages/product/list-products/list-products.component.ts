import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  who:string;
  products: Array<any> = [];
  productsEdit: Array<any> = [];
  productsAttr: Array<any> = [];
  productsCart: Array<any> = [];
  provinces: any;
  selectedProvince: null;
  img: String;
  user: string;

  constructor(private service: ProductService,
    private router: Router,
    private provinceService: GetProvincesService,
    private userService: UserService,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
   
    ) {
     
      this.selectedProvince = null;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user =>{
      this.user = user.nickname;           
      this.who= history.state.who;       
      this.provinces = this.provinceService.getProvinces();  
      this.getProductForProvince();  
    })

  }
  
  addOrder() {    
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/add-order', { state: {product: this.productsCart}});  
  };
  editProduct(product: any, productsA: any) {    
    this.productsEdit.push(product);
    this.productsAttr.push(productsA);
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/edit-product', { state: {product: this.productsEdit, productA: this.productsAttr}});  
  };
  createCombo() {    
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/create-combo', { state: {product: this.productsCart}});  
  };
  getProductForProvince() {
    this.service.getProductProperties(this.selectedProvince, this.user).then(res=>{
      this.products = res; 
    })  
  }
  addToCart(product: any){
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Producto añadido',
    showConfirmButton: false,
    timer: 1500
  })
    console.log(product);
    this.productsCart.push(product);
    console.log(this.productsCart);
  }

 
 

}
