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
  products: Array<any>;
  productsEdit: Array<any> = [];
  productsAttr: Array<any> = [];
  productsCart: Array<any> = [];
  provinces: any;
  selectedProvince: null;
  img: String;
  user: string;
  term: string;

  
  filterData = [
    {
      firstName: 'Celestine',
      lastName: 'Schimmel',
      address: '7687 Jadon Port'
    },
    {
      firstName: 'Johan',
      lastName: 'Ziemann PhD',
      address: '156 Streich Ports'
    },
    {
      firstName: 'Lizzie',
      lastName: 'Schumm',
      address: '5203 Jordon Center'
    },
    {
      firstName: 'Gavin',
      lastName: 'Leannon',
      address: '91057 Davion Club'
    },
    {
      firstName: 'Lucious',
      lastName: 'Leuschke',
      address: '16288 Reichel Harbor'
    }
  ]

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
      //this.getProductForProvince();  
    })

  }
  
  addOrder() {    
    if(this.productsCart.length > 0){
      this.router.navigate(['/b']);
    this.router.navigateByUrl('/add-order', { state: {product: this.productsCart}});
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
      this.service.getAllProductProperties().then(res=>{
        this.products = res; 
        console.log(this.products[0].attributes);        
      }) 
    }else{
      this.service.getProductProperties(this.selectedProvince, this.user).then(res=>{
        this.products = res; 
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
