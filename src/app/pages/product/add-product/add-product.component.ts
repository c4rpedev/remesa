import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  provinces: any [] = [];
  filePath:String;
  img: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
  photosrc: String;
  selectedProvince: null;
  file: File;
  constructor(private service: ProductService,
              private provinceService: GetProvincesService,
              private router: Router) { 
                this.selectedProvince = null;
              }

  ngOnInit(): void {
    
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

  saveProduct(){
    this.service.addProduct(this.product, this.img.toString());
    this.router.navigate(['/']);
  }

}
