import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { PreviewProductComponent } from '../preview-product/preview-product.component';
import { StatesService } from 'src/app/core/services/states.service';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  who:string;
  products: Array<any>;
  productsEdit: Array<any> = [];
  productsAttr: Array<any> = [];
  productsCart: Array<any> = [];
  provinces: any;
  selectedProvince: null;
  img: String;
  user: string;
  term: string;
  loading: boolean;
  
  

  constructor(private service: ProductService,
    private router: Router,
    private provinceService: GetProvincesService,
    private userService: UserService,
    
    public auth: AuthService,
    public dialog: MatDialog,
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
      //this.getProductForProvince();  
    })

  }
  
  openDialog(product: any): void {
    const dialogRef = this.dialog.open(PreviewProductComponent, {
      width: '600px',
      data: {products: product}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }



  addOrder() {    
    if(this.productsCart.length > 0){
      this.router.navigate(['/b']);
    this.router.navigateByUrl('/add-order', { state: {product: this.productsCart, province: this.selectedProvince}});
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Seleccione al menos 1 productos para crear un pedido.',
        showConfirmButton: false,
        timer: 1500
      })
    }
      
  };

  editProduct(product: any, productsA: any) {    
    this.productsEdit.push(product);
    this.productsAttr.push(productsA);
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/edit-product', { state: {product: this.productsEdit, productA: this.productsAttr}});  
  };

  createCombo() {    
    if(this.productsCart.length > 1){
      this.router.navigate(['/b']);
      this.router.navigateByUrl('/create-combo', { state: {product: this.productsCart}}); 
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Seleccione al menos 2 productos para crear un combo.',
        showConfirmButton: false,
        timer: 1500
      })
    }
     
  };

  getProductForProvince() {
    console.log(this.selectedProvince);  
    if(this.user == 'buttymanager'){
      this.loading = true;
      this.service.getAllProductProperties(this.selectedProvince).then(res=>{
        this.products = res; 
        this.loading = false;
        console.log(this.products[0].attributes);        
      }) 
    }else{
      this.loading = true;
      this.service.getProductProperties(this.selectedProvince, this.user).then(res=>{
        this.products = res; 
        this.loading = false;
        console.log(this.products);
        
      }) 
    }  
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
