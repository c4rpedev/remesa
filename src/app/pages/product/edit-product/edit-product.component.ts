import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: Product = new Product();
  provinces: any [] = [];
  filePath:String;
  img: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
  photosrc: String;
  selectedProvince: null;
  file: File;  
  products: Array<any>;
  productsA: Array<any>;

  name = 'Paste it';
  val:any;
   displayedColumns: string[] ;
  dataSource: any[] = [];
  event:ClipboardEvent;

  data(event:ClipboardEvent) {   
    
    if(event){
      let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');
    
    
    this.displayedColumns = [ "Nombre", "UM", "Cantidad" ];
    //delete row_data[0];
    // Create table dataSource
    let data:any=[];

    row_data.forEach(row_data=>{
        let row:any={};
      this.displayedColumns.forEach((a, index)=>{row[a]= row_data.split('\t')[index]});
      data.push(row);
    })
      this.dataSource = data;
      console.log(this.dataSource);
    }else{
      let row_data = this.products[0].products;
    
    
      this.displayedColumns = [ "Nombre", "UM", "Cantidad" ];
      //delete row_data[0];
      // Create table dataSource
      let data:any=[];
  
     /* row_data.forEach((row_data:any)=>{
          let row:any={};
        this.displayedColumns.forEach((a, key)=>{
          console.log(row_data[key]);
          
          row[a]= row_data[key]
        });
        data.push(row);
      })*/
      this.dataSource = row_data;
      console.log(this.dataSource);
      
    }
    
   
    }
  

  constructor(private service: ProductService,
              private provinceService: GetProvincesService,
              private router: Router) { 
                this.selectedProvince = null;
              }

  ngOnInit(): void {
   
    this.products = history.state.productA;  
    this.productsA = history.state.product;   
    this.product.productId = this.products[0].productId;
    this.product.productName = this.products[0].name;
    this.product.productPrice = this.products[0].price;
    this.product.productCost = this.products[0].cost;
    this.product.productUM = this.products[0].um;
    this.product.productAmount = this.products[0].amount;
    this.product.productProvince = this.products[0].province;
    this.product.productCategory = this.products[0].category;
    this.product.productDescription = this.products[0].description;
    this.product.productAgency = this.products[0].productAgency;
    this.img = this.products[0].picture._url;
    console.log('Product');
    console.log(this.products);
    console.log('Product ID');
    console.log(this.productsA);
    this.data(this.event);
    this.provinces = this.provinceService.getProvinces();  
   
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

  saveProduct(form: NgForm){
    if(form.valid){
      this.service.updateProduct(this.productsA[0].id, this.product, this.img.toString(), this.dataSource);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      this.redirectTo('list-product');
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete todos los campos obligatorios!',        
      })
    } 
    
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
  deleteProduct(){
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
        console.log(this.productsA[0].id);
        
        this.service.deleteProduct(this.productsA[0].id);
        Swal.fire(
          'Borrado!',
          'El producto ha sido eliminado.',
          'success'
        )
        this.redirectTo('list-product');
      }
    })
    
      
    
    
    
  }
  

}
