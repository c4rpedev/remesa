import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product';
import { Project } from 'src/app/core/models/project.interface';
import { Observable } from 'rxjs';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  products: any;
  provinces: any;
  selectedProvince: string = 'Seleccione una provincia';

  constructor(private service: ProductService,
    private router: Router,
    private provinceService: GetProvincesService) {
    
  }

  ngOnInit(): void {
    this.provinces = this.provinceService.getProvinces();
    this.provinces.unshift({
      name:'Seleccione una provincia',
      value: 0 
    })
  }
  btnClick() {
    this.router.navigateByUrl('add-order');
  };
  getProductForProvince() {
    console.log(this.selectedProvince);
    
    this.service.getProductProperties(this.selectedProvince).subscribe(product => {
      this.products = product;
    }
    );
  }

}
