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
import { StatesService } from 'src/app/core/services/states.service';
import { MunicipioService } from 'src/app/core/services/municipio.service';
import { TransportService } from 'src/app/core/services/transport.service';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export const CONDITIONS_LIST = [

  { value: "is-equal", label: "Es igual" },
  { value: "is-not-equal", label: "No es igual" },
];

export const CONDITIONS_FUNCTIONS = {
  // search method base on conditions list value
  "is-equal": function (value, filterdValue) {
    let valueF = value.toString().toLowerCase();
    return valueF.indexOf(filterdValue) !== -1;
  },
  "is-not-equal": function (value, filterdValue) {
    let valueF = value.toString().toLowerCase();
    return valueF.indexOf(filterdValue) == -1;
  },
};

export const CONDITIONS_FUNCTIONSES = {
  // search method base on conditions list value
  "is-equal": function (value, filterdValue) {
    return value == filterdValue;
  },
  "is-not-equal": function (value, filterdValue) {

    return value != filterdValue;
  },
};

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit  {
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];
  orders: Array<any> = [];
  user: string;
  admin: boolean;
  sucursal: boolean;
  loading: boolean;

  // displayedColumns: string[] = ['id', 'date', 'agency', 'client', 'products', 'reciver', 'province', 'municipio','phone', 'state', 'accions'];

  dataSource : any;
  state: string = 'Selecciona un estado';
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  province: string;
  provinces: any [] = [];
  municipios: any [] = [];
  transporte: any [] = [];
  public displayedColumns: string[];


  public conditionsList = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchCondition: any = {};

  private _filterMethods = CONDITIONS_FUNCTIONS;
  private _filterMethodsEs = CONDITIONS_FUNCTIONSES;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  isnotequal: string = 'is-not-equal';
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }
  filterSelectObj = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              private stateService: StatesService,
              private municipioService: MunicipioService,
              private provinceService: GetProvincesService,
              private transportService: TransportService,
              public auth: AuthService,
                @Inject(DOCUMENT) public document: Document) {
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                // Object to create Filter for

               }

  ngOnInit(): void {
    //this.initEqualOption();

    this.init();

  }

  init(){
    this.orders= new Array();
    this.auth.user$.subscribe(user =>{
      this.loading = true;
      this.user = user.nickname;
      this.provinces = this.provinceService.getProvinces();
      // this.transportService.getTransport().then(res =>{
      //   this.transporte = res;
      // });
      if(this.userService.isAgency(this.user)){
        this.orderService.getOrderSucursal(this.user).then(res=>{
          res.forEach((element:any) => {
            this.orders.push(element);
          });
          this.dataSource = new MatTableDataSource<Order>(this.orders);

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
          this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
          this.dataSource.filterPredicate = (p: any, filtre) => {
            let result = true;
            let keys = Object.keys(p.attributes); // k
            for (const key of keys) {
              let searchCondition = filtre.conditions[key]; // et search filter method
              if (this.fromDate && this.toDate) {
                if(!(p.attributes.createdAt >= this.fromDate && p.attributes.createdAt <= this.toDate)){
                  result = false; // if one of the filters method not succeed the row will be remove from the filter result
                  break;
                }
              }
              if (searchCondition && searchCondition !== "none") {
                if (
                  filtre.methods[searchCondition](p.attributes[key], filtre.values[key]) ===
                  false
                ) {
                  // invoke search filter
                  result = false; // if one of the filters method not succeed the row will be remove from the filter result
                  break;
                }
              }
            }
            return result;
          };

          this.isAdmin();
          this.loading = false;
           this.sucursal = this.userService.isSucursal(this.user);
           if(this.admin || this.sucursal){
                this.displayedColumns =  ['id', 'date', 'agency', 'client', 'products', 'reciver', 'province', 'municipio','mobile','phone', 'state', 'accions'];
           }else{
            this.displayedColumns =  ['id', 'date', 'client', 'products', 'reciver', 'province', 'municipio','mobile','phone', 'state', 'accions'];
           }
        })
      }else{
          this.orderService.getOrder(this.user).then(res=>{
            res.forEach((element:any) => {
              this.orders.push(element);
            });
            this.dataSource = new MatTableDataSource<Order>(this.orders);
            console.log(this.orders)

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
            this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
            this.dataSource.filterPredicate = (p: any, filtre) => {
              let result = true;
              let keys = Object.keys(p.attributes); // k
              for (const key of keys) {
                let searchCondition = filtre.conditions[key]; // et search filter method
                if (this.fromDate && this.toDate) {
                  if(!(p.attributes.createdAt >= this.fromDate && p.attributes.createdAt <= this.toDate)){
                    result = false; // if one of the filters method not succeed the row will be remove from the filter result
                    break;
                  }
                }
                if (searchCondition && searchCondition !== "none") {
                  if (
                    filtre.methods[searchCondition](p.attributes[key], filtre.values[key]) ===
                    false
                  ) {
                    // invoke search filter
                    result = false; // if one of the filters method not succeed the row will be remove from the filter result
                    break;
                  }
                }
              }
              return result;
            };

            // this.dataSource.filterPredicate = (data: any, filter: string) => {
            //   return data.attributes['state'] == filter;
            //  };
            this.isAdmin();
            this.checkState();
            this.loading = false;
            if(this.admin || this.sucursal){
              this.displayedColumns =  ['id', 'date', 'agency', 'client', 'products', 'reciver', 'province', 'municipio','mobile','phone', 'state', 'accions'];
         }else{
          this.displayedColumns =  ['id', 'date', 'client', 'products', 'reciver', 'province', 'municipio','mobile','phone', 'state', 'accions'];
         }
          })


      }

    })
  }

  initEqualOption(){
    this.searchCondition.orderId = 'is-equal';
    this.searchCondition.orderAgency = 'is-equal';
    this.searchCondition.orderClientName = 'is-equal';
    this.searchCondition.orderRecieverName = 'is-equal';
    this.searchCondition.orderProvince = 'is-equal';
    this.searchCondition.orderMunicipio = 'is-equal';
    this.searchCondition.orderPhone = 'is-equal';
    this.searchCondition.orderMobile = 'is-equal';
    this.searchCondition.state = 'is-equal';
  }


  applyFilter() {

    let searchFilter: any = {
      values: this.searchValue,
      conditions: this.searchCondition,
      methods: this._filterMethods,
    };
    console.log('SEART');
    console.log(searchFilter);
    this.dataSource.filter = searchFilter;
  }

  clearColumnDate(): void {
    this.filterForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });
    this.applyFilter();
  }
  // --- applyFilter for other columns diferents a Recibe y Cliente
  applyFilterEs() {

    let searchFilter: any = {
      values: this.searchValue,
      conditions: this.searchCondition,
      methods: this._filterMethodsEs,
    };
    console.log('SEART');
    console.log(searchFilter);
    this.dataSource.filter = searchFilter;
  }


  clearColumn(columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = "none";
    this.applyFilter();
  }
  clearColumnES(columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = "none";
    this.applyFilterEs();
  }

  isAdmin(){
    this.admin = this.userService.isAdmin(this.user);
  }
  checkState(){
    for (let order of this.orders) {
      console.log('Order');
      console.log(this.orders);

      let d1 = new Date();
      var diff = Math.abs(order.attributes.createdAt.getTime() - d1.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

      var deliveryTime = this.stateService.getDeliveryTime(order.attributes.orderProvince);
      // if(order.attributes.state == "En Proceso"){
      //   if((diffDays - deliveryTime == 1) || diffDays == deliveryTime){
      //     this.orderService.updateOrderState(order.id, 'En Termino')
      //     console.log('En termino');
      //   }else if(diffDays < deliveryTime){
      //     this.orderService.updateOrderState(order.id, 'En Tiempo')
      //     console.log('En tiempo');
      //   }else if(diffDays > deliveryTime){
      //     this.orderService.updateOrderState(order.id, 'Atrasado')
      //     console.log('Atrasado');

      //   }
      // }


    }
  }

  addComplain(order: any, orderId: String){
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/add-complain', { state: {order: order, orderId: orderId, user: this.user, admin: this.admin, sucursal: this.sucursal}});
  }


  addOrder() {
    // this.router.navigate(['/b']);
    // this.router.navigateByUrl('/list-product', { state: {who: "order"}});
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/add-order');
  };

  async deleteOrder(order: any){
    await Swal.fire({
      title: 'Est??s seguro?',
      text: "No ser??s capaz de revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        await this.orderService.deleteOrder(order.id);
        Swal.fire(
          'Borrado!',
          'El producto ha sido eliminado.',
          'success'
        )

        // this.router.navigate(['/b']);
        // this.router.navigateByUrl('/list-order');
        this.router.navigate(['/orders']);
      }
    })
    // this.init();
  }

  editOrder(order: any, orderId: String){
    console.log(orderId + ' <--orderId');
    this.orderService.orderIdEdit = orderId;
    this.router.navigate(['/b']);
    this.router.navigateByUrl('/edit-order', { state: {order: order, orderId: orderId, user: this.user, admin: this.admin, sucursal: this.sucursal}});
  }

}
