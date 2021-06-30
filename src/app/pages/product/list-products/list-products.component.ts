import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { Project } from 'src/app/shared/models/project.interface';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  products: Product[];

  constructor(private service: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProject();
  }
  btnClick() {
    console.log("taweaetae");
    this.router.navigateByUrl('add-order');
  };
  getProject(){
    this.service.getProductProperties().subscribe(
      (data: Product[])=>{
        this.products = data;
      }
    )
  }
}
