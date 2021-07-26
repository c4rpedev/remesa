import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AuthServices } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/core/models/order';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit  {
  orders: Array<any> = [];
  user: string;
  admin: boolean;
  sucursal: boolean;
  loading: boolean;
  displayedColumns: string[] = ['id', 'date', 'agency', 'client', 'products', 'reciver', 'adress', 'phone', 'state', 'accions'];
  dataSource: any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              public auth: AuthService,
                @Inject(DOCUMENT) public document: Document) {
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                console.log("asdfasdf")
               }

  ngOnInit(): void {        
    this.auth.user$.subscribe(user =>{
      this.loading = true;
      this.user = user.nickname;   
      if(this.userService.isSucursal(this.user)){
        this.orderService.getOrderSucursal(this.user).then(res=>{
          this.orders = res;  
           this.sucursal = this.userService.isSucursal(this.user);       
        }) 
      }else{
        this.orderService.getOrder(this.user).then(res=>{
          res.forEach((element:any) => {
            this.orders.push(element);
            console.log(this.orders);            
          });          
          this.dataSource = new MatTableDataSource<Order>(this.orders);
          console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sortingDataAccessor = (item:any, property:any) => {
            switch (property) {
              case 'date':  return item.attributes.createdAt;              
              case 'id': return item.attributes.orderId;   
              default: return item[property];
            }
          }
          this.sort.sort(({ id: 'date', start: 'desc'}) as MatSortable);
          this.dataSource.sort = this.sort;
          // this.dataSource.filterPredicate = (data:any, filter: string): boolean => {
          //   return data.attributes.orderClientName.toLowerCase().includes(filter);
          // };
          

     
          console.log('Sort');
          console.log(this.sort);
          console.log(this.dataSource.sort);
          
          
          
          this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); 
          this.isAdmin();     
          //this.checkState();     
          this.loading = false;
        }) 
      }
      
    }) 
    
    
  }

  applyFilter(event: Event) {
    console.log(event);  
    console.log(this.dataSource._data._value);
      
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAdmin(){
    this.admin = this.userService.isAdmin(this.user);
  }
  // checkState(){
  //   for (let order of this.orders) {
  //     console.log('Order');
  //     let d1 = new Date();
  //     var diff = Math.abs(order.attributes.createdAt.getTime() - d1.getTime());
  //     var diffDays = Math.ceil(diff / (1000 * 3600 * 24));  
  //     console.log(diffDays);  
  //   }
  // }

  addOrder() {    
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/list-product', { state: {who: "order"}});  
  };

  deleteOrder(order: any){
    Swal.fire({
      title: 'Estás seguro?',
      text: "No serás capaz de revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(order.id);
        
        this.orderService.deleteOrder(order.id);
        Swal.fire(
          'Borrado!',
          'El producto ha sido eliminado.',
          'success'
        )     
        this.router.navigate(['/b']);
        this.router.navigateByUrl('/list-order');  
      }
    })
  }

  editOrder(order: any, orderId: String){  
    console.log(orderId);     
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/edit-order', { state: {order: order, orderId: orderId, user: this.user, admin: this.admin, sucursal: this.sucursal}});  
  }

}
