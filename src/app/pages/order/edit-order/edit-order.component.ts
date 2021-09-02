import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/core/models/order';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { SucursalService } from 'src/app/core/services/sucursal.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SendSmsComponent } from '../send-sms/send-sms.component';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  order: Order = new Order();
  orderId: string;
  user: string;
  admin: boolean;
  sucursal: boolean;
  sucursalName: any [] = [];
  products: Array<any> = [{}];
  subtotal: number;
  total:number = 0;
  img: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
  photosrc: String;
  filePath:String;
  mobNumberPattern = "^5+[0-9]{7}$";
  fixNumberPattern = "^[0-9]{8}$";
  streetNumber: string;
  street: string;
  streetB: string;
  localidad: string;
  file: File;
  constructor(
    private router: Router,
    private sucursalService: SucursalService,
    private userService: UserService,
    private orderService: OrderService,
    public auth: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user =>{
      this.user = user.nickname;
      this.admin = this.userService.isAdmin(this.user);
      console.log(this.admin + ' <----admin')
    })
    this.order = history.state.order;
    this.img=  history.state.order.orderAlbaran._url;
    this.orderId = history.state.orderId;
    // this.user = history.state.user;
    // this.admin = history.state.admin;


    // this.sucursal = history.state.sucursal;

    // this.products = this.order.productArray;
     //this.order.orderProvince = this.products[0].province;
    //  console.log('Products');
    //  console.log(history.state.orderId);

    //  console.log(this.products[0].province);
    //  this.products.forEach(element => {
    //    this.subtotal = +element.price;
    //    this.total = this.total + this.subtotal
    //    console.log(this.total);

    //  });
    //  this.sucursalService.getSucursal().then(res =>{
    //   this.sucursalName = res;
    //   console.log('tests');
    //   console.log(this.sucursalName);
    // });
  }

  photo(event: any) {
    this.filePath = event.files;
    console.log("Path");
    console.log(this.filePath);
    this.file = event[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.img = reader.result;
      };
}
  onSubmit(form: NgForm){
    // var albaranes = 'albaranes.jpg'
    var hasAlbaran = false;
    // console.log(form);

    if(form.valid || form.disabled){
      if( this.order.state != 'Nuevo' && this.order.state != 'Revisado' && this.order.state != 'En Proceso'){
        hasAlbaran = true

      }
        // this.order.orderMunicipio = this.localidad;
        // if(this.streetNumber && this.street && this.streetB){
          this.order.orderAddress = "#" +this.order.numerocasa + " calle: " + this.order.calleP + ' entre ' + this.order.callE;
        // }
      console.log(this.orderId + '<--OrderID EDIT!')
      this.orderService.updateOrder(this.order, this.orderId, this.img.toString(), hasAlbaran);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Pedido actualizado',
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

  openDialog(): void {
    const dialogRef = this.dialog.open(SendSmsComponent, {
      width: '600px',
      data: {mobile: this.order.orderMobile}
    });
  }

  print(){
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/print-view', { state: {order: this.order}});
  }

}
