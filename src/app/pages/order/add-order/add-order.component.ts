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
import { MunicipioService } from 'src/app/core/services/municipio.service';
import { TransportService } from 'src/app/core/services/transport.service';
import { SmsService } from 'src/app/core/services/sms.service';
import { couldStartTrivia } from 'typescript';
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
  totalAmount:number = 0;
  provinces: any [] = [];
  province: string;
  municipios: any [] = [];
  user: string;
  mobNumberPattern = "^5+[0-9]{7}$";
  fixNumberPattern = "^[0-9]{8}$";
  transportCost : number;
  streetNumber: string;
  street: string;
  streetB: string;
  localidad: string;
  transporteArray: any;
  transporteArrayM: any;
  constructor(
    private router: Router,
    private smsService: SmsService,
    private provinceService: GetProvincesService,
    private orderService: OrderService,
    private municipioService: MunicipioService,
    private transportService: TransportService,
    public auth: AuthService,
                @Inject(DOCUMENT) public document: Document
  ) { }

  ngOnInit(): void {
    //  this.provinces = this.provinceService.getProvinces();
    //  this.products = history.state.product;
    //  this.province =  history.state.province;
    //  this.order.orderProvince = history.state.province;
    //  this.initProvince();
     this.auth.user$.subscribe(user =>{
      this.user = user.nickname;
      // this.getTransportCost();
     })
  }



  sendSms(number: string){
    // if(this.order.orderClientName){
    //   this.smsService.sendSMS(number, this.order.orderClientName, this.order.orderRecieverName, this.user);
    // }else{
    //   this.smsService.sendSMS(number, ' ', this.order.orderRecieverName, this.user);
    // }

  }


  // initProvince(){
  //   this.municipioService.getMunicipio(this.order.orderProvince).then(res=>{
  //     this.municipios = res[0].attributes['municipios'];
  //     console.log(this.municipios);
  //   })
  // }

  // changeProvince(){
  //   this.municipioService.getMunicipio(this.order.orderProvince).then(res=>{
  //     this.municipios = res[0].attributes['municipios'];
  //     this.order.orderMunicipio = this.municipios[0]['municipio'];
  //         })
  //   this.transporteArrayM.transporte.forEach((element:any) => {
  //     if(element.municipio == this.province){
  //       this.transportCost = 0;
  //      this.transportCost = +element.precio;
  //      this.total = this.totalAmount + this.transportCost;
  //     }
  //   });
  // }

  // getTransportCost(){
  //   console.log(this.user);
  //   this.transportService.getTransportForAgency(this.user).then(res=>{
  //     this.transporteArray = res;
  //     console.log('Transporte');

  //     console.log(this.transporteArray[0].attributes);
  //        console.log(this.order.orderProvince);

  //     this.transporteArrayM=this.transporteArray[0].attributes;
  //      this.transporteArrayM.transporte.forEach((element:any) => {
  //        if(element.municipio == this.order.orderProvince){
  //          this.transportCost = 0;
  //         this.transportCost = +element.precio;
  //         console.log(this.transportCost);

  //        }
  //      });

  //      this.products.forEach(element => {
  //       this.subtotal = +element.price;
  //       this.total = this.total + this.subtotal
  //       this.totalAmount = this.total;
  //       console.log(this.total);
  //     });
  //     this.total = this.total + this.transportCost;
  //     console.log('TOTAL');
  //     console.log(this.total);


  //     this.changeProvince();
  //   })
  // }



  onSubmit(form: NgForm){

    console.log(form);

    if(form.valid){
      if(!this.order.state && (this.order.orderAgency != 'esencialpack' && this.order.orderAgency != 'agenciaespaña')){
        this.sendSms(this.order.orderMobile);
      }
      // this.orderService.getOrder('agency').then(r => {
      //   this.order.orderId =  r.count().toString();
      //   console.log(this.order.orderId + ' <---orderiD');
      //   console.log(r + ' <--r')
      //   console.log('asd')
      // })
      var x = 0

      this.orderService.getAllOrders().then(res=>{
        var obj = res[0];
        if(obj){
          res.forEach((element:any) => {
            x++;
          });
          this.order.orderId = x + 1;
        }
        else{
          this.order.orderId = 1;
        }
        console.log(this.order.orderId + ' <--THIS.ORDERID')
        this.order.state = 'Nuevo';
        this.orderService.createOrder(this.order, this.user);
      })
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
