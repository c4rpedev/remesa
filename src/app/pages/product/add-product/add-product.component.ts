import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  selectedProvince: string = 'Seleccione una provincia';
  constructor(private service: ProductService,
              private provinceService: GetProvincesService) { 
                
              }

  ngOnInit(): void {
    
    this.provinces = this.provinceService.getProvinces();  
    this.provinces.unshift({
      name:'Seleccione una provincia',
      value: 0 
    })
  }

  saveProduct(form: NgForm){
    
    this.service.addProduct(this.product);

  }

}
