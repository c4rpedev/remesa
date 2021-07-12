import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.scss'],
  providers: [DatePipe]
})
export class PrintViewComponent implements OnInit {
  orders: Order = new Order();    
  dateS: string;
  displayedColumns: string[] ;
  dataSource: any[] = [];
  nameProduct: string;



  constructor(private datePipe: DatePipe) { 
    this.dateS = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  }

  ngOnInit(): void {
    this.orders = history.state.order;
    this.nameProduct = history.state.order.productArray[0].name;
    this.data();

  }

  data() {   
    let row_data = this.orders.productArray[0].products;
    this.displayedColumns = [ "Nombre", "UM",  "Cantidad" ];
    let data:any=[];
    this.dataSource = row_data;
    }
    print(){
      window.print();
    }
}
