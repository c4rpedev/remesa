import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/core/models/order';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

import { DOCUMENT } from '@angular/common';
import { AuthServices } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {  
  order: Order = new Order();
  products: Array<any> = [{}];
  subtotal: number;
  total:number = 0;
  provinces: any [] = [];
  user: string;
  constructor(
    private router: Router,
    private location:Location,
    private provinceService: GetProvincesService,
    private orderService: OrderService,
    
    public auth: AuthService,    
                @Inject(DOCUMENT) public document: Document
  ) { }

  ngOnInit(): void {
    
    
    this.provinces = this.provinceService.getProvinces(); 
     this.products = history.state.product;
     this.order.orderProvince = this.products[0].province;
     console.log('Products');
     
     console.log(this.products[0].province);
     this.products.forEach(element => {
       this.subtotal = +element.price;
       this.total = this.total + this.subtotal
       console.log(this.total);
       
       
     });
     this.auth.user$.subscribe(user =>{
       this.user = user.nickname;
     })
    
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.orderService.createOrder(this.order, this.products, this.user);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Pedido añadido',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/orders']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete todos los campos obligatorios!',        
      })
    } 
  }
}
